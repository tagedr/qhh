export class Ru {
  static INTERVIEWS = "Собеседования";
  static TAGS_AND_COLORS = "Список тегов";
  static ENTER_MESSAGE_HERE = "Введите сообщение";
  static CHANGE_CANDIDATE_TAGS_FOR = "Изменение тегов для кандидата";
  static NO_MESSAGES = "Сообщений нет";
  static ENTER_TAGS = "Введите теги для поиска ( например: 'cpp, new' ) ";
  static FROM_DATE = "С даты";
  static TO_DATE = "До даты";
  static LOGIN = "логин";
  static PASSWORD = "пароль";
  static ENTER = "Войти";
  static LOGOUT = "Выйти";
  static BY = " от ";
  static ADDED = " добавлен ";
  static UNREAD_NEW_CHANGES = "Новые изменения";
  static ENTER_NEW_TAGS = "Введите новые теги";
  static SEND = "Отправить";
  static ADD_NEW_INTERVIEW = "Назначить собеседование";
  static ADD_NEW_INTERVIEW_FOR = "Назначить собеседование для";
  static COMMENTS = "Комментарии";
  static DATE_TIME = "Дата и время";
  static CANDIDATE = "Кандидат";
  static INTERVIEWER = "Интервьювер";
  static WELCOME_USER = "Контактное лицо";
  static ENTER_LOGIN_AND_PASS =
    'Вход. Введите логин и пароль, после чего нажмите кнопку "' +
    Ru.ENTER +
    '".';
  static NOTIFICATIONS = "Оповещения";
  static DROP_NEW_CANDIDATES_HERE = "Перетащите сюда новых кандидатов!";
  static NOTHING_TO_UPLOAD = "Нечего загружать";
  static UPLOAD = "Загрузить ";
  static _NEW_CANDIDATES = "новых кандидатов";
  static NEW_CANDIDATES = "Новые кандидаты";
  static FIND_UPDATED = "Найти";
  static FIND_CREATED = "Найти созданные";
  static USER_MESSAGES = "Сообщения";
  static TAGS_CHANGED = "Изменения тегов";
  static ACTIONS = "Действия";
  static READ_EVERYTHING = "С изменениями ознакомился";
  static LOGS_IS_EMPTY = "Событий пока нет";
  static SYS_LOGIN_OK = { BODY: "Вы вошли в систему", LEVEL: "light" };
  static SYS_LOGIN_FAILED = { BODY: "Попытка входа неудалась", LEVEL: "danger" };
  static SYS_POST_ATTACHES_OK = { BODY: "Новые файлы загружены", LEVEL: "success" };
  static SYS_POST_ATTACHES_FAILED = { BODY: "Новые файлы НЕ загружены", LEVEL: "danger" };
  static SYS_HEARTBEAT_FAILED = { BODY: "Пропала связь с сервером", LEVEL: "danger" };
  static SYS_HEARTBEAT_OK = { BODY: "Связь с сервером восстановлена", LEVEL: "light" };
  static SYS_POST_MESSAGE_FAILED = { BODY: "Сообщение не отправлено (перезагрузите страницу и попробуйте снова)", LEVEL: "warning" };
  static SYS_GET_CANDIDATE_DETAILS_FAILED = { BODY: "Ошибка получения резюме №__1__", LEVEL: "danger" };
  static SYS_GET_CANDIDATE_DETAILS_OK = { BODY: "Резюме №__1__ скачано", LEVEL: "light" };
  static DELETE = "Удалить";
}

export class En {
  static INTERVIEWS = "Interviews";
  static ADD_NEW_INTERVIEW = "Add interview";
  static ADD_NEW_INTERVIEW_FOR = "Add interview for";
  static TAGS_AND_COLORS = "Tag list";
  static ENTER_MESSAGE_HERE = "Enter message here";
  static CHANGE_CANDIDATE_TAGS_FOR = "Change cTags for";
  static NO_MESSAGES = "No messages";
  static ENTER_TAGS = "Enter tags to search for ( ex. 'dev, new' ) ";
  static FROM_DATE = "From date";
  static TO_DATE = "To date";
  static LOGIN = "login";
  static PASSWORD = "password";
  static ENTER = "Login";
  static LOGOUT = "Logout";
  static BY = " by ";
  static ADDED = " added ";
  static UNREAD_NEW_CHANGES = "New changes";
  static ENTER_NEW_TAGS = "Enter new tags";
  static SEND = "Send";
  static COMMENTS = "Comments";
  static DATE_TIME = "Date and time";
  static CANDIDATE = "Candidate";
  static INTERVIEWER = "Interviewer";
  static WELCOME_USER = "Welcome user";
  static ENTER_LOGIN_AND_PASS =
    'Login. Enter login and password, then press "' + En.ENTER + '" button.';
  static NOTIFICATIONS = "Messages";
  static DROP_NEW_CANDIDATES_HERE = "Drop new candidates here!";
  static NOTHING_TO_UPLOAD = "Nothing to upload";
  static UPLOAD = "Upload ";
  static NEW_CANDIDATES = "New candidate(s)";
  static _NEW_CANDIDATES = "new candidate(s)";
  static FIND_UPDATED = "Find";
  static FIND_CREATED = "Find created";
  static USER_MESSAGES = "User messages";
  static TAGS_CHANGED = "Tags changes";
  static ACTIONS = "Actions";
  static READ_EVERYTHING = "I read everything";
  static DELETE = "Delete";
  static SYS_LOGIN_OK = { BODY: "You're logon", LEVEL: "light" };
  static SYS_LOGIN_FAILED = { BODY: "Login attempt failed", LEVEL: "danger" };
  static SYS_POST_ATTACHES_OK = { BODY: "New files uploaded", LEVEL: "success" };
  static SYS_POST_ATTACHES_FAILED = { BODY: "New files are NOT uploaded", LEVEL: "danger" };
  static SYS_HEARTBEAT_FAILED = { BODY: "Lost connection with the server", LEVEL: "danger" };
  static SYS_HEARTBEAT_OK = { BODY: "Server connection restored", LEVEL: "light" };
  static SYS_POST_MESSAGE_FAILED = { BODY: "Message not sent (reload the page and try again)", LEVEL: "warning" };
  static SYS_GET_CANDIDATE_DETAILS_FAILED = { BODY: "Error receiving CV №__1__", LEVEL: "danger" };
  static SYS_GET_CANDIDATE_DETAILS_OK = { BODY: "CV №__1__ downloaded", LEVEL: "light" };
  static LOGS_IS_EMPTY = "Log is empty";
}

export const TR = En;