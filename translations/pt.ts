import type { TranslationCatalog } from '../build-tools/translations.mts';

export const translations: TranslationCatalog = {
	// #region Navigation
	// ==================================================================

	// TRANSLATORS: Note that "Home" and "Main Menu" refer to the same place
	// TRANSLATORS: So it's fine if they're the same word in your language
	"Home": "Início",
	// TRANSLATORS: This is used as a "Back to Home" button after battles
	"[Main menu]": "Início",
	// TRANSLATORS: the button that opens the teambuilder; consider something like "Edit teams"
	"[Teambuilder]": "Editar times",
	"Ladder": "Ladder",
	"Tournaments": "Torneios",
	"Friends": "Amigos",
	"Chat rooms": "Salas de chat",
	"Battles": "Batalhas",
	"News": "Notícias",
	"Offline": "Offline",
	"[Join chat]": "Entrar no chat",
	"[All tabs]": "Todas as abas",
	"[Menu]": "Menu",

	// #endregion Navigation

	// #region Generic UI
	// ==================================================================

	"[Hide]": "Ocultar",
	"[Close]": "Fechar",
	"[Done]": "Concluir",
	"[Back]": "Voltar",
	// TRANSLATORS: A computer copy command, like Ctrl+C
	"[Copy]": "Copiar",
	"[Edit]": "Editar",
	"[Delete]": "Excluir",
	"[Undo delete]": "Desfazer exclusão",
	// TRANSLATORS: "DM" is used to label DMs; "[Chat]" is the button to send a DM
	// TRANSLATORS: Feel free to use the same word for both (and for "Chat" in the Battle section)
	"DM": "Mensagem",
	"[Chat]": "Mensagem",
	"[OK]": "OK",
	"[Cancel]": "Cancelar",
	"[Accept]": "Aceitar",
	"[Reject]": "Recusar",
	"Random team": "Time aleatório",
	"[Sound]": "Som",
	"[Options]": "Opções",
	"[Battle options]": "Opções de batalha",
	"[Revert]": "Reverter",
	"[Refresh]": "Atualizar",
	"[Search]": "Buscar",
	"[Validate]": "Validar",
	"[Reconnect]": "Reconectar",
	"Disconnected": "Desconectado",
	"Connecting...": "Conectando...",
	"Loading...": "Carregando...",
	"Uploading...": "Enviando...",
	"[Change]": "Alterar",
	"[Add]": "Adicionar",
	"[Look up]": "Consultar",
	"[Save changes]": "Salvar alterações",
	"[Create]": "Criar",
	"[Rename]": "Renomear",
	"[Remove]": "Remover",
	"[Maximize]": "Maximizar",
	"[Expand/collapse]": "Expandir/recolher",

	// TRANSLATORS: connection/team-storage errors
	"Sorry, psim connections are unsupported by your browser.": "Desculpe, seu navegador não é compatível com conexões psim.",
	"Your browser doesn't support third-party cookies. Some things might not work correctly.": "Seu navegador não aceita cookies de terceiros. Algumas coisas podem não funcionar corretamente.",
	"Your team storage format is too old for PS. You'll need to upgrade it at {URL}": "O formato de armazenamento dos seus times é antigo demais para o PS. Você precisa atualizá-lo em {URL}",
	"Error loading uploaded teams: {ERROR}": "Erro ao carregar os times enviados: {ERROR}",
	"Error unknown. Try again later.": "Erro desconhecido. Tente novamente mais tarde.",
	"Failed to load team: {ERROR}": "Falha ao carregar o time: {ERROR}",
	"Error logging in.": "Erro ao entrar.",
	"Something is interfering with our connection to the login server. Most likely, your internet provider needs you to re-log-in, or your internet provider is blocking Pokémon Showdown.": "Algo está interferindo na nossa conexão com o servidor de login. O mais provável é que seu provedor de internet peça para você entrar de novo ou esteja bloqueando o Pokémon Showdown.",
	"Something is interfering with our connection to the login server.": "Algo está interferindo na nossa conexão com o servidor de login.",
	"You have been logged out and disconnected.\n\nIf you wanted to change your name while staying connected, use the 'Change Name' button or the '/nick' command.": "Você saiu da conta e foi desconectado.\n\nSe queria trocar de nome sem se desconectar, use o botão 'Trocar nome' ou o comando '/nick'.",
	"You are not connected and cannot send {MESSAGE}.": "Você não está conectado e não pode enviar {MESSAGE}.",
	"It's been over a day since you first connected. Please refresh.": "Já se passou mais de um dia desde que você se conectou. Atualize a página.",
	"Sorry, we don't know what to do with that file.\n\nSupported file types:\n- images (to set your background)\n- downloaded replay files\n- team files": "Desculpe, não sabemos o que fazer com esse arquivo.\n\nTipos de arquivo aceitos:\n- imagens (para definir o plano de fundo)\n- arquivos de replay baixados\n- arquivos de time",

	// TRANSLATORS: an unknown value, e.g. the "?" in "Ability: ? (Levitate, Heatproof)"
	"?": "?",
	// TRANSLATORS: appends a parenthetical to a value, e.g. "Ability: ? (Levitate, Heatproof)"
	// TRANSLATORS: note the leading space (fullwidth parens probably don't want one)
	" ({PARENTHETICAL})": " ({PARENTHETICAL})",

	// #endregion Generic UI

	// #region Popups
	// ==================================================================

	// TRANSLATORS: user popup
	// TRANSLATORS: "Global {RANK}" is a rank, like "Global Moderator"
	"Global {RANK}": "{RANK} global",
	"Chatrooms": "Salas de chat",
	"Private rooms": "Salas privadas",
	"OFFLINE": "OFFLINE",
	"Username": "Nome de usuário",
	"[Register]": "Cadastrar",
	"[Add status]": "Definir status",
	"[Chat self]": "Conversar consigo",
	"[Change name]": "Trocar nome",
	"[Log out]": "Sair",
	"[Add friend]": "Adicionar amigo",
	"[Unignore]": "Parar de ignorar",
	"[Ignore]": "Ignorar",
	"[Report]": "Denunciar",
	"[Mute]": "Silenciar",
	"[7m]": "7min",
	"[Hourmute]": "Silenciar 1h",
	"[1h]": "1h",
	"[Ban]": "Banir",
	"[2d]": "2d",
	"[Weekban]": "Banir 1 semana",
	"[1w]": "1sem",
	"[Modlog]": "Modlog",
	// TRANSLATORS: Showdown term for a global mute
	"[Lock]": "Lock",
	"[Weeklock]": "Lock 1 semana",
	"[Namelock]": "Bloquear nome",
	"[Global modlog]": "Modlog global",
	"[Avatar...]": "Avatar...",
	"[Close room]": "Fechar sala",
	"[Report a user]": "Denunciar um usuário",
	"({NUMBER} sec)": "({NUMBER} s)",
	"Room not found": "Sala não encontrada",

	// TRANSLATORS: battle options
	"Side-by-side, controls below": "Lado a lado, controles embaixo",
	"Side-by-side, overlay controls": "Lado a lado, controles sobrepostos",
	"Top-and-bottom, controls below": "Em cima e embaixo, controles embaixo",
	"Top-and-bottom, overlay controls": "Em cima e embaixo, controles sobrepostos",
	"Scrolling, controls below": "Rolagem, controles embaixo",
	"Scrolling, overlay controls": "Rolagem, controles sobrepostos",
	"Hardcore mode ON: Information not available in-game is now hidden.": "Modo hardcore LIGADO: informações que não aparecem nos jogos agora ficam ocultas.",
	"Hardcore mode OFF: Information not available in-game is now shown.": "Modo hardcore DESLIGADO: informações que não aparecem nos jogos agora são mostradas.",
	"Spectators ignored.": "Espectadores ignorados.",
	"Spectators no longer ignored.": "Espectadores não são mais ignorados.",
	"In this battle": "Nesta batalha",
	"Hardcore mode (hide info not shown in-game)": "Modo hardcore (oculta informações que não aparecem nos jogos)",
	"Ignore spectators": "Ignorar espectadores",
	"Ignore opponent": "Ignorar oponente",
	"Ignore nicknames": "Ignorar apelidos",
	"All battles": "Todas as batalhas",
	"Layout": "Layout",
	"Automatic ({SETTING})": "Automático ({SETTING})",
	"Automatic": "Automático",
	"(DESKTOP)": "(COMPUTADOR)",
	"(MOBILE VERTICAL)": "(CELULAR VERTICAL)",
	"(MOBILE HORIZONTAL)": "(CELULAR HORIZONTAL)",
	"You can still invite spectators by giving them the URL or using the /invite command": "Você ainda pode convidar espectadores passando a URL ou usando o comando /invite",
	"Invite only (hide from Battles list)": "Só por convite (oculta da lista de batalhas)",
	"Ignore Pokémon nicknames": "Ignorar apelidos dos Pokémon",
	"Automatically start timer": "Iniciar o timer automaticamente",
	// TRANSLATORS: this phrasing is because "forfeit" is an English word some people don't know
	// TRANSLATORS: if your language's word for "forfeit" is easily understandable, you may wish to skip the explanation
	"Forfeiting makes you lose the battle. Are you sure?": "Desistir faz você perder a batalha. Tem certeza?",
	"Replacement player's name:": "Nome do jogador substituto:",
	"Hardcore mode": "Modo hardcore",
	"Start at turn 0 when spectating battles": "Começar no turno 0 ao assistir batalhas",
	"Open new battles in the right-side panel": "Abrir novas batalhas no painel da direita",

	// TRANSLATORS: options
	"General": "Geral",
	"Language": "Idioma",
	"Appearance": "Aparência",
	"Theme": "Tema",
	"Light": "Claro",
	"Dark": "Escuro",
	"Match system theme": "Seguir o tema do sistema",
	"Two panels (if wide enough)": "Dois painéis (se houver espaço)",
	"Single panel": "Painel único",
	"Vertical tabs": "Abas verticais",
	"Background": "Plano de fundo",
	"Disable animations": "Desativar animações",
	"Use 2D sprites instead of 3D models": "Usar sprites 2D em vez de modelos 3D",
	"Use modern sprites for past generations": "Usar sprites modernos nas gerações antigas",
	"Block DMs": "Bloquear mensagens diretas",
	"Block challenges": "Bloquear desafios",
	"Show DMs in chatrooms": "Mostrar mensagens diretas nas salas de chat",
	"Do not highlight when your name is said in chat": "Não destacar quando seu nome for citado no chat",
	"Confirm before leaving a room": "Confirmar antes de sair de uma sala",
	"Confirm before refreshing": "Confirmar antes de atualizar a página",
	"Always notify": "Sempre notificar",
	"Notify when joined": "Notificar quando estiver na sala",
	"Hide": "Ocultar",
	"Timestamps": "Horário das mensagens",
	"Off": "Desligado",
	"Timestamps in DMs": "Horário nas mensagens diretas",
	"Chat preferences": "Preferências do chat",
	"[Change background]": "Trocar plano de fundo",
	"[Text formatting...]": "Formatação de texto...",
	"[Set as background]": "Usar como plano de fundo",
	"[Random]": "Aleatório",
	"Volume": "Volume",
	"(muted)": "(mudo)",
	"Default": "Padrão",
	// TRANSLATORS: "Built-in" backgrounds, as opposed to user-uploaded backgrounds
	"Official": "Oficiais",
	"Custom": "Personalizado",

	// TRANSLATORS: team chooser
	"(uncategorized)": "(sem categoria)",
	"(all)": "(todos)",
	"[Other gens]": "Outras gerações",
	"Select a team": "Escolha um time",
	"(empty box)": "(caixa vazia)",
	"(empty team)": "(time vazio)",
	"This team selector is no longer available (the challenge was cancelled or something).": "Este seletor de time não está mais disponível (o desafio foi cancelado ou algo assim).",
	"No teams found": "Nenhum time encontrado",
	"This format selector is no longer available.": "Este seletor de formato não está mais disponível.",
	"Search formats": "Buscar formatos",
	"No formats matching \"{SEARCH}\" found": "Nenhum formato encontrado para \"{SEARCH}\"",
	"No formats found": "Nenhum formato encontrado",

	// TRANSLATORS: login
	"[Choose name]": "Escolher nome",
	"Logging in...": "Entrando...",
	"[Log in]": "Entrar",
	"[Try another name]": "Tentar outro nome",
	"[Password...]": "Senha...",
	"[Change password]": "Trocar senha",
	"[Show password]": "Mostrar senha",
	"Loading Google log-in button...": "Carregando o botão de login do Google...",
	"(color)": "(cor)",
	"(Others will be able to see your name change. To change name privately, use \"Log out\")": "(Os outros vão ver a troca de nome. Para trocar de nome sem que vejam, use \"Sair\")",
	"if you registered this name:": "se você cadastrou este nome:",
	"if not:": "se não:",
	"This is someone else's account. Sorry.": "Esta conta é de outra pessoa. Desculpe.",
	"Password": "Senha",

	// TRANSLATORS: register / change password
	"All fields are required": "Todos os campos são obrigatórios",
	"Passwords do not match": "As senhas não coincidem",
	"Your password was successfully changed!": "Sua senha foi alterada com sucesso!",
	"Change your password:": "Troque sua senha:",
	"Old password": "Senha atual",
	"New password": "Nova senha",
	"New password (confirm)": "Nova senha (confirmação)",
	"You have been successfully registered.": "Seu cadastro foi feito com sucesso.",
	"Register your account:": "Cadastre sua conta:",
	"Password (confirm)": "Senha (confirmação)",
	"An Electric-type mouse that is the mascot of the Pokémon franchise.": "Um rato do tipo Electric que é o mascote da franquia Pokémon.",
	"What is this Pokémon?": "Que Pokémon é este?",

	// #endregion Popups

	// #region Main Menu
	// ==================================================================

	// TRANSLATORS: Our famous ladder queue button. Give it some flair :)
	// TRANSLATORS: Might we suggest "Showdown!"
	"[Battle!]": "Batalhar!",
	"Find a random opponent": "Encontrar um oponente aleatório",
	"Watch a battle": "Assistir a uma batalha",
	"Find a user": "Encontrar um usuário",
	// TRANSLATORS: A list of "games" you are currently in
	// TRANSLATORS: Games includes help tickets and similar interactive experiences that aren't exactly games
	"You are in:": "Você está em:",
	"Info & Resources": "Informações e recursos",
	"Lobby chat": "Chat do Lobby",

	// TRANSLATORS: Challenge/Search UI
	"[Challenge]": "Desafiar",
	"Custom rules": "Regras personalizadas",
	// TRANSLATORS: Search countdown. {NUMBER} = a number of seconds
	// TRANSLATORS: English doesn't include the unit (seconds) but your language can
	"Searching in {NUMBER}...": "Buscando em {NUMBER} s...",
	"Searching...": "Buscando...",
	"Pokédex": "Pokédex",
	"Replays": "Replays",
	"Forum": "Fórum",
	"Rules": "Regras",
	"Credits": "Créditos",
	"Privacy": "Privacidade",
	"background by {ARTIST}": "plano de fundo por {ARTIST}",

	// TRANSLATORS: errors
	"Wait for this countdown to finish first...": "Espere a contagem regressiva terminar primeiro...",
	"You're already searching for a {FORMAT} battle...": "Você já está buscando uma batalha de {FORMAT}...",
	"You need to go into the Teambuilder and build a team for this format.": "Você precisa ir ao Teambuilder e montar um time para este formato.",
	"Fan project, non-profit. Pokémon and all related names and images are trademarks and property of Nintendo, Creatures, Game Freak and The Pokémon Company.": "Projeto de fã, sem fins lucrativos. Pokémon e todos os nomes e imagens relacionados são marcas registradas e propriedade de Nintendo, Creatures, Game Freak e The Pokémon Company.",

	// #endregion Main Menu

	// #region Rooms
	// ==================================================================

	// TRANSLATORS: these go under the user/battle counts, and in English they read as "100 users online"
	// TRANSLATORS: but they don't have to work that way in your language
	"users online": "usuários online",
	"active battles": "batalhas ativas",
	"Find an online user": "Encontrar um usuário online",
	"Watch an active battle": "Assistir a uma batalha em andamento",
	"Meloetta is PS's mascot! The Aria forme is about using its voice, and represents our chatrooms.": "Meloetta é o mascote do PS! A forma Aria usa a voz e representa nossas salas de chat.",
	"Meloetta is PS's mascot! The Pirouette forme is Fighting-type, and represents our battles.": "Meloetta é o mascote do PS! A forma Pirouette é do tipo Fighting e representa nossas batalhas.",

	"Official chat rooms": "Salas de chat oficiais",
	"Hidden rooms": "Salas ocultas",

	"Subrooms": "Subsalas",
	"(All rooms)": "(Todas as salas)",
	"Join or search for rooms": "Entre ou busque salas",
	"Command": "Comando",
	"Console": "Console",
	"Enter = run command {INPUT}": "Enter = executar o comando {INPUT}",
	"(Subroom of {ROOM})": "(Subsala de {ROOM})",
	"Possible secret room": "Possível sala secreta",
	"(Private room?)": "(Sala privada?)",
	"Search results": "Resultados da busca",
	// TRANSLATORS: the current language's chatroom, not a list of language rooms
	"Language room": "Sala do idioma",

	// #endregion Rooms

	// #region Battle
	// ==================================================================

	// TRANSLATORS: Note that most translations of battle UI are in the server repository
	// TRANSLATORS: In data/text/[lang]/default.ts and data/text/[lang]/names.ts

	// TRANSLATORS: [Team]/[Battle]/[Switch]/[Shift] are buttons in overlay controls
	// TRANSLATORS: But they're section headers in normal battle controls
	// TRANSLATORS: For the "Use move" menu in battle controls
	// TRANSLATORS: This was "Attack" in older Showdown, "FIGHT" on older cart, and "Battle" on modern cart
	"[Battle]": "Lutar",
	// TRANSLATORS: For the "Switch" menu in battle controls
	// TRANSLATORS: This is "PKMN" on older cart, and "Pokémon" on modern cart
	"[Switch]": "Pokémon",
	// TRANSLATORS: For the Team Preview menu in battle controls
	// TRANSLATORS: Also replaces "[Switch]" in phases where switching isn't possible
	// TRANSLATORS: This is "PKMN" on older cart, and "Pokémon" on modern cart
	"[Team]": "Time",
	// TRANSLATORS: The Triples "move to center" button
	// TRANSLATORS: This is "SHIFT" on older cart; Triples doesn't exist on modern cart
	"[Shift]": "Mover",

	// TRANSLATORS: Mobile-layout buttons for switching between the battle view and the chat view
	// TRANSLATORS: ("Chat" is also used as a section header in the options popup)
	"Battle": "Batalha",
	"Chat": "Chat",
	"[Try Fight button]": "Tentar o botão Lutar",
	// TRANSLATORS: For the "where to target this move" menu
	"(empty slot)": "(posição vazia)",
	"Maxed with no max moves": "Dynamax sem Max Moves",
	"No Z moves": "Sem Z-Moves",

	"[Rematch]": "Revanche",
	"[Offer tie]": "Propor empate",
	"[Forfeit]": "Desistir",
	"[Forfeit and close]": "Desistir e fechar",
	"[Replace player]": "Substituir jogador",
	"[Replace]": "Substituir",
	"(turn 100+)": "(turno 100+)",
	"[Stop timer]": "Parar timer",
	"[Start timer]": "Iniciar timer",
	"Enter player's name": "Digite o nome do jogador",
	"Cannot replace player, battle has already ended.": "Não é possível substituir o jogador: a batalha já terminou.",

	// TRANSLATORS: for replay controls
	"[Play]": "Reproduzir",
	"[Pause]": "Pausar",
	"[First turn]": "Primeiro turno",
	"[Prev turn]": "Turno anterior",
	"[Skip turn]": "Pular turno",
	"[Skip to end]": "Pular para o fim",
	"[Switch viewpoint]": "Trocar ponto de vista",
	"[Go to turn]": "Ir para o turno",
	"[Skip]": "Pular",
	"[Skip animation]": "Pular animação",
	"[Move to center]": "Mover para o centro",
	"[Upload and share replay]": "Enviar e compartilhar replay",
	"[Replay]": "Replay",
	"(closes this battle)": "(fecha esta batalha)",

	// TRANSLATORS: for the battle list
	"Minimum Elo": "Elo mínimo",
	"rated {ELO}": "Elo {ELO}",
	// TRANSLATORS: goes between two usernames; the key includes its surrounding spacing so some languages can drop it
	"{PLAYER1} vs. {PLAYER2}": "{PLAYER1} vs. {PLAYER2}",
	"(All formats)": "(Todos os formatos)",
	"Username prefix": "Início do nome de usuário",
	"No battles are going on": "Nenhuma batalha em andamento",
	"{NUMBER} battle": "{NUMBER} batalha",
	"{NUMBER} battles": "{NUMBER} batalhas",
	"Timer": "Timer",
	"Error": "Erro",
	"The battle you're looking for has expired. Battles expire after 15 minutes of inactivity unless they're saved.": "A batalha que você procura expirou. As batalhas expiram após 15 minutos de inatividade, a menos que sejam salvas.",
	"In the future, remember to click \"Save replay\" to save a replay permanently.": "Da próxima vez, lembre-se de clicar em \"Salvar replay\" para guardar o replay permanentemente.",
	"Unrecognized HTML file: Only replay files are supported.": "Arquivo HTML não reconhecido: só arquivos de replay são aceitos.",
	"You are still in {ROOM}": "Você ainda está em {ROOM}",
	"Battle \"{INPUT}\" not found": "Batalha \"{INPUT}\" não encontrada",
	"Uploaded replay": "Replay enviado",
	"Team {PLAYER}": "Time de {PLAYER}",
	"{PLAYER} and friends": "{PLAYER} e amigos",

	// TRANSLATORS: battle log messages
	"[Earlier messages]": "Mensagens anteriores",
	"Register an account to protect your ladder rating!": "Cadastre uma conta para proteger sua pontuação na ladder!",
	"Open team sheet for {PLAYER}": "Abrir a ficha do time de {PLAYER}",
	"Warning": "Aviso",
	"Variation": "Variação",
	"Rated battle": "Batalha ranqueada",

	// TRANSLATORS: screen reader labels
	"Active Pokémon": "Pokémon em campo",
	"Your team": "Seu time",
	"Opponent's team": "Time do oponente",
	"Statused": "Com status",
	"Non-statused": "Sem status",
	"Unrevealed Illusion user": "Usuário de Illusion não revelado",
	"Not revealed": "Não revelado",
	"Battle controls": "Controles da batalha",

	// #endregion Battle

	// #region Chat
	// ==================================================================

	"{NUMBER} user": "{NUMBER} usuário",
	"{NUMBER} users": "{NUMBER} usuários",
	"[Join]": "Entrar",
	"[Leave]": "Sair",
	"[Ready!]": "Pronto!",
	"In progress": "Em andamento",
	"Signups": "Inscrições",
	"[Pop-out]": "Destacar",
	"[Go]": "Ir",
	"[Visit]": "Visitar",
	"[Choose a name before sending messages]": "Escolha um nome antes de enviar mensagens",
	"Challenging...": "Desafiando...",
	"Accepting...": "Aceitando...",
	"[Commands]": "Comandos",
	"Mentioned by {USER} in {ROOM}": "Mencionado por {USER} em {ROOM}",
	"{USERS} joined": "{USERS} entrou",
	// TRANSLATORS: separates "X joined" from "Y left"
	"{JOINEDMESSAGE}; {LEFTMESSAGE}": "{JOINEDMESSAGE}; {LEFTMESSAGE}",
	"{USERS} left": "{USERS} saiu",
	"{USER} renamed from {OLDUSER}.": "{OLDUSER} mudou o nome para {USER}.",
	"(Private to {USER})": "(Privado para {USER})",
	"{FORMAT} battle started between {PLAYER1} and {PLAYER2}.": "Batalha de {FORMAT} iniciada entre {PLAYER1} e {PLAYER2}.",
	// TRANSLATORS: for when the format name already includes "battle"
	"{FORMAT} started between {PLAYER1} and {PLAYER2}.": "{FORMAT} iniciada entre {PLAYER1} e {PLAYER2}.",
	// TRANSLATORS: for when the format is unknown
	"Battle started between {PLAYER1} and {PLAYER2}.": "Batalha iniciada entre {PLAYER1} e {PLAYER2}.",
	"({NUMBER} line from {USER} hidden)": "({NUMBER} linha de {USER} oculta)",
	"({NUMBER} lines from {USER} hidden)": "({NUMBER} linhas de {USER} ocultas)",
	"{USER} invited you to join the room \"{ROOM}\"": "{USER} convidou você para a sala \"{ROOM}\"",
	"[Join {ROOM}]": "Entrar em {ROOM}",
	"Chat log": "Histórico do chat",

	// TRANSLATORS: tournaments
	"Please respond to the tournament within {SECONDS} seconds or you may be automatically disqualified.": "Responda ao torneio em até {SECONDS} segundos, ou você poderá ser desclassificado automaticamente.",
	"Single Elimination": "Eliminação simples",
	"Double Elimination": "Eliminação dupla",
	"Round Robin": "Todos contra todos",
	"Double Round Robin": "Todos contra todos (ida e volta)",
	"{JOINS} joined the tournament": "{JOINS} entrou no torneio",
	"{LEAVES} left the tournament": "{LEAVES} saiu do torneio",
	// TRANSLATORS: sentence terminator for messages like the above
	"{SENTENCE}.": "{SENTENCE}.",
	"{FORMAT} {TYPE} tournament": "Torneio de {FORMAT} ({TYPE})",
	"No tournaments are currently running.": "Nenhum torneio em andamento no momento.",
	"(started)": "(iniciado)",
	"{TOURNAMENT} created.": "{TOURNAMENT} criado.",
	"{TOURNAMENT} created (and hidden).": "{TOURNAMENT} criado (e oculto).",
	"Tournament created": "Torneio criado",
	// TRANSLATORS: label, as in "Room: lobby"
	"Room": "Sala",
	"{USER} has joined the tournament, replacing {OLDUSER}.": "{USER} entrou no torneio no lugar de {OLDUSER}.",
	"({NUMBER} players)": "({NUMBER} jogadores)",
	"The tournament has started!": "O torneio começou!",
	"{USER} has been disqualified from the tournament.": "{USER} foi desclassificado do torneio.",
	"The tournament's automatic disqualify timer has been turned off.": "O timer de desclassificação automática do torneio foi desligado.",
	"The tournament's automatic disqualify timer has been set to {NUMBER} minute.": "O timer de desclassificação automática do torneio foi definido para {NUMBER} minuto.",
	"The tournament's automatic disqualify timer has been set to {NUMBER} minutes.": "O timer de desclassificação automática do torneio foi definido para {NUMBER} minutos.",
	"Tournament automatic disqualification warning": "Aviso de desclassificação automática do torneio",
	"Time": "Tempo",
	"{NUMBER} sec": "{NUMBER} s",
	"The tournament's automatic start is now off.": "O início automático do torneio foi desligado.",
	"The tournament will automatically start in {NUMBER} minute.": "O torneio vai começar automaticamente em {NUMBER} minuto.",
	"The tournament will automatically start in {NUMBER} minutes.": "O torneio vai começar automaticamente em {NUMBER} minutos.",
	"Scouting is now allowed (Tournament players can watch other tournament battles)": "Espionar agora é permitido (os jogadores do torneio podem assistir às outras batalhas do torneio)",
	"Scouting is now banned (Tournament players can't watch other tournament battles)": "Espionar agora é proibido (os jogadores do torneio não podem assistir às outras batalhas do torneio)",
	"Tournament challenges available": "Desafios de torneio disponíveis",
	"Tournament challenge from {PLAYER}": "Desafio de torneio de {PLAYER}",
	"Tournament battle between {PLAYER1} and {PLAYER2} started.": "Começou a batalha de torneio entre {PLAYER1} e {PLAYER2}.",
	"{PLAYER1} has won the match {SCORE} against {PLAYER2}": "{PLAYER1} venceu a partida por {SCORE} contra {PLAYER2}",
	"{PLAYER1} has lost the match {SCORE} against {PLAYER2}": "{PLAYER1} perdeu a partida por {SCORE} contra {PLAYER2}",
	"{PLAYER1} has drawn the match {SCORE} against {PLAYER2}": "{PLAYER1} empatou a partida por {SCORE} contra {PLAYER2}",
	" but the tournament does not support drawing, so it did not count": " mas o torneio não aceita empates, então ela não contou",
	"Congratulations to {WINNERS} for winning the {TOURNAMENT}!": "Parabéns a {WINNERS} por vencer o {TOURNAMENT}!",
	"Runners-up": "Vice-campeões",
	"Runner-up": "Vice-campeão",
	"The tournament was forcibly ended.": "O torneio foi encerrado à força.",
	"The tournament has already started.": "O torneio já começou.",
	"The tournament hasn't started yet.": "O torneio ainda não começou.",
	"You are already in the tournament.": "Você já está no torneio.",
	"One of your alts is already in the tournament.": "Uma das suas contas alternativas já está no torneio.",
	"You aren't in the tournament.": "Você não está no torneio.",
	"This user isn't in the tournament.": "Este usuário não está no torneio.",
	"There aren't enough users.": "Não há usuários suficientes.",
	"That isn't a valid timeout value.": "Esse não é um valor de tempo limite válido.",
	"That isn't a valid tournament matchup.": "Esse não é um confronto válido do torneio.",
	"You must have a name in order to join the tournament.": "Você precisa ter um nome para entrar no torneio.",
	"The tournament is already at maximum capacity for users.": "O torneio já atingiu o número máximo de usuários.",
	"You have already been disqualified.": "Você já foi desclassificado.",
	"This user has already been disqualified.": "Este usuário já foi desclassificado.",
	"You are banned from entering tournaments.": "Você está proibido de entrar em torneios.",
	"Unknown error: {ERROR}": "Erro desconhecido: {ERROR}",
	"Waiting for battles to become available...": "Aguardando batalhas disponíveis...",
	"vs. {PLAYER}": "vs. {PLAYER}",
	"Or wait for {PLAYERS} to challenge you.": "Ou espere {PLAYERS} desafiar você.",
	"Waiting for {PLAYERS} to challenge you.": "Aguardando {PLAYERS} desafiar você.",
	"Waiting for {PLAYER}...": "Aguardando {PLAYER}...",
	"Unavailable": "Indisponível",
	"Waiting": "Aguardando",
	"Challenging": "Desafiando",

	// TRANSLATORS: command errors
	"This player does not exist or is not online.": "Este jogador não existe ou não está online.",
	"This command can only be used in proper chat rooms.": "Este comando só pode ser usado em salas de chat de verdade.",
	"Error: corrupted ranking data": "Erro: dados de ranking corrompidos",
	"You are not in a battle": "Você não está em uma batalha",
	"Turn number?": "Número do turno?",
	"Invalid turn number: {NUMBER}": "Número de turno inválido: {NUMBER}",
	"Turn navigation is disabled in hardcore mode.": "A navegação por turnos fica desativada no modo hardcore.",
	"You are not a player in this battle": "Você não é jogador nesta batalha",
	"Can only be used in a DM.": "Só pode ser usado em mensagem direta.",
	"Please wait 5 seconds before challenging again.": "Espere 5 segundos antes de desafiar de novo.",

	// #endregion Chat

	// #region Teambuilder
	// ==================================================================

	// TRANSLATORS: the title of the teams list view, so it can't be singular
	// TRANSLATORS: something like "Teams List" is fine; "Teams" (plural of Team) is a separate key
	"Teambuilder": "Teambuilder",
	// TRANSLATORS: the back button from a team to the teams list; same wording as the list title is fine
	"[Teams]": "Teambuilder",
	"[New team]": "Novo time",
	"[New team in folder]": "Novo time na pasta",
	"[New {FORMAT} team]": "Novo time de {FORMAT}",
	"[New box]": "Nova caixa",
	"Search teams": "Buscar times",
	// TRANSLATORS: a jokey tone. feel free to take it or leave it
	"you have no teams lol": "você não tem nenhum time kkk",
	"you have no teams matching {TEXT}": "você não tem times que correspondam a {TEXT}",
	"you have no teams in this folder": "você não tem times nesta pasta",
	// TRANSLATORS: When deleting a folder, button to add folder name to all teams in it
	"[Convert to prefix]": "Converter em prefixo",
	"[(add folder)]": "(adicionar pasta)",
	"[(add format folder)]": "(adicionar pasta de formato)",
	"Folder name?": "Nome da pasta?",
	"Rename ``{FOLDER}`` to?": "Renomear ``{FOLDER}`` para?",
	"Delete ``{FOLDER}``? (doesn't delete teams)": "Excluir ``{FOLDER}``? (os times não são excluídos)",
	"Names can't contain slashes, since they're used as a folder separator.": "Os nomes não podem conter barras, porque elas separam as pastas.",
	"Names can't contain the character |, since they're used for storing teams.": "Os nomes não podem conter o caractere |, porque ele é usado para guardar os times.",
	"New name required": "É preciso informar um novo nome",
	"Not in a folder": "Fora de pasta",
	"Teams not in any folders": "Times fora de pastas",
	"All teams": "Todos os times",
	"Folders": "Pastas",

	// TRANSLATORS: for Clipboard actions
	"Copied!": "Copiado!",
	"[Paste copy here]": "Colar aqui",
	"[Add to clipboard]": "Adicionar à área de transferência",
	"[Copy/Move]": "Copiar/Mover",
	"[+ Clipboard]": "+ Área de transferência",
	"[Deselect]": "Desmarcar",
	"[Move here]": "Mover para cá",

	// TRANSLATORS: for Import/Export
	"[Backup]": "Backup",
	"[Backup search results]": "Backup dos resultados da busca",
	"[Backup folder]": "Backup da pasta",
	"Import/Export": "Importar/Exportar",
	"[Import/Export]": "Importar/Exportar",
	"[Import]": "Importar",
	"(can't save partial exports)": "(não é possível salvar exportações parciais)",

	// TRANSLATORS: for uploaded teams
	"Account": "Conta",
	"Account (public)": "Conta (público)",
	"Local": "Local",
	"Uploaded": "Enviado",
	"Public": "Público",
	"[Upload for shareable URL]": "Enviar para obter URL compartilhável",
	"[Upload for shareable/searchable URL]": "Enviar para obter URL compartilhável/pesquisável",
	"Disconnected (wrong account?)": "Desconectado (conta errada?)",
	"[Revert to uploaded version]": "Voltar à versão enviada",
	"[Compare]": "Comparar",
	"[Upload changes]": "Enviar alterações",
	"Team was deleted": "O time foi excluído",
	"Team doesn't exist": "O time não existe",
	"Untitled team": "Time sem nome",
	"Uploaded by": "Enviado por",
	"Views": "Visualizações",
	"Team deleted": "Time excluído",
	"Not found": "Não encontrado",

	// TRANSLATORS: for the team editor
	"[Add Pokémon]": "Adicionar Pokémon",
	"(choose ability)": "(escolha a habilidade)",
	"Details": "Detalhes",
	// TRANSLATORS: These two are for Hidden Power type
	// TRANSLATORS: They're both designed to take up very little width, so keep that in mind
	"H.P.": "H.P.",
	"H. Power": "H. Power",
	"Defensive coverage": "Cobertura defensiva",
	"Teambuilding resources for {FORMAT}": "Recursos para montar times de {FORMAT}",
	"[See all]": "Ver tudo",
	"Search species or filter by type, learnable moves, ability, tier, or egg group": "Busque espécies ou filtre por tipo, golpes aprendidos, habilidade, tier ou grupo de ovo",
	"Search abilities": "Buscar habilidades",
	"Search items": "Buscar itens",
	"Search moves or filter by type or category": "Busque golpes ou filtre por tipo ou categoria",
	"Sample sets": "Sets de exemplo",
	"Box sets": "Sets da caixa",
	"Guessed spread": "Distribuição sugerida",
	"(Please choose 4 moves to get a guessed spread)": "(Escolha 4 golpes para receber uma distribuição sugerida)",
	"Protip": "Dica",
	"Use a different nature to save {NUMBER} EVs:": "Use outra natureza para economizar {NUMBER} EVs:",
	"Use a different nature to get higher stats:": "Use outra natureza para ter atributos maiores:",
	"Natures cannot raise or lower HP.": "Naturezas não podem aumentar nem diminuir o HP.",
	// TRANSLATORS: {STATCHANGES} is +stat/-stat
	"{STATCHANGES} nature": "Natureza {STATCHANGES}",
	"You can also set natures by typing {PLUS} and {MINUS} in the EV box.": "Você também pode definir a natureza digitando {PLUS} e {MINUS} no campo de EVs.",
	"Pasted team": "Time colado",
	"Zoom out forms": "Reduzir formulários",
	"Compact": "Compacto",
	"Comfortable": "Confortável",
	"Zoom out search results": "Reduzir resultados da busca",
	"Fetching Paste...": "Buscando o Paste...",
	"Import/Export set": "Importar/Exportar set",
	"IV spreads": "Distribuições de IVs",
	"min Atk": "Atk mín.",
	"min Atk, min Spe": "Atk mín., Spe mín.",
	"max all": "tudo no máx.",
	"min Spe": "Spe mín.",
	"Hidden Power {TYPE} IVs": "IVs de Hidden Power do tipo {TYPE}",
	"EVs, IVs, and nature": "EVs, IVs e natureza",
	"Base": "Base",
	"Remaining": "Restantes",

	// TRANSLATORS: errors
	"You must select a format first.": "Primeiro escolha um formato.",
	"This team is for a different account. Please log into the correct account to update it.": "Este time é de outra conta. Entre na conta correta para atualizá-lo.",
	"Add a Pokémon to your team before uploading it.": "Adicione um Pokémon ao time antes de enviá-lo.",
	"Must use on an uploaded team.": "Só pode ser usado em um time enviado.",
	"Team not found: {INPUT}": "Time não encontrado: {INPUT}",
	"Your file \"{FILENAME}\" is not a valid team.": "Seu arquivo \"{FILENAME}\" não é um time válido.",
	"Hidden Power Type": "Tipo do Hidden Power",
	"Tera Type": "Tera Type",

	// #endregion Teambuilder

	// #region Ladder
	// ==================================================================

	"[All formats]": "Todos os formatos",
	"[How the ladder works]": "Como funciona a ladder",
	"[Seasonal rankings]": "Rankings da temporada",
	"[Look up a specific user's rating]": "Consultar a pontuação de um usuário",
	"Name": "Nome",
	"Elo rating": "Pontuação Elo",
	"user's percentage chance of winning a random battle (Glicko X-Act Estimate)": "chance percentual do usuário vencer uma batalha aleatória (estimativa Glicko X-Act)",
	"Glicko-1 rating system: rating±deviation (provisional if deviation>100)": "Sistema de pontuação Glicko-1: pontuação±desvio (provisória se desvio>100)",
	"No one has played any ranked games yet.": "Ninguém jogou partidas ranqueadas ainda.",

	// #endregion Ladder

	// #region Misc rooms
	// ==================================================================

	"[Join the Help room for live help]": "Entre na sala Help para ajuda ao vivo",
	"Unrecognized command: {INPUT}": "Comando não reconhecido: {INPUT}",

	// #endregion Misc rooms
};
