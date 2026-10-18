/**
 * pokemon-showdown-custom: extensões do cliente clássico usadas pelas páginas
 * do nosso servidor (Desafio de Ginásios).
 *
 * Fica num arquivo próprio para não conflitar com os arquivos da Smogon; é
 * carregado pelo index-old.html depois do client-ladder.js (que define HTMLRoom).
 *
 * Botões nas páginas do servidor chamam métodos da sala pelo atributo `name`
 * (ver Room#dispatchClickButton em client.js):
 *   <button name="gymOpenTeambuilder">  abre o teambuilder (ao lado, em telas largas)
 *   <button name="gymImportTeam">       escolhe um dos times salvos e o coloca,
 *                                       exportado, na <textarea name="team"> da página
 *
 * Menu de formatos (FormatPopup): os formatos nossos (marcados pelo servidor com o
 * bit 512 no código de exibição, ver server/rooms.ts → formatListText) aparecem
 * primeiro, com as seções abertas. Os oficiais ficam agrupados em "Official Formats",
 * fechado por padrão.
 *
 * Tela principal: botão "Gym Challenge" (abaixo de "Tournaments"), que abre a
 * lista de desafios do servidor (/ginasio).
 *
 * Popup de usuário: botão "Gym profile" (só para quem está logado), que abre o
 * perfil do jogador no Desafio de Ginásios.
 *
 * Privacidade: o teambuilder não consulta a API da Smogon (links de análises).
 *
 * Teambuilder e formatos de desafio: o servidor envia `|customformats|{id: base}`
 * (server/rooms.ts → customFormatsText) com o formato base de cada formato nosso.
 * O teambuilder decide geração, Pokédex e busca pelo id do formato do time; para
 * esses times, ele passa a ver o formato base (sem mudar o formato salvo).
 *
 * @license MIT
 */

(function ($) {
	'use strict';

	var GymTeamImportPopup = this.Popup.extend({
		type: 'semimodal',
		initialize: function (data) {
			this.targetRoom = data.room;
			var teams = Storage.teams;
			var buf = '<p><strong>Import one of your teams</strong></p>';
			if (!teams.length) {
				buf += '<p><em>You have no teams.</em></p>';
				buf += '<p><button name="openTeambuilder" class="button"><strong>Teambuilder</strong></button></p>';
			} else {
				buf += '<ul class="popupmenu">';
				for (var i = 0; i < teams.length; i++) {
					// Mesmo visual do seletor de time da tela principal (classe "team"): nome em
					// cima, ícones dos Pokémon embaixo. A classe "option" cortaria os ícones.
					// Ícones calculados agora, sem o cache do time (Storage.getTeamIcons): o cache
					// pode ter sido gerado antes de os dados de Pokémon carregarem e ficar com "?".
					buf += '<li><button name="selectTeam" value="' + i + '" class="team">' +
						'<strong><span>' + BattleLog.escapeFormat(teams[i].format) + ' · </span>' +
						BattleLog.escapeHTML(teams[i].name) + '</strong>' +
						'<small>' + Storage.packedTeamIcons(Storage.getPackedTeam(teams[i])) + '</small></button></li>';
				}
				buf += '</ul>';
			}
			buf += '<p class="buttonbar"><button name="close" class="button">Cancel</button></p>';
			this.$el.html(buf).css('max-width', '480px');
		},
		selectTeam: function (i) {
			var team = Storage.teams[+i];
			var $textarea = this.targetRoom && this.targetRoom.$el.find('textarea[name=team]');
			if (team && $textarea && $textarea.length) {
				$textarea.val(Storage.exportTeam(team.team)).trigger('change').focus();
			}
			this.close();
		},
		openTeambuilder: function () {
			this.close();
			app.joinRoom('teambuilder');
		}
	});

	$.extend(this.HTMLRoom.prototype, {
		gymOpenTeambuilder: function () {
			// Páginas abrem no painel esquerdo, o mesmo do teambuilder. Move esta página
			// para o painel direito (o mesmo que arrastar a aba) para os dois ficarem lado a lado.
			var index = app.roomList.indexOf(this);
			if (index >= 0) {
				app.roomList.splice(index, 1);
				app.sideRoomList.unshift(this);
				app.focusRoomRight(this.id);
			}
			app.joinRoom('teambuilder');
		},
		gymImportTeam: function (value, button) {
			app.addPopup(GymTeamImportPopup, { room: this, sourceEl: button });
		}
	});

	// --- Menu de formatos: nossos primeiro, oficiais agrupados ---------------

	var OFFICIAL_GROUP = 'Official Formats';
	var CUSTOM_FORMAT_BIT = 512;
	var customFormatIds = {};

	var parseFormats = this.App.prototype.parseFormats;
	this.App.prototype.parseFormats = function (formatsList) {
		customFormatIds = {};
		for (var i = 1; i < formatsList.length; i++) {
			// Formatos vêm como "Nome,código"; seções e marcadores (",1", ",LL") começam com vírgula
			var entry = formatsList[i];
			var comma = entry.lastIndexOf(',');
			if (comma <= 0) continue;
			var code = parseInt(entry.substr(comma + 1), 16);
			if (!isNaN(code) && (code & CUSTOM_FORMAT_BIT)) customFormatIds[toID(entry.substr(0, comma))] = true;
		}
		return parseFormats.call(this, formatsList);
	};

	var FormatPopup = this.FormatPopup;
	var renderFormats = FormatPopup.prototype.renderFormats;
	var updateOpen = FormatPopup.prototype.updateOpen;

	function formatButton(popup, id, starred) {
		var star = starred ?
			'<i class="fa fa-star" style="float: right; color: #FFD700; text-shadow: 0 0 1px #000;"></i>' :
			'<i class="fa fa-star subtle" style="float: right;"></i>';
		return '<li><button name="selectFormat" value="' + id + '" class="option' + (popup.data.format === id ? ' cur' : '') + '">' +
			BattleLog.escapeFormat(BattleFormats[id].id) + star + '</button></li>';
	}

	/** Seções dos formatos aceitos por `filter`, em colunas como no original (uma coluna se `oneColumn`). */
	function renderSections(popup, filter, oneColumn, defaultOpen) {
		var bufs = [];
		var curBuf = 1;
		var curSection = '';
		var searchId = toID(popup.search);
		for (var id in BattleFormats) {
			var format = BattleFormats[id];
			if (!filter(id) || !popup.shouldDisplayFormat(format)) continue;
			if (popup.search && !format.id.includes(searchId)) continue;
			if (popup.starred[id]) continue; // só aparece entre as favoritas
			if (format.section && format.section !== curSection) {
				if (curSection) bufs[curBuf] += '</details></p>';
				curSection = format.section;
				if (oneColumn) {
					curBuf = 1;
				} else if (!app.supports['formatColumns']) {
					curBuf = (curSection === 'Doubles' || curSection === 'Past Generations') ? 2 : 1;
				} else {
					curBuf = format.column || 1;
				}
				if (!bufs[curBuf]) bufs[curBuf] = '';
				if (defaultOpen && popup.open[curSection] === undefined) popup.open[curSection] = true;
				var open = (popup.open[curSection] || searchId) ? ' open' : '';
				bufs[curBuf] += '<p><details' + open + ' section="' + BattleLog.escapeHTML(curSection) + '">' +
					'<summary><strong style="color: #579">' + BattleLog.escapeHTML(curSection) + '</strong></summary>';
			}
			bufs[curBuf] += formatButton(popup, id, false);
		}
		if (curSection) bufs[curBuf] += '</details></p>';
		var html = '';
		var used = bufs.filter(function (buf) { return buf; }).length;
		for (var i = 1; i < bufs.length; i++) {
			if (!bufs[i]) continue;
			html += '<ul class="popupmenu"' + (used > 1 ? ' style="float:left;padding-left:5px"' : '') + '>' + bufs[i] + '</ul>';
		}
		return html;
	}

	$.extend(FormatPopup.prototype, {
		renderFormats: function () {
			var popup = this;
			var isCustom = function (id) { return !!customFormatIds[id]; };
			var isOfficial = function (id) { return !customFormatIds[id]; };
			var hasCustom = Object.keys(BattleFormats).some(function (id) {
				return isCustom(id) && popup.shouldDisplayFormat(BattleFormats[id]);
			});
			// Sem formatos nossos neste menu: comportamento original
			if (!hasCustom) return renderFormats.call(this);

			var top = '';
			if (this.selectType === 'watch' && !this.search) {
				top += '<li><button name="selectFormat" value="" class="option' + (this.data.format === '' ? ' cur' : '') +
					'">(All formats)</button></li>';
			}
			for (var id in this.starred) {
				if (!BattleFormats[id]) {
					delete this.starred[id];
					continue;
				}
				if (!this.shouldDisplayFormat(BattleFormats[id])) continue;
				if (this.search && !id.includes(toID(this.search))) continue;
				top += formatButton(this, id, true);
			}
			var custom = renderSections(this, isCustom, true, true);
			var official = renderSections(this, isOfficial, false, false);
			if (!top && !custom && !official) return '<ul class="popupmenu"><em>No formats found</em></ul>';

			var html = (top ? '<ul class="popupmenu">' + top + '</ul>' : '') + custom;
			if (official) {
				var open = (this.open[OFFICIAL_GROUP] || toID(this.search)) ? ' open' : '';
				// Mesma estrutura das seções (ul.popupmenu > p > details), para ter o mesmo estilo de título
				html += '<div style="clear:left"></div><ul class="popupmenu"><p><details' + open + ' section="' + OFFICIAL_GROUP + '">' +
					'<summary><strong style="color: #579">' + OFFICIAL_GROUP + '</strong></summary>' +
					official + '<div style="clear:left"></div></details></p></ul>';
			}
			return html;
		},
		// Com o grupo "Official Formats", há <details> dentro de <details>: o clique numa seção
		// interna também chegaria ao grupo. Só conta o clique no próprio título.
		updateOpen: function (ev) {
			var summary = $(ev.target).closest('summary')[0];
			if (!summary || summary.parentNode !== ev.currentTarget) return;
			return updateOpen.call(this, ev);
		}
	});

	// --- Teambuilder: formatos de desafio usam a Pokédex do formato base -----

	var customBaseFormats = {};

	var receive = this.App.prototype.receive;
	this.App.prototype.receive = function (data) {
		if (data.startsWith('|customformats|')) {
			try {
				customBaseFormats = JSON.parse(data.slice(15)) || {};
			} catch (e) {
				customBaseFormats = {};
			}
			return;
		}
		return receive.call(this, data);
	};

	/**
	 * O teambuilder lê `curTeam.format` em dezenas de lugares para decidir geração,
	 * Pokédex e busca. Para um time de formato de desafio, `curTeam` vira um Proxy
	 * do time: `format` devolve o formato base, e todo o resto (inclusive gravações)
	 * vai para o time real, que continua salvo com o formato do desafio.
	 */
	function teamWithBaseFormat(team) {
		if (!team || team.__realTeam || !window.Proxy) return team;
		return new window.Proxy(team, {
			get: function (target, prop) {
				if (prop === '__realTeam') return target;
				if (prop === 'format') return customBaseFormats[target.format] || target.format;
				return target[prop];
			}
		});
	}

	var TeambuilderRoom = this.TeambuilderRoom.prototype;
	var edit = TeambuilderRoom.edit;
	var changeFormat = TeambuilderRoom.changeFormat;
	var updateTeamView = TeambuilderRoom.updateTeamView;

	/** Troca curTeam pelo Proxy se o time for de um formato de desafio; devolve true se trocou. */
	function useBaseFormat(room) {
		var team = room.curTeam;
		if (!team || team.__realTeam || !customBaseFormats[team.format]) return false;
		room.curTeam = teamWithBaseFormat(team);
		// Geração e Pokédex de novo, agora pelo formato base (o formato salvo não muda)
		changeFormat.call(room, team.format);
		return true;
	}

	/** Roda `fn` com o time real em curTeam: validação e exportação usam o formato do desafio. */
	function withRealTeam(fn) {
		return function () {
			var proxied = this.curTeam;
			var target = proxied && proxied.__realTeam;
			if (!target) return fn.apply(this, arguments);
			this.curTeam = target;
			try {
				return fn.apply(this, arguments);
			} finally {
				if (this.curTeam === target) this.curTeam = proxied;
			}
		};
	}

	$.extend(TeambuilderRoom, {
		edit: function () {
			var result = edit.apply(this, arguments);
			if (useBaseFormat(this)) this.update();
			return result;
		},
		changeFormat: function (format) {
			var result = changeFormat.apply(this, arguments);
			useBaseFormat(this);
			return result;
		},
		updateTeamView: function () {
			var result = updateTeamView.apply(this, arguments);
			// O botão de formato mostra (e abre o menu com) o formato real do time
			var target = this.curTeam && this.curTeam.__realTeam;
			if (target) this.$('button.teambuilderformatselect').val(target.format).html(BattleLog.escapeFormat(target.format));
			return result;
		},
		// Privacidade (LGPD, decisão do usuário em 2026-10-18): o teambuilder não consulta a
		// API da Smogon (o navegador mandaria IP e formato a um terceiro). Sem dados, ele
		// só não mostra os links de análises dos formatos oficiais.
		tryLoadFormatResource: function (format) {
			this.formatResources[format] = true;
		},
		validate: withRealTeam(TeambuilderRoom.validate),
		psExport: withRealTeam(TeambuilderRoom.psExport),
		pokepasteExport: withRealTeam(TeambuilderRoom.pokepasteExport)
	});

	// --- Tela principal: botão "Gym Challenge" ------------------------------

	var MainMenuRoom = this.MainMenuRoom.prototype;
	var mainMenuInitialize = MainMenuRoom.initialize;
	MainMenuRoom.initialize = function () {
		var result = mainMenuInitialize.apply(this, arguments);
		// Mesmo estilo dos botões oficiais; "onlineonly" fica desabilitado sem conexão
		var button = $('<p><button class="button mainmenu1 onlineonly disabled" name="send" value="/ginasio">' +
			'Gym Challenge</button></p>');
		var tournaments = this.$('.mainmenu button[value="/smogtours"]').closest('p');
		if (tournaments.length) button.insertAfter(tournaments);
		if (app.socket && !app.isDisconnected) button.find('button').removeClass('disabled');
		return result;
	};

	// --- Popup de usuário: botão "Gym profile" ------------------------------

	var UserPopup = this.UserPopup.prototype;
	var userPopupUpdate = UserPopup.update;
	$.extend(UserPopup, {
		update: function () {
			var result = userPopupUpdate.apply(this, arguments);
			// Perfis só para usuários logados (o servidor também confere)
			if (app.user.get('named') && this.data.userid) {
				this.$el.append('<p class="buttonbar"><button name="gymProfile" class="button">Gym profile</button></p>');
			}
			return result;
		},
		gymProfile: function () {
			var userid = this.data.userid;
			this.close();
			app.joinRoom('view-ginasios-perfil-' + userid);
		}
	});
}).call(this, jQuery);
