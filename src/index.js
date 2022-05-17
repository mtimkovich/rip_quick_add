function setError(msg='') {
  const error = document.querySelector('#error');
  error.innerText = msg;
}

document.addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;

  const response = await fetch('/', {
    method: 'POST',
    body: new FormData(form),
  });

  const url = (await response.json()).url;

  if (!url) {
    setError('could not parse a timestamp from the input 😞');
    return;
  }

  setError();
  open(url);
});
