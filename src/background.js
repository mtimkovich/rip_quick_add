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

  chrome.contextMenus.create({
    parentId: 'id',
    id: 'en',
    title: 'English',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    parentId: 'id',
    id: 'fr',
    title: 'French',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  quickAdd(info.selectionText,  info.menuItemId)
});

