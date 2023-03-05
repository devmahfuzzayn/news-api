const API_KEY = "a98851fceca74af5a6b039011f556054";

const loadNewsData = async () => {
    const api = `https://newsapi.org/v2/everything?q=tesla&from=2023-02-05&sortBy=publishedAt&apiKey=${API_KEY}`;
    const res = await fetch(api);
    const data = await res.json();
    displayNewsData(data);
};

const displayNewsData = (data) => {
    const totalResult = document.getElementById("total-result");
    totalResult.innerText = `Total Results: ${data.totalResults}`;
    const newsContainer = document.getElementById("news-container");
    const articles = data.articles;
    articles.forEach((article) => {
        const articleDiv = document.createElement("div");
        articleDiv.setAttribute("class", "article");
        articleDiv.innerHTML = `
            <div class="box h-full flex flex-col justify-center gap-y-3 border-2 border-gray-300 rounded-lg p-4 overflow-hidden">
                ${
                    article.urlToImage !== null
                        ? `<img class="rounded-lg" src="${article.urlToImage}" alt="Image"/>`
                        : ""
                }
                ${
                    article.author
                        ? "<h2 class='text-right font-bold'>Author: <span class='font-normal'>" +
                          article.author +
                          "</span></h2>"
                        : ""
                }
                <h2 class="font-bold">Title: <span class="font-normal">${
                    article.title
                }</span></h2>
                <h2 class="font-bold">Content: <span class="font-normal">${
                    article.content
                }</span></h2>
                <h2 class="font-bold">Description: <span class="font-normal">${
                    article.description
                }</span></h2>
                
                <h2 class="font-bold overflow-hidden">Link: <span class="font-normal"><a class="text-blue-500" href="${
                    article.url
                }" target="_blank">${article.url}</a></span></h2>
                <p></p>
                <h2 class="font-bold">Published at: <span class="font-normal">${new Date(
                    article.publishedAt
                ).getDate()} ${new Date(article.publishedAt).toLocaleString(
            "en-us",
            { month: "short" }
        )}, ${new Date(article.publishedAt).toLocaleString("en-us", {
            year: "numeric",
        })}</span></h2>
                <h2 class="font-bold">Title: <span class="font-normal">${
                    article.source.name
                }</span></h2>
            </div>
        `;
        newsContainer.appendChild(articleDiv);
        // console.log(article);
    });
};

loadNewsData();
