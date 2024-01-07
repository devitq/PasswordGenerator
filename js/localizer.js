var dictionary = {
  _: {
    password_generator: "Password Generator",
    click_to_copy: "click to copy",
    copied: "copied",
    click_generate: "CLICK GENERATE",
    length: "length",
    settings: "settings",
    uppercase: "Uppercase",
    lowercase: "Lowercase",
    numbers: "Numbers",
    symbols: "Symbols",
    generate: "GENERATE",
  },
  en: {
    password_generator: "Password Generator",
    click_to_copy: "click to copy",
    copied: "copied",
    click_generate: "CLICK GENERATE",
    length: "length",
    settings: "settings",
    uppercase: "Uppercase",
    lowercase: "Lowercase",
    numbers: "Numbers",
    symbols: "Symbols",
    generate: "GENERATE",
  },
  ru: {
    password_generator: "Генератор паролей",
    click_to_copy: "нажмите, чтобы скопировать",
    copied: "скопировано",
    click_generate: "НАЖМИТЕ ГЕНЕРИРОВАТЬ",
    length: "длина",
    settings: "настройки",
    uppercase: "Заглавные буквы",
    lowercase: "Строчные буквы",
    numbers: "Числа",
    symbols: "Символы",
    generate: "ГЕНЕРИРОВАТЬ",
  },
};

class HTMLLocalizer {
  constructor() {
    customElements.define("localized-text", LocalizedTextElement);
  }
}

class LocalizedTextElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    var key = this.hasAttribute("key") ? this.getAttribute("key") : "";
    var lang = this.hasAttribute("lang")
      ? this.getAttribute("lang")
      : this.getLang();
    this.innerHTML = this.translate(key, lang);
  }

  getLang() {
    var lang =
      navigator.languages != undefined
        ? navigator.languages[0]
        : navigator.language;
    return lang.split("-")[0];
  }

  translate(key, lang) {
    return lang in dictionary ? dictionary[lang][key] : dictionary["_"][key];
  }
}

new HTMLLocalizer();
