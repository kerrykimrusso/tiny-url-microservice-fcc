document.addEventListener('load', () => {
  console.log('document loaded')
  let form = document.querySelector('#tiny_url_form'); 
  console.log()
  form.addEventListener('submit', (e) => {
    console.log('on submit')
    e.preventDefault();
    let url = document.querySelector('input[name="longUrl"]').val();
    window.location = "/new/" + url;
  });
});
