const apiUrl = "https://cleanuri.com/api/v1/shorten";
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

let urlArray = JSON.parse(localStorage.getItem("urls")) || [];
let display = "";

// Function to display stored URLs on page load
const displayStoredUrls = () => {
  urlArray.forEach(obj => {
    display +=
      `
      <div id="links-flex">
        <p id="original-links">${obj.originalLink}</p>
        <div>
          <p id="short-links">${obj.shortLink}</p>
        </div>
        <div>
          <button onclick="copyBtn('${obj.shortLink}')">
            Copy
          </button>
        </div>
      </div>
      `;
  });
  linksContainer.innerHTML = display;
}

function copyBtn(shortUrl) {

  navigator.clipboard.writeText(shortUrl);

};

const shortenUrlAddress = () => {
  const data = async (urlvalue) => {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `url=${encodeURIComponent(urlvalue)}`
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error('Error in fetching URL Data');
    }
  }

  button.addEventListener('click', async (e) => {
    e.preventDefault();

    let urlvalue = input.value.trim();
    
    // Replace spaces with %20
    urlvalue = urlvalue.replace(/\s/g, '%20');

    // Remove tabs and newlines, and leading/trailing spaces again for safety
    urlvalue = urlvalue.replace(/[\t\n]/g, '');

    if (!urlvalue) {
      alert("Please enter a valid URL");
      return;
    }

    button.disabled = true;  // Prevent multiple clicks

    try {
      const result = await data(urlvalue);
      if (result && result.result_url) {
        const original_link = urlvalue;
        const short_link = result.result_url;

        input.value = "";

        display +=
          `
        <div id="links-flex">
          <p id="original-links">${original_link}</p>
          <div>
            <p id="short-links">${short_link}</p>
          </div>
                  <div>
          <button onclick="copyBtn('${short_link}')">
            Copy
          </button>
        </div>
        </div>
        `;

        linksContainer.innerHTML = display;

        let urlObjectParameter = {
          originalLink: original_link,
          shortLink: short_link,
        };

        urlArray.push(urlObjectParameter);
        localStorage.setItem("urls", JSON.stringify(urlArray));
      } else {
        alert("There was an error shortening the URL. Please try again.");
      }
    } catch (error) {
      alert(error.message);
    }

    button.disabled = false;
  });
}

// Load stored URLs from localStorage to display on page load
displayStoredUrls();
shortenUrlAddress();