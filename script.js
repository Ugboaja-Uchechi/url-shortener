const apiUrl = "https://api.shrtco.de/v2/";
// const originalLinks = document.querySelector('#original-links');
// const shortLinks = document.querySelector('#short-links');
const button = document.querySelector('.button');
const headerFlex = document.querySelector('.header-flex');
const menu = document.querySelector('.menu');
const close = document.querySelector('.close');
const input = document.querySelector('#api-input');
const linksContainer = document.querySelector("#links-container");

menu.addEventListener('click', () => {
  headerFlex.style.display = 'block';
  close.style.display = 'block';
  menu.style.display = 'none';
  
});

close.addEventListener('click', () => {
  headerFlex.style.display = 'none';
  menu.style.display = 'block';
  close.style.display = 'none';
});

let urlArray = [];
let urlObjectParameter = {
  originalLink: "",
  shortLink: ""
}
// let urlObject = {};
let display = "";

// // let urlLocalStorage = JSON.parse(localStorage.getItem("url's"))
// // console.log(urlLocalStorage)

// let urlLocalStorage = JSON.parse(localStorage.getItem("url's"))

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
    // let urlObjectParameter = {
    //   originalLink: original_link,
    //   shortLink: short_link
    // }
    // // urlObjectParameter.originalLink = [`${original_link}`];
    // // urlObjectParameter.shortLink = [`${short_link}`];
    // // urlArray.push(urlObjectParameter)
    // localStorage.setItem("url's", JSON.stringify(urlObjectParameter))
    // console.log(localStorage)
// console.log(urlLocalStorage)
   input.value = "";

   display += 
   `
   <div>
      <p id="original-links">${original_link}</p>
      <div>
        <p id="short-links">${short_link}</p>
      </div>
    </div>
   `

  //  for (let i = 0; i < urlObjectParameter.length; i++) {
    // originalLinks.textContent = `${original_link}`
    // shortLinks.textContent = `${short_link}`
    // console.log(urlLocalStorage)
  // }
  
  linksContainer.innerHTML = display  
  })
}

shortenUrlAddress();