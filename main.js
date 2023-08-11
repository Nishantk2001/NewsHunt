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
