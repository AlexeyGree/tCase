var initSlider = function() {
  let viewBox = document.querySelector('.viewbox-js');
  let leftBtn = document.querySelector('.slide-left-js');
  let rightBtn = document.querySelector('.slide-right-js');
  
  leftBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let activeSlide = document.querySelector('.slide-active-js');
    activeSlide.classList.remove('slide--active');
    activeSlide.classList.remove('slide-active-js');

    if(activeSlide.previousElementSibling === null) {
      console.log(viewBox.lastElementChild);
      viewBox.lastElementChild.classList.add('slide--active');
      viewBox.lastElementChild.classList.add('slide-active-js');
    } else {
      activeSlide.previousElementSibling.classList.add('slide--active');
      activeSlide.previousElementSibling.classList.add('slide-active-js');
    }
  });

  rightBtn.addEventListener('click', function(e) {
    e.preventDefault();
    let activeSlide = document.querySelector('.slide-active-js');
    activeSlide.classList.remove('slide--active');
    activeSlide.classList.remove('slide-active-js');

    if(activeSlide.nextElementSibling === null) {
      viewBox.firstElementChild.classList.add('slide--active');
      viewBox.firstElementChild.classList.add('slide-active-js');
    } else {
      activeSlide.nextElementSibling.classList.add('slide--active');
      activeSlide.nextElementSibling.classList.add('slide-active-js');
    }
  });
}
initSlider();