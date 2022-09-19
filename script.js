let newsBox = document.getElementById("newsBox");
let spinner = document.getElementById("spinner");

let newsCategory = ['national', 'business', 'sports', 'world', 'politics', 'technology', 'startup', 'entertainment', 'miscellaneous', 'hatke', 'science', 'automobile'];

const xhr = new XMLHttpRequest();

function sendCategory(index) {
  getNews(newsCategory[index]);
}

getNews("all");


function getNews(newsCategoryName) {
  xhr.open('GET', `https://inshorts.deta.dev/news?category=${newsCategoryName}`, true);
  xhr.getResponseHeader('Content-type', 'application/json');

  xhr.onload = function() {
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      let data = json.data;
      let newsHTML = "";

      function showSpinner () {
        spinner.style.visibility = "hidden";
        newsBox.style.visibility = "visible";
      }
      xhr.onprogress = showSpinner();

      for (key in data) {
        let news = `<div class="newsCard card" >
                     <img src="${data[key].imageUrl}"
                     class="img ard-img-top img-thumbnail" alt="Image"

                     >
                     <h5 class="card-header">${data[key].title}</h5>
                     <div class="card-body">
                      <h5 class="card-title">author: ${data[key].author}</h5>
                      <p class="card-text>${data[key].content}</p>
                      <a target="_blank" href="${data[key].readMoreUrl}" class="btn btn-primary">read more..</a>
                     </div>
                     <div class="text-center card-footer text-muted">${data[key].date}</div>
                   </div>`;
            newsHTML = news;

      }
      newsBox.innerHTML = newsHTML;
    }
    else {
      console.log("error")
    }
  }

 xhr.send();
}
