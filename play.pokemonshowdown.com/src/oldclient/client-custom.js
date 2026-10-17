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
					buf += '<li><button name="selectTeam" value="' + i + '" class="team">' +
						'<strong><span>' + BattleLog.escapeFormat(teams[i].format) + ' · </span>' +
						BattleLog.escapeHTML(teams[i].name) + '</strong>' +
						'<small>' + Storage.getTeamIcons(teams[i]) + '</small></button></li>';
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
}).call(this, jQuery);
