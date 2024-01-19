async function quickAdd(data) {
    const text = data.selectionText;
    const endpoint = 'https://timkovi.ch/rip_quick_add_api';

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text})
    });

    const url = (await response.json()).url;

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

chrome.contextMenus.onClicked.addListener(quickAdd);

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.type === 'add') {
//         quickAdd(request.data);
//     }
//     return true;
// });
