const LOCALES = {
  en: {label: "English", value: "en"},
  de: {label: "Deutsch", value: "de"},
  es: {label: "Español", value: "es"},
  fr: {label: "Français", value: "fr"},
  ja: {label: "日本語", value: "ja"},
  nl: {label: "Nederlands", value: "nl"},
  pt: {label: "Português", value: "pt"},
  ru: {label: "Русский", value: "ru"},
  uk: {label: "українська", value: "uk"},
  zh: {label: "中文", value: "zh"},
}

// Saves options to chrome.storage
const saveOptions = () => {
  const lang = document.getElementById('lang').value;

  chrome.storage.sync.set(
    {lang},
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    {lang: "en"},
    (items) => {
      document.getElementById('lang').value = items.lang;
    }
  );
};

const setLocalesOptions = () => {
  const langSelector = document.getElementById('lang');
  // Empty select inner html
  langSelector.innerHTML = ""

  Object.values(LOCALES).forEach(({label, value}) => {
    langSelector.innerHTML += `<option value='${value}'>${label}</option>`
  })
}

document.addEventListener('DOMContentLoaded', setLocalesOptions);
document.addEventListener('DOMContentLoaded', restoreOptions);

document.getElementById('save').addEventListener('click', saveOptions);
