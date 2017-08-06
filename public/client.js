window.addEventListener('load', () => {
  console.log('document loaded')
  let form = document.querySelector('#tiny_url_form'); 
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let longUrlInput = document.querySelector('#longUrl');
    console.log(document.querySelector('#longUrl'));
    let url = longUrlInput.value;
    window.location = "/new/" + url;
  });
});
