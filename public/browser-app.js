const moviesDOM = document.querySelector('.movies')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.movie-form')
const taskInputDOM = document.querySelector('.movie-input')
const formAlertDOM = document.querySelector('.form-alert')
// Load movies from /api/movies
const showmovies = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { movies },
    } = await axios.get('/api/v1/movies')
    if (movies.length < 1) {
      moviesDOM.innerHTML = '<h5 class="empty-list">No movies in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }
    const allMovies = movies
      .map((movie) => {
        const { watched, _id: movieID, name } = movie
        return `<div class="single-movie ${watched && 'movie-watched'}">
<h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
<div class="movie-links">



<!-- edit link -->
<a href="movie.html?id=${movieID}"  class="edit-link">
<i class="fas fa-edit"></i>
</a>
<!-- delete btn -->
<button type="button" class="delete-btn" data-id="${movieID}">
<i class="fas fa-trash"></i>
</button>
</div>
</div>`
      })
      .join('')
    moviesDOM.innerHTML = allMovies
  } catch (error) {
    moviesDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showmovies()

// delete movie /api/movies/:id

// moviesDOM.addEventListener('click', async (e) => {
//   const el = e.target
//   if (el.parentElement.classList.contains('delete-btn')) {
//     loadingDOM.style.visibility = 'visible'
//     const id = el.parentElement.dataset.id
//     try {
//       await axios.delete(`/movies/${id}`)
//       showmovies()
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   loadingDOM.style.visibility = 'hidden'
// })

// form

// formDOM.addEventListener('submit', async (e) => {
//   e.preventDefault()
//   const name = movieInputDOM.value

//   try {
//     await axios.post('/api/v1/movies', { name })
//     showmovies()
//     movieInputDOM.value = ''
//     formAlertDOM.style.display = 'block'
//     formAlertDOM.textContent = `success, movie added`
//     formAlertDOM.classList.add('text-success')
//   } catch (error) {
//     formAlertDOM.style.display = 'block'
//     formAlertDOM.innerHTML = `error, please try again`
//   }
//   setTimeout(() => {
//     formAlertDOM.style.display = 'none'
//     formAlertDOM.classList.remove('text-success')
//   }, 3000)
// })
