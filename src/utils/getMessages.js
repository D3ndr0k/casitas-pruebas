// utils/getMessages.js

export default function getMessages(locale) {
  switch (locale) {
    case "es":
      return import("../../messages/es.json");
    case "pt":
      return import("../../messages/pt.json");
    default:
      return import("../../messages/es.json");
  }
}
