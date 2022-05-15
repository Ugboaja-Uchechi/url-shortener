const apiUrl = "https://api.shrtco.de/v2/";
const originalLinks = document.querySelector('#original-links');
const shortLinks = document.querySelector('#short-links');
const button = document.querySelector('.button');
const input = document.querySelector('#api-input');

const shortenUrlAddress = () => {
  const data = async (urlvalue) => {
    const url = `${apiUrl}shorten?url=${urlvalue}`
    const get = await fetch(url)
    const response = await get.json()
    return response
  }
  button.addEventListener('click', async (e) => {
    const urlvalue = input.value;
    const { result: { original_link, short_link } } = await data(urlvalue)
  
   originalLinks.textContent += `${original_link}`;
   shortLinks.textContent += `${short_link}`;
   input.value = "";
  })
}

shortenUrlAddress()