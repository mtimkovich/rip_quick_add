// Same thing but with promises because we love javascript so much.
async function quickAdd(text) {
  const endpoint = 'https://timkovi.ch/rip_quick_add_api';

  const storage = await chrome.storage.sync.get()
  const lang = storage.lang

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({text, lang})
  })
    .then(x => x.json())
    .then(data => {
      const url = data.url;
      if (url) {
        chrome.tabs.create({url});
      } else {
        document.getElementById('error').textContent = 'Could not parse time data from input';
      }
    });
}

document.getElementById('add').addEventListener('click', async (e) => {
  const input = document.getElementById('input').value;
  await quickAdd(input);
});

document.querySelector('#go-to-options').addEventListener('click', function () {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
});
