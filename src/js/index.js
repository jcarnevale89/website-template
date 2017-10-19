const navButtons = document.querySelectorAll('.navTrigger')
const websiteBody = document.querySelector('body')
const websiteMain = document.querySelector('main')
// const websiteClose = document.querySelector('main:before')

const menuToggle = (e) => {
  console.log(e)
  websiteBody.classList.toggle('is-active')
}

navButtons.forEach((button) => {
  button.addEventListener('click', menuToggle)
})

// if (websiteClose) {
//   websiteClose.addEventListener('click', menuToggle)
// }
