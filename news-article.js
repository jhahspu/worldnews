class NewsArticle extends HTMLElement {

  // Shadow DOM -- incapsulate and hide the inner details of the component.. don't forget to add the styles of the element here

  // constructor() {
  //   super();
  //   this.root = this.attachShadow({
  //       mode: 'open'
  //     });
  // }

  // USE this.root.innerHTML = '...'

  set article(article) {
    this.innerHTML = 
      `<a href="${article.url}" target="_blank">
        <h2>${article.title}</h2>
        <div class="img">
          <img src="${article.urlToImage || ''}" alt="...">
        </div>
        <p>${article.description || ''}</p>
      </a>`;
  }

}

customElements.define('news-article', NewsArticle);