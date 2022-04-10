const moviesListDOM = document.querySelector('#movies-list')

const params = window.location.search
const colourRequested = new URLSearchParams(params).get('c')


const showMovies = async () => {
  try {
    const movies = await (await fetch(`/movies/${colourRequested}`)).json();

    movies.forEach(m => {
      const card = document.createElement("div");
      card.className='card';
      moviesListDOM.appendChild(card);

      const imgDom = document.createElement("img");
      imgDom.setAttribute("src", m.img);
      card.appendChild(imgDom);
      const cardBody = document.createElement("div");
      cardBody.className='card-body';
      cardBody.innerHTML=`

      <h2 class="card-title">${m.name}(${m.year})</h2>
      <h6 class="card-title">${m.starring} (${m.genre})</h6>
      <p class="card-text">${m.synopsis}</p>
      <a href="#" action="javascript:setWatched(${m._id})" class="btn btn-primary">Go somewhere</a>
      `
      card.appendChild(cardBody);

      
    });

  } catch (error) {
    console.log(error);
  }
}

const setWatched = function(movieId){

}

showMovies();