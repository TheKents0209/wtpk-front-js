'use strict';

const form = document.querySelector('#search-form');
const main = document.querySelector('main');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  try {
    const searchWord = document.querySelector('input[name=search-field]').value;
    const response = await fetch(
        'http://api.tvmaze.com/search/shows?q=' + searchWord);
    const shows = await response.json();
    console.log(shows);

    shows.forEach((show,index) => {
      const html = `<article>
                    <h2>${show.show.name}</h2>
                    <a href="${show.show.officialSite || show.show.url}">Link to homepage</a>
                    <figure data-id="index">
                        <img src="${show.show.image ? show.show.image.medium : 'http://placekitten.com/210/295'}" alt="${show.show.name}">
                        <figcaption></figcaption>
                    </figure>
                    <p>Genres: ${show.show.genres.join(' | ')}</p>
                    ${show.show.summary}
                 </article>`;
      main.innerHTML += html;
    });

    const figures = document.querySelectorAll('figure');
    figures.forEach((figure)=>{
      figure.addEventListener('click', (evt)=>{
        const id = figure.dataset.id;
        console.log(shows[id].show.image.original);
      })
    });
  } catch (e) {

  }
});