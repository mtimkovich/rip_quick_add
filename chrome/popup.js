// Same thing but synchronous because we love javascript so much.
function quickAdd(text) {
    const endpoint = 'https://timkovi.ch/rip_quick_add_api';

    let url = null;
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({text})
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

document.getElementById('add').addEventListener('click', (e) => {
    const input = document.getElementById('input').value;
    quickAdd(input);
});
