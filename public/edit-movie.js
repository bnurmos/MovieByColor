const movieIDDOM = document.querySelector('.movie-edit-id')
const movieNameDOM = document.querySelector('.movie-edit-name')
const movieCompletedDOM = document.querySelector('.movie-edit-completed')
const editFormDOM = document.querySelector('.single-movie-form')
const editBtnDOM = document.querySelector('.movie-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showMovie = async () => {
  try {
    const {
      data: { movie },
    } = await axios.get(`/movies/${id}`)
    const { _id: movieID, completed, name } = movie

    movieIDDOM.textContent = movieID
    movieNameDOM.value = name
    tempName = name
    if (completed) {
      movieCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

showMovie()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const movieName = movieNameDOM.value
    const movieCompleted = movieCompletedDOM.checked

    const {
      data: { movie },
    } = await axios.patch(`/api/v1/movies/${id}`, {
      name: movieName,
      completed: movieCompleted,
    })

    const { _id: movieID, completed, name } = movie

    movieIDDOM.textContent = movieID
    movieNameDOM.value = name
    tempName = name
    if (completed) {
      movieCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited movie`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    movieNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
