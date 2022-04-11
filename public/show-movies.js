const moviesListDOM = document.querySelector('#movies-list')

const params = window.location.search
const colourRequested = new URLSearchParams(params).get('c')


const showMovies = async () => {
  try {
    const movies = await (await fetch(`/movies/${colourRequested}`)).json();
    moviesListDOM.innerHTML = '';

    movies.forEach(m => {
      const card = document.createElement("div");
      card.className = 'card';
      moviesListDOM.appendChild(card);

      const imgDom = document.createElement("img");
      imgDom.setAttribute("src", m.img);
      card.appendChild(imgDom);
      const cardBody = document.createElement("div");
      cardBody.className = 'card-body';
      cardBody.innerHTML = `

      <h2 class="card-title">${m.name}(${m.year})</h2>
      <h6 class="card-title">${m.starring} (${m.genre})</h6>
      <p class="card-text">${m.synopsis}</p>
      <button type="button" onclick="setWatched('${m._id}', ${m.watched});" class="btn btn-primary watched-${m.watched}">Set ${m.watched? 'unwatched': 'watched'}</button> 
      `
      card.appendChild(cardBody);
    });

  } catch (error) {
    console.log(error);
  }
}

const setWatched = async (movieId, movieWatched) => {
  const response = await fetch(`/movie/${movieId}`, {
    method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      watched: !movieWatched
    })
  });
  if(!response.ok){
    console.error(response.statusText, await response.text());
    return
  }
  await showMovies();
}

showMovies();