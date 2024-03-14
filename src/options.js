import {EN, LOCALES} from "./constants.js";

// Saves options to chrome.storage
const saveOptions = () => {
  const lang = document.getElementById('lang').value;

  chrome.storage.sync.set(
    { lang },
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
    { lang: EN },
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
