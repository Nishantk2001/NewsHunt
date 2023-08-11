// const cricket = document.querySelector("#cricket");
// const football = document.querySelector("#football");
// const science = document.querySelector("#science");
// const technology = document.querySelector("technology");
// const navChilds = document.querrySelectorAll("nav > *");

const nav = document.querySelector("nav");
const links = nav.querySelectorAll("a");
const API_KEY = "5c31e8c93f154536b53a4df420956266";
const url = "https://newsapi.org/v2/everything?q=";
const main = document.querySelector(".card-container");
const searchText = document.querySelector("#searchText");
const searchBtn = document.querySelector("#searchBtn");

links.forEach((link) => {
  link.addEventListener("click", () => {
    console.log(link.textContent);
    main.innerHTML = "";
    main.innerHTML = `<div class="loader"></div>`;
    fetchData(url, API_KEY, link.innerText);
  });
});

searchBtn.addEventListener("click", () => {
  if (!searchText.value) {
    alert("Enter Your Search Text");
    return;
  }
  const userInput = searchText.value;
  main.innerHTML = "";
  main.innerHTML = `<div class="loader"></div>`;
  fetchData(url, API_KEY, userInput);
});

window.addEventListener("load", () => {
  main.innerHTML = `<div class="loader"></div>`;
  fetchData(url, API_KEY, "Pakistan");
});

async function fetchData(url, API_KEY, querry) {
  const completeUrl = `${url}${querry}&apiKey=${API_KEY}`;
  console.log(completeUrl);
  const response = await fetch(completeUrl);
  const data = await response.json();
  //   console.log(data.articles);
  document.querySelector(".loader").style.display = " none";
  bindDataToDom(data.articles);
}

function bindDataToDom(articles) {
  {
      // "source": {
      //     "id": "bbc-news",
      //     "name": "BBC News"
      // },
      // "author": "https://www.facebook.com/bbcnews",
      // "title": "Cyclone Biparjoy: At least two people dead after storm hits India",
      // "description": "Dozens more have been injured after the large storm made landfall along the India-Pakistan coastline.",
      // "url": "https://www.bbc.co.uk/news/world-asia-india-65924553",
      // "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/FE92/production/_130107156_15e8279c14908ea6fc993e25f56a329b5a434021.jpg",
      // "publishedAt": "2023-06-16T04:29:13Z",
      // "content": "Media caption, Heavy rains lash Indian and Pakistani coastal areas\r\nAt least two people have been killed and 22 injured after Cyclone Biparjoy made landfall in eastern India near the Pakistan border.… [+2586 chars]"
  }

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    main.innerHTML += `<section>
    <article>
        <div class="card-container">
            <div class="card">
                <img class="news-image" src=${
                  article.urlToImage
                } alt="picture" id="newsImage" />
                <div class="card-info">
                    <div class="news-title" id="newsTitle">${
                      article.title
                    }</div>
                    <div class="author-name-date-time">
                        <span class="author-name" id="authorName">${
                          article.author
                        } .</span>
                        <span class="date-time" id="dateTime">${new Date(
                          article.publishedAt
                        ).toLocaleString()}</span>
                    </div>
                    <div class="news-description" id="newsDescription">${
                      article.description
                    }.</div>
                </div>
            </div>
        </div>

    </article>
</section>`;
  });
}
