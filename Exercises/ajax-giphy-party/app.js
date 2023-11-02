console.log("Let's get this party started!");

  async function GIFSearch(search) {
    try {
        const res = await axios.get(`http://api.giphy.com/v1/gifs/search`, {
            params: {
              q: search,
              api_key: `MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`
            }
        }) 
        const gifURL= res.data.data[0].images.original.url
        $(`#search`).append($(`<img src=${gifURL}>`))

    } catch (e) {
      alert("Nothing found!");
    }
  }
  
  const form = document.querySelector('#search');
  form.addEventListener("submit", function (e) {
    const input = document.querySelector('#input');
    e.preventDefault();
    GIFSearch(input.value);
    input.value = '';
  })
  $(`#delete`).on(`click`,function(){
    $(`#search img`).remove()
  })