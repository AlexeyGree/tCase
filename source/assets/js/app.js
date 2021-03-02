// === mobile-nav data === //
var mainMenu = document.querySelector('.main-mobile-js');
var navMobile = document.querySelector('.nav-mobile-js');

var burgerState = false;
var mobileNavSettings = {
  transform: {
    main: 'translateX(0)',
    catalog: 'translateX(-100%)',
    ceilings: 'translateX(-200%)'
  },
  height: {
    main: '200px',
    catalog: '680px',
    ceilings: '365px'
  }
}
// === mobile-nav data === //

// === popup data === //
var popupSettings = {
  open: {
    visibility: 'visible',
    opacity: '1',
    transform: 'translateY(0)'
  },
  close: {
    visibility: 'hidden',
    opacity: '0',
    transform: 'translateY(-100%)'
  }
}

var headerPopup = {
  block: document.querySelector('.call-order-popup-js'),
  form: document.querySelector('.call-order-popup__form-js'),
}


// === popup data === //

var btns = document.querySelectorAll("[data-btn='btn']");

var getElement = function(elements, handler) {
  elements.forEach(handler);
}

var getBtnSettings = function(element) {
  switch (element.dataset.type) {
    case 'main':
      window.scroll(0, 0);
      mainMenu.style.transform = mobileNavSettings.transform.main;
      navMobile.style.height = mobileNavSettings.height.main;
      break;
    case 'catalog':
      window.scroll(0, 0);
      mainMenu.style.transform = mobileNavSettings.transform.catalog;
      navMobile.style.height = mobileNavSettings.height.catalog;
      break;
    case 'ceilings':
      window.scroll(0, 0);
      mainMenu.style.transform = mobileNavSettings.transform.ceilings;
      navMobile.style.height = mobileNavSettings.height.ceilings;
      break;
    case 'burger':
      if (!burgerState) {
        burgerState = true;
        navMobile.classList.remove('close');
        navMobile.classList.add('open');
      } else {
        navMobile.classList.remove('open');
        navMobile.classList.add('close');
        window.setTimeout(function() {
          mainMenu.style.transform = mobileNavSettings.transform.main;
          navMobile.style.height = mobileNavSettings.height.main;
          burgerState = false;
        }, 1000);
      }
      break;
    case 'call-open':
      headerPopup.block.style.visibility = popupSettings.open.visibility;
      headerPopup.block.style.opacity = popupSettings.open.opacity;
      headerPopup.form.style.transform = popupSettings.open.transform;
      headerPopup.form.style.opacity = popupSettings.open.opacity;
      break;
    case 'call-close':
      headerPopup.block.style.visibility = popupSettings.close.visibility;
      headerPopup.block.style.opacity = popupSettings.close.opacity;
      headerPopup.form.style.transform = popupSettings.close.transform;
      headerPopup.form.style.opacity = popupSettings.close.opacity;
      break;
    default:
      throw 'Незвестная кнопка'
      break;
  }
}

var addClickEvent = function(element) {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    getBtnSettings(element);
  });
}
getElement(btns, addClickEvent);

