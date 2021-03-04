var addClickEvent = function(element) {
  let orderForm = document.getElementById('order');
  element.addEventListener('click', function(e) {
    e.preventDefault();
    orderForm.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

var getButton = function() {
  let orderBtns = document.querySelectorAll('.buy-js');
  orderBtns.forEach(function(item) {
    addClickEvent(item);
  });
}

getButton();