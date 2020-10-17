import './news-article.js';
import { topHeadlinesUrlUs,
        topHeadlinesUrlGb,
        topHeadlinesUrlIe,
        topHeadlinesUrlRo,
        topHeadlinesUrlHu,
        topHeadlinesUrlCa } from './newsApi.js';

async function fetchNews(country) {
  scrllTop();
  let res;
  switch (country) {
    case 'ie':
      res = await fetch(topHeadlinesUrlIe);
      document.querySelector('#country').innerHTML = 'Ireland';
      break;
    case 'gb':
      res = await fetch(topHeadlinesUrlGb);
      document.querySelector('#country').innerHTML = 'UK';
      break;
    case 'us':
      res = await fetch(topHeadlinesUrlUs);
      document.querySelector('#country').innerHTML = 'US';
      break;
    case 'ca':
      res = await fetch(topHeadlinesUrlCa);
      document.querySelector('#country').innerHTML = 'Canada';
      break;
    case 'ro':
      res = await fetch(topHeadlinesUrlRo);
      document.querySelector('#country').innerHTML = 'Romania';
      break;
    case 'hu':
      res = await fetch(topHeadlinesUrlHu);
      document.querySelector('#country').innerHTML = 'Hungary';
      break;
  }
  
  const json = await res.json();
  const main = document.querySelector('main');

  main.innerHTML = '';

  json.articles.forEach(article => {
    const el = document.createElement('news-article');
    el.article = article;
    main.appendChild(el);
  });
}

window.addEventListener('load', () => {
  fetchNews('ie');
  registerSW();
});

const btns = document.querySelectorAll('.country');
btns.forEach(btn => {
  btn.addEventListener('click', function() {
    fetchNews(this.getAttribute('data-country'));
  });
});


document.querySelector('#scrllTop').addEventListener('click', () => { scrllTop(); });
document.querySelector('#scrllTop-1').addEventListener('click', () => { scrllTop(); });
const scrllTop = () => { document.documentElement.scrollTop = 0; }

window.addEventListener('scroll', () => {
  document.documentElement.scrollTop > 240 ? document.querySelector('#scrllTop-1').classList.remove('hidden') : document.querySelector('#scrllTop-1').classList.add('hidden');
})

async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./sw.js');
    } catch (e) {
      console.log('SW registration failed');
    }
  }
}