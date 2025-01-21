import {createEventUrl} from './helpers.js'

function quickAdd(text, lang) {
  const url = createEventUrl(text, lang);

  if (url) {
    chrome.tabs.create({url});
  } else {
    document.getElementById('error').textContent = 'Could not parse time data from input';
  }
}

document.getElementById('add').addEventListener('click', async (e) => {
  const input = document.getElementById('input').value;
  const storage = await chrome.storage.sync.get();
  const lang = storage.lang;

  quickAdd(input, lang);
});

document.getElementById('go-to-options').addEventListener('click', () => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    open(chrome.runtime.getURL('options.html'));
  }
});

document.getElementById('pop-out').addEventListener('click', () => {
  chrome.windows.create({
    url: chrome.runtime.getURL('popup.html'),
    type: 'popup',
    height: 250,
    width: 350,
  });

  close();
});

const img = document.getElementById('pop-out-img')
img.src = chrome.runtime.getURL('popout.png');
