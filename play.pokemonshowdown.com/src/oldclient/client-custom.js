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
 *   <button name="gymGo" value="view-ginasios...">  vai para a página (aba já aberta
 *                                       ganha foco e é atualizada; senão, abre)
 *   <button name="gymPickSprite" value="sprite">  galeria do treinador novo: põe o
 *                                       sprite no formulário de criação (campo oculto e
 *                                       prévia, sem recarregá-lo), fecha a galeria e volta
 *   <button name="gymSort" value="name|type|level|checked">  ordena a tabela do sorteio
 *                                       de treinadores (table.gym-pool); clicar de novo inverte
 *
 * Treinadores de um desafio (pedido do usuário em 2026-10-20): a tabela do sorteio tem
 * busca por nome ou Pokémon do time (.gym-filter-text), filtro por tipo
 * (.gym-filter-type) e pela seleção (.gym-filter-checked); cada lista de treinadores
 * tem uma busca por nome (.gym-select-filter, logo antes do <select>). Tudo roda aqui,
 * sem recarregar a página: as linhas escondidas continuam no formulário, e nada do que
 * ainda não foi salvo se perde.
 *
 * Menu de formatos (FormatPopup): os formatos nossos (marcados pelo servidor com o
 * bit 512 no código de exibição, ver server/rooms.ts → formatListText) aparecem
 * primeiro, com as seções abertas. Os oficiais ficam agrupados em "Official Formats",
 * fechado por padrão.
 *
 * Tela principal: botões "Gym Challenge" (abaixo de "Tournaments"), que abre a
 * lista de desafios do servidor (/ginasio), e "Expedition", o modo roguelike
 * (/expedicao).
 *
 * Popup de usuário: botão "Gym profile" (só para quem está logado), que abre o
 * perfil do jogador no Desafio de Ginásios.
 *
 * Privacidade: o teambuilder não consulta a API da Smogon (links de análises).
 *
 * Divisão da tela (decisão de 2026-10-19): com uma aba de chat aberta à direita
 * (Lobby, Staff...), as abas da esquerda (páginas do servidor, teambuilder, ladder e
 * batalhas) ocupam o resto da tela, e o chat fica com CHAT_PANEL_WIDTH. A tela
 * inicial (Home) continua como no PS.
 *
 * Nome do site: "Liga de Desafios" no título da aba (no lugar de "Showdown!"). O logo
 * do topo continua o do Pokémon Showdown (decisão de 2026-10-18).
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

	var SITE_NAME = 'Liga de Desafios';

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
		},
		gymPickSprite: function (sprite) {
			sprite = sprite || '';
			if (!/^[a-z0-9-]*$/.test(sprite)) return;
			var formRoom = app.rooms['view-ginasiosadmin-treinador-novo'];
			if (formRoom) {
				formRoom.$el.find('input[name=avatar]').val(sprite);
				var $preview = formRoom.$el.find('.gym-sprite-preview').empty();
				if (sprite) {
					$('<img />').attr({
						src: '/sprites/trainers/' + sprite + '.png', width: 80, height: 80, alt: sprite, title: sprite
					}).css('vertical-align', 'middle').appendTo($preview);
				} else {
					$('<em></em>').text($preview.attr('data-empty') || '').appendTo($preview);
				}
			}
			// Fecha as abas da galeria do treinador novo (qualquer página ou busca) e volta
			var galleries = [];
			for (var id in app.rooms) {
				if (id.indexOf('view-ginasiosadmin-sprites-novo-') === 0) galleries.push(id);
			}
			for (var i = 0; i < galleries.length; i++) app.leaveRoom(galleries[i]);
			if (formRoom) app.focusRoom(formRoom.id);
		},
		gymSort: function (key, button) {
			var $table = $(button).closest('table.gym-pool');
			if ($table.length && /^(name|type|level|checked)$/.test(key || '')) sortPool($table, key, button);
		},
		gymGo: function (id) {
			// Só as páginas do Desafio de Ginásios e da Expedição (o valor vem do HTML do servidor)
			if (!/^view-(ginasios(admin)?|expedicao)(-[a-z0-9-]+)?$/.test(id || '')) return;
			// "/join" numa aba já aberta só a atualiza; joinRoom a põe em foco (ou abre)
			var wasOpen = !!app.rooms[id];
			app.joinRoom(id);
			if (wasOpen) app.send('/join ' + id);
		}
	});

	// --- Treinadores de um desafio: busca, filtros e ordenação -----------------

	/** Texto para comparar: sem acentos e em minúsculas. */
	function normalizeText(text) {
		return String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
	}

	/** Ordem das dificuldades ("" = a base do desafio). */
	var LEVEL_ORDER = ['', 'random', 'easy', 'medium', 'hard', 'master'];

	/** Linhas de treinadores da tabela do sorteio (sem a linha de títulos). */
	function poolRows($table) {
		return $table.find('tr').filter(function () { return !$(this).children('th').length; });
	}

	function poolRowName($row) {
		return normalizeText($row.find('.gym-pool-name').text());
	}

	function applyPoolFilters($form) {
		var $table = $form.find('table.gym-pool');
		if (!$table.length) return;
		var text = normalizeText($form.find('.gym-filter-text').val()).trim();
		var type = $form.find('.gym-filter-type').val() || '';
		var checked = $form.find('.gym-filter-checked').val() || '';
		poolRows($table).each(function () {
			var $row = $(this);
			// O nome do treinador e os Pokémon do time (o título de cada ícone)
			var names = [$row.find('.gym-pool-name').text()].concat($row.find('.picon').map(function () {
				return this.title || '';
			}).get());
			var matchesText = !text || names.some(function (name) { return normalizeText(name).indexOf(text) >= 0; });
			var matchesType = !type || $row.find('.gym-pool-type').attr('title') === type;
			var isChecked = $row.find('input[type=checkbox]').prop('checked');
			var matchesChecked = !checked || (checked === 'checked') === isChecked;
			$row.toggle(matchesText && matchesType && matchesChecked);
		});
	}

	function sortPool($table, key, button) {
		var state = $table.data('gymSort') || {};
		var dir = state.key === key ? -state.dir : 1;
		$table.data('gymSort', { key: key, dir: dir });
		var sortValue = function ($row) {
			if (key === 'type') return normalizeText($row.find('.gym-pool-type').attr('title'));
			if (key === 'level') return LEVEL_ORDER.indexOf($row.find('.gym-pool-level select').val() || '');
			if (key === 'checked') return $row.find('input[type=checkbox]').prop('checked') ? 0 : 1;
			return poolRowName($row);
		};
		var rows = poolRows($table).get().map(function (row) {
			var $row = $(row);
			return { row: row, value: sortValue($row), name: poolRowName($row) };
		});
		rows.sort(function (a, b) {
			if (a.value !== b.value) return (a.value < b.value ? -1 : 1) * dir;
			// Empate: ordem alfabética do nome
			return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
		});
		// Move as próprias linhas (com os campos e o que já foi marcado)
		var $parent = $(rows[0] && rows[0].row).parent();
		for (var i = 0; i < rows.length; i++) $parent.append(rows[i].row);
		$table.find('.gym-sort-arrow').remove();
		$('<span class="gym-sort-arrow"></span>').text(dir > 0 ? ' \u25B2' : ' \u25BC').appendTo(button);
	}

	/** Busca por nome numa lista de treinadores: mostra só as opções que combinam (mais "nenhum" e a escolhida). */
	function filterSelect(input) {
		var $select = $(input).nextAll('select').first();
		if (!$select.length) return;
		var all = $select.data('gymOptions');
		if (!all) {
			all = $select.find('option').map(function () { return { value: this.value, label: $(this).text() }; }).get();
			$select.data('gymOptions', all);
		}
		var text = normalizeText(input.value).trim();
		var current = $select.val();
		$select.empty();
		for (var i = 0; i < all.length; i++) {
			var option = all[i];
			if (text && option.value !== '' && option.value !== current && normalizeText(option.label).indexOf(text) < 0) continue;
			$('<option></option>').val(option.value).text(option.label).appendTo($select);
		}
		$select.val(current);
	}

	$(document).on('input change', '.gym-filter-text, .gym-filter-type, .gym-filter-checked', function () {
		applyPoolFilters($(this).closest('form'));
	});
	$(document).on('input', '.gym-select-filter', function () {
		filterSelect(this);
	});
	// Enter num campo de busca não envia (e não salva) o formulário
	$(document).on('keydown', '.gym-filter-text, .gym-select-filter', function (e) {
		if (e.keyCode === 13) e.preventDefault();
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
			'Gym Challenge</button></p>' +
			'<p><button class="button mainmenu1 onlineonly disabled" name="send" value="/expedicao">' +
			'Expedition</button></p>');
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

	// --- Divisão da tela: página grande à esquerda, chat estreito à direita ------
	var CHAT_PANEL_WIDTH = 400;
	var WIDE_LEFT_TYPES = { html: 1, teambuilder: 1, ladder: 1, battle: 1 };
	var originalUpdateLayout = this.App.prototype.updateLayout;
	this.App.prototype.updateLayout = function () {
		originalUpdateLayout.apply(this, arguments);
		var left = this.curRoom;
		var right = this.curSideRoom;
		// Só quando o PS já mostrou os dois painéis lado a lado
		if (!left || !right || left === right || !WIDE_LEFT_TYPES[left.type]) return;
		var available = $(window).width();
		var leftMin = left.minMainWidth || left.minWidth || left.bestWidth || 0;
		var rightMin = right.minWidth || right.bestWidth || 320;
		var leftWidth = Math.max(available - CHAT_PANEL_WIDTH, leftMin);
		if (available - leftWidth < rightMin) leftWidth = available - rightMin;
		if (leftWidth < leftMin) return; // não cabe: fica a divisão original
		left.show('left', leftWidth);
		right.show('right', leftWidth);
		// As abas da direita são posicionadas pela largura do painel esquerdo
		this.topbar.updateTabbar();
	};

	// --- Nome do site na aba do navegador -------------------------------------
	this.App.prototype.updateTitle = function (room) {
		document.title = room.title ? room.title + ' - ' + SITE_NAME : SITE_NAME;
	};
}).call(this, jQuery);
