import {createEventUrl} from './helpers.js'

function quickAdd(text, lang) {
  const url = createEventUrl(text, lang);

  if (url) {
    chrome.tabs.create({url});
  } else {
    document.getElementById('error').textContent = 'Could not parse time data from input';
  }
}

document.getElementById('add').addEventListener('click', (e) => {
  const input = document.getElementById('input').value;
  const lang = document.getElementById('lang')

  quickAdd(input, lang.value);
});
