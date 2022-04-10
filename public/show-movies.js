const movieListDOM = document.querySelector('#movie-list')


const showMovies = async () => {
  try {
    const movies = await (await fetch('/movies/yellow')).json();

    movies.forEach(m => {
      const liDom = document.createElement("li");
      liDom.textContent = m.name;
      movieListDOM.appendChild(liDom);
    });

  } catch (error) {
    console.log(error);
  }
}

showMovies();