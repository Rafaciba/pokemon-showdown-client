/**
 * pokemon-showdown-custom: idioma do cliente clássico (português do Brasil ou inglês).
 *
 * Fica num arquivo próprio para não conflitar com os arquivos da Smogon. É carregado
 * pelo index-old.html depois do dicionário (client-i18n-pt.js) e antes de `new App()`.
 *
 * Escolha do idioma:
 *   - botão com o globo no topo (ao lado do som) e o seletor "Language" das opções;
 *   - na primeira visita, vale o idioma do navegador (pt* → português, resto → inglês);
 *   - a escolha fica em Storage.prefs('language'), que o Dex já usa para os textos de
 *     batalha (data/text/pt.js: mensagens, descrições e o catálogo de interface);
 *   - o servidor recebe o idioma por /updatesettings (páginas e mensagens do servidor);
 *   - o cookie ps_lang leva a escolha às páginas do login (/cadastro, /conta, /regras...).
 *
 * Interface clássica: os textos fixos em inglês dos arquivos da Smogon são trocados
 * depois de virarem DOM, por um MutationObserver que consulta o dicionário:
 *   - exact: nó de texto inteiro (ou atributo title/placeholder/aria-label/alt e o value
 *     de botões), normalizado;
 *   - patterns: nó de texto com valores do programa ({0}, {1}...);
 *   - html: trechos pequenos e fixos com tags no meio.
 * Conteúdo de usuário (mensagens de chat, nomes, caixas de HTML, campos de texto) fica
 * de fora. Segurança: textos são trocados só como texto (nodeValue/setAttribute); o
 * único innerHTML é o das entradas "html", que são fixas e vêm do nosso dicionário.
 *
 * Tipos: em português, "tipo Fire" vira "tipo" + o selo do tipo (mesma imagem do jogo).
 *
 * @license MIT
 */

(function ($) {
	'use strict';

	var LANGUAGES = [
		{ id: 'portuguese', code: 'pt', abbr: 'PT', label: 'Português (Brasil)' },
		{ id: 'english', code: 'en', abbr: 'EN', label: 'English' }
	];
	var TYPES = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying',
		'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy', 'Stellar'];
	// Conteúdo de usuário ou que já vem traduzido/sem tradução: não é tocado
	// Mensagens escritas por usuários têm a classe chatmessage-<id> (no chat, nas MPs e no log
	// de batalha); avisos do sistema também usam "chat", mas sem ela, e esses são traduzidos.
	var SKIP = '[class*="chatmessage-"], .infobox, .username, .usernametext, .ps-i18n-skip, textarea, script, ' +
		'style, code, pre, [contenteditable]';
	var ATTRIBUTES = ['title', 'placeholder', 'aria-label', 'alt'];

	function findLanguage(id) {
		for (var i = 0; i < LANGUAGES.length; i++) {
			if (LANGUAGES[i].id === id || LANGUAGES[i].code === id) return LANGUAGES[i];
		}
		return null;
	}

	function browserLanguage() {
		var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
		return /^pt(-|$)/i.test(list[0] || '') ? 'portuguese' : 'english';
	}

	var current = (findLanguage(Storage.prefs('language')) || findLanguage(browserLanguage())).id;
	Storage.prefs('language', current);

	// Idioma também nas configurações do servidor guardadas no navegador: o cliente as
	// reenvia ao conectar (client-rooms.js → /updatesettings)
	function storeServerSetting() {
		var settings = $.extend({}, Storage.prefs('serversettings') || {});
		settings.language = current;
		Storage.prefs('serversettings', settings);
	}
	storeServerSetting();

	function writeCookie() {
		document.cookie = 'ps_lang=' + findLanguage(current).code + '; path=/; max-age=31536000; samesite=lax' +
			(location.protocol === 'https:' ? '; secure' : '');
	}
	writeCookie();

	/*********************************************************
	 * Dicionário
	 *********************************************************/

	var source = window.PSCustomI18nPT || { exact: {}, patterns: [], html: {} };
	var exact = Object.create(null);
	// Mesmo texto com tradução diferente conforme a tag em volta, ex.: <label>Attack</label>
	// (atributo: "Ataque") x <button>Attack</button> (batalha: "Atacar"). Vem das entradas
	// "html" com uma tag simples e só texto dentro.
	var contextual = Object.create(null);
	var htmlEntries = Object.create(null);
	// Começo do texto das entradas "html": só elementos que começam igual são comparados
	var htmlPrefixes = Object.create(null);
	var patterns = [];
	var normalize = function (text) { return text.replace(/\s+/g, ' ').trim(); };
	var htmlPrefix = function (html) { return normalize(html.replace(/<[^>]*>.*$/, '')).slice(0, 16); };
	var escapeRegExp = function (text) { return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };

	(function compile() {
		var key;
		for (key in source.exact) exact[key] = source.exact[key];
		for (key in source.html) {
			var simple = /^<([a-z][a-z0-9]*)>([^<>]+)<\/\1>$/.exec(key);
			var simpleTranslation = /^<([a-z][a-z0-9]*)>([^<>]+)<\/\1>$/.exec(source.html[key]);
			if (simple && simpleTranslation) {
				contextual[simple[1].toUpperCase() + '>' + normalize(simple[2])] = simpleTranslation[2];
			} else {
				htmlEntries[normalize(key)] = source.html[key];
				htmlPrefixes[htmlPrefix(key)] = true;
			}
		}
		for (var i = 0; i < source.patterns.length; i++) {
			var entry = source.patterns[i];
			var order = [];
			var body = escapeRegExp(entry.en).replace(/\\\{(\d+)\\\}/g, function (match, index) {
				order.push(Number(index));
				return '(.+?)';
			});
			patterns.push({ re: new RegExp('^' + body + '$'), order: order, pt: entry.pt });
		}
	})();

	function translateString(text, tagName) {
		var key = normalize(text);
		if (!key || !/[A-Za-z]/.test(key)) return null;
		var result = tagName ? contextual[tagName + '>' + key] : undefined;
		if (result === undefined) result = exact[key];
		// Padrões só em textos curtos (mensagens de interface): evita custo alto de regex em textos longos
		if (result === undefined && key.length <= 300) {
			for (var i = 0; i < patterns.length; i++) {
				var match = patterns[i].re.exec(key);
				if (!match) continue;
				var values = {};
				for (var j = 0; j < patterns[i].order.length; j++) values[patterns[i].order[j]] = match[j + 1];
				result = patterns[i].pt.replace(/\{(\d+)\}/g, function (placeholder, index) {
					return values[index] !== undefined ? values[index] : placeholder;
				});
				break;
			}
		}
		if (typeof result !== 'string') return null;
		// Mantém os espaços das pontas do texto original (separam o texto das tags vizinhas)
		return /^\s*/.exec(text)[0] + result + /\s*$/.exec(text)[0];
	}

	/*********************************************************
	 * Tradução do DOM
	 *********************************************************/

	var TYPE_LIST = '(?:' + TYPES.join('|') + '|\\?\\?\\?)';
	var TYPE_RE = new RegExp('(\\b[Tt]ipos?\\s+)(' + TYPE_LIST + '(?:(?:,\\s*|\\s+e\\s+|\\s+ou\\s+|\\s*/\\s*)' + TYPE_LIST + ')*)(?![\\w-])', 'g');

	function isSkipped(element) {
		return !!(element && element.closest && element.closest(SKIP));
	}

	function typeIcon(type) {
		var img = document.createElement('img');
		img.src = Dex.resourcePrefix + 'sprites/types/' + type.replace(/\?/g, '%3f') + '.png';
		img.alt = type;
		img.title = type;
		img.width = 32;
		img.height = 14;
		img.className = 'pixelated';
		img.style.verticalAlign = 'middle';
		return img;
	}

	// "do tipo Fire" → "do tipo " + selo. Devolve true se trocou o nó.
	function insertTypeIcons(node, original) {
		var text = node.nodeValue;
		var parent = node.parentNode;
		if (!parent || parent.nodeName === 'OPTION' || parent.nodeName === 'TITLE' || !/[Tt]ipo/.test(text)) return false;
		TYPE_RE.lastIndex = 0;
		if (!TYPE_RE.test(text)) return false;
		TYPE_RE.lastIndex = 0;
		var span = document.createElement('span');
		span.className = 'ps-i18n-types ps-i18n-skip';
		span.psI18nOriginal = original;
		var last = 0, match;
		while ((match = TYPE_RE.exec(text))) {
			span.appendChild(document.createTextNode(text.slice(last, match.index) + match[1]));
			var parts = match[2].split(/(,\s*|\s+e\s+|\s+ou\s+|\s*\/\s*)/);
			for (var i = 0; i < parts.length; i++) {
				span.appendChild(i % 2 ? document.createTextNode(parts[i]) : typeIcon(parts[i]));
			}
			last = match.index + match[0].length;
		}
		span.appendChild(document.createTextNode(text.slice(last)));
		parent.replaceChild(span, node);
		return true;
	}

	// Rótulo de tipo dos botões de golpe (<small class="type">Dark </small>) vira o selo
	function replaceTypeLabel(node) {
		var parent = node.parentNode;
		var type = node.nodeValue.trim();
		if (!parent || parent.nodeName !== 'SMALL' || !$(parent).hasClass('type') || TYPES.indexOf(type) < 0) return false;
		var span = document.createElement('span');
		span.className = 'ps-i18n-types ps-i18n-skip';
		span.psI18nOriginal = node.nodeValue;
		span.appendChild(typeIcon(type));
		span.appendChild(document.createTextNode(' '));
		parent.replaceChild(span, node);
		return true;
	}

	function translateTextNode(node) {
		if (node.psI18nOriginal !== undefined) return;
		if (replaceTypeLabel(node)) return;
		var original = node.nodeValue;
		var parent = node.parentNode;
		var onlyChild = parent && parent.childNodes.length === 1;
		var translated = translateString(original, onlyChild ? parent.nodeName : null);
		if (translated !== null && translated !== original) {
			node.psI18nOriginal = original;
			node.nodeValue = translated;
		}
		insertTypeIcons(node, node.psI18nOriginal !== undefined ? node.psI18nOriginal : original);
	}

	function translateAttributes(element) {
		var list = ATTRIBUTES;
		if (element.nodeName === 'INPUT' && /^(button|submit|reset)$/i.test(element.type)) list = ATTRIBUTES.concat('value');
		for (var i = 0; i < list.length; i++) {
			var name = list[i];
			var value = element.getAttribute(name);
			if (!value) continue;
			var saved = element.psI18nAttributes;
			if (saved && saved[name] !== undefined && saved[name].translated === value) continue;
			var translated = translateString(value);
			if (translated === null || translated === value) continue;
			if (!saved) saved = element.psI18nAttributes = {};
			saved[name] = { original: value, translated: translated };
			element.setAttribute(name, translated);
		}
	}

	function translateHTML(element) {
		if (element.psI18nHTML !== undefined || !element.firstElementChild) return false;
		var first = element.firstChild;
		if (!first || first.nodeType !== 3 || !htmlPrefixes[normalize(first.nodeValue).slice(0, 16)]) return false;
		var html = element.innerHTML;
		if (html.length > 600) return false;
		var translated = htmlEntries[normalize(html)];
		if (translated === undefined) return false;
		element.psI18nHTML = html;
		element.innerHTML = translated;
		return true;
	}

	function translateTree(root) {
		if (root.nodeType === 3) {
			if (!isSkipped(root.parentNode)) translateTextNode(root);
			return;
		}
		if (root.nodeType !== 1 || isSkipped(root)) return;
		var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
			acceptNode: function (node) {
				if (node.nodeType === 1 && node.matches(SKIP)) {
					// O conteúdo de uma caixa de texto é do usuário, mas o placeholder é da interface
					if (node.nodeName === 'TEXTAREA') translateAttributes(node);
					return NodeFilter.FILTER_REJECT;
				}
				return NodeFilter.FILTER_ACCEPT;
			}
		});
		var nodes = [root];
		var node;
		while ((node = walker.nextNode())) nodes.push(node);
		for (var i = 0; i < nodes.length; i++) {
			node = nodes[i];
			if (node.nodeType === 3) {
				translateTextNode(node);
			} else {
				translateAttributes(node);
				translateHTML(node);
			}
		}
	}

	// Volta o DOM ao inglês (troca de idioma sem recarregar a página)
	function restoreTree(root) {
		var spans = root.querySelectorAll('span.ps-i18n-types');
		for (var i = 0; i < spans.length; i++) {
			if (spans[i].parentNode) spans[i].parentNode.replaceChild(document.createTextNode(spans[i].psI18nOriginal), spans[i]);
		}
		var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
		var node;
		var nodes = [];
		while ((node = walker.nextNode())) nodes.push(node);
		for (i = 0; i < nodes.length; i++) {
			node = nodes[i];
			if (node.nodeType === 3) {
				if (node.psI18nOriginal !== undefined) {
					node.nodeValue = node.psI18nOriginal;
					delete node.psI18nOriginal;
				}
				continue;
			}
			if (node.psI18nHTML !== undefined) {
				node.innerHTML = node.psI18nHTML;
				delete node.psI18nHTML;
			}
			if (node.psI18nAttributes) {
				for (var name in node.psI18nAttributes) {
					if (node.getAttribute(name) === node.psI18nAttributes[name].translated) {
						node.setAttribute(name, node.psI18nAttributes[name].original);
					}
				}
				delete node.psI18nAttributes;
			}
		}
	}

	var observer = new MutationObserver(function (mutations) {
		for (var i = 0; i < mutations.length; i++) {
			var mutation = mutations[i];
			if (mutation.type === 'childList') {
				for (var j = 0; j < mutation.addedNodes.length; j++) translateTree(mutation.addedNodes[j]);
			} else if (mutation.type === 'characterData') {
				var text = mutation.target;
				// Texto alterado pelo programa: a tradução anterior não vale mais
				if (text.psI18nOriginal !== undefined && text.nodeValue !== translateString(text.psI18nOriginal)) {
					delete text.psI18nOriginal;
				}
				if (!isSkipped(text.parentNode)) translateTextNode(text);
			} else if (mutation.type === 'attributes' &&
				(mutation.target.nodeName === 'TEXTAREA' ? !isSkipped(mutation.target.parentNode) : !isSkipped(mutation.target))) {
				translateAttributes(mutation.target);
			}
		}
	});

	function startTranslating() {
		translateTree(document.body);
		observer.observe(document.body, {
			childList: true, subtree: true, characterData: true,
			attributes: true, attributeFilter: ATTRIBUTES.concat('value')
		});
	}

	function stopTranslating() {
		observer.disconnect();
		restoreTree(document.body);
	}

	// alert/confirm/prompt não viram DOM: traduz a mensagem antes de mostrar
	['alert', 'confirm', 'prompt'].forEach(function (name) {
		var original = window[name];
		window[name] = function (message) {
			var args = Array.prototype.slice.call(arguments);
			if (current === 'portuguese' && typeof message === 'string') {
				var translated = translateString(message);
				if (translated !== null) args[0] = translated;
			}
			return original.apply(window, args);
		};
	});

	/*********************************************************
	 * Troca de idioma
	 *********************************************************/

	// Mantém o servidor no idioma escolhido (ele volta ao padrão a cada conexão nova)
	function syncServer() {
		if (!window.app || !app.user || !app.socket) return;
		var settings = app.user.get('settings') || {};
		if (settings.language === current) return;
		app.send('/updatesettings ' + JSON.stringify({ language: current }));
	}

	function refreshViews() {
		if (!window.app) return;
		if (app.topbar) app.topbar.updateUserbar();
		for (var roomid in app.rooms) {
			var room = app.rooms[roomid];
			if (room && room.battle) room.battle.resetToCurrentTurn();
		}
		if (app.rooms.teambuilder && app.rooms.teambuilder.update) app.rooms.teambuilder.update();
	}

	function setLanguage(id) {
		var language = findLanguage(id);
		if (!language || language.id === current) return;
		current = language.id;
		Storage.prefs('language', current);
		storeServerSetting();
		writeCookie();
		syncServer();
		document.documentElement.lang = current === 'portuguese' ? 'pt-BR' : 'en';
		if (current === 'portuguese') {
			startTranslating();
		} else {
			stopTranslating();
		}
		Dex.loadTextData().then(refreshViews, refreshViews);
	}

	var LanguagePopup = this.Popup.extend({
		className: 'ps-popup ps-i18n-skip',
		initialize: function () {
			var buf = '<p><strong>Idioma / Language</strong></p><ul class="popupmenu">';
			for (var i = 0; i < LANGUAGES.length; i++) {
				var language = LANGUAGES[i];
				var selected = language.id === current;
				buf += '<li><button name="selectLanguage" value="' + language.id + '" class="button' + (selected ? ' cur' : '') + '"' +
					(selected ? ' aria-pressed="true"' : '') + '>' +
					'<i class="fa fa-' + (selected ? 'check' : 'globe') + '"></i> ' + language.label + '</button></li>';
			}
			buf += '</ul>';
			this.$el.html(buf);
		},
		selectLanguage: function (id) {
			this.close();
			setLanguage(id);
		}
	});

	// Tela principal: o aviso "o novo cliente está disponível no seu idioma" leva ao cliente
	// novo, que o projeto não serve (decisão de 2026-10-17); a tradução é a deste cliente
	var addPseudoPM = MainMenuRoom.prototype.addPseudoPM;
	MainMenuRoom.prototype.addPseudoPM = function (options) {
		if (options && options.cssClass === 'newclient-embed') return;
		return addPseudoPM.apply(this, arguments);
	};

	// Botão no topo, antes do som
	var updateUserbar = Topbar.prototype.updateUserbar;
	Topbar.prototype.updateUserbar = function () {
		updateUserbar.apply(this, arguments);
		var label = 'Idioma / Language';
		this.$userbar.find('button[name=openSounds]').before(
			'<button class="button ps-i18n-skip" name="openLanguage" title="' + label + '" aria-label="' + label + '">' +
			'<i class="fa fa-globe"></i> ' + findLanguage(current).abbr + '</button> '
		);
	};
	Topbar.prototype.openLanguage = function (value, target) {
		app.addPopup(LanguagePopup, { sourceEl: target });
	};

	// Seletor "Language" das opções: só os idiomas do projeto, pelo mesmo caminho do botão
	var updateOptions = OptionsPopup.prototype.update;
	OptionsPopup.prototype.update = function () {
		updateOptions.apply(this, arguments);
		var buf = '';
		for (var i = 0; i < LANGUAGES.length; i++) {
			buf += '<option value="' + LANGUAGES[i].id + '"' + (LANGUAGES[i].id === current ? ' selected' : '') + '>' +
				LANGUAGES[i].label + '</option>';
		}
		this.$('select[name=language]').addClass('ps-i18n-skip').html(buf);
	};
	OptionsPopup.prototype.setLanguage = function (e) {
		setLanguage(e.currentTarget.value);
	};

	$(function () {
		document.documentElement.lang = current === 'portuguese' ? 'pt-BR' : 'en';
		if (current === 'portuguese') {
			startTranslating();
			Dex.loadTextData().then(refreshViews, refreshViews);
		}
		if (window.app && app.user) {
			app.user.on('change:settings', syncServer);
		}
	});

	window.PSCustomI18n = { setLanguage: setLanguage, getLanguage: function () { return current; }, translate: translateString };
}).call(this, jQuery);
