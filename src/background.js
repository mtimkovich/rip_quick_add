import {createEventUrl} from './helpers.js'

async function quickAdd(text, lang) {
  const url = createEventUrl(text, lang);

  if (url) {
    chrome.tabs.create({url});
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'id',
    title: 'Add to calendar: “%s”',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  const storage = await chrome.storage.sync.get()
  const lang = storage.lang
  quickAdd(info.selectionText, lang)
});

