const apiUrl = "https://api.shrtco.de/v2/";
const liLinks = document.querySelector('.links');
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
    e.preventDefault()
    const urlvalue = input.value;
    const { result: { original_link, short_link } } = await data(urlvalue)
  
   liLinks.textContent += `${original_link} ${short_link}`;
  })
}

shortenUrlAddress()