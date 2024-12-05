const state = {};
      const carouselList = document.querySelector('.carousel__list');
      const carouselItems = document.querySelectorAll('.carousel__item');
      const prevButton = document.querySelector('.carousel__control--prev');
      const nextButton = document.querySelector('.carousel__control--next');
      const elems = Array.from(carouselItems);
  
      carouselList.addEventListener('click', function (event) {
        var newActive = event.target.closest('.carousel__item');
        if (!newActive || newActive.classList.contains('carousel__item_active')) {
          return;
        };
        update(newActive);
      });
  
      prevButton.addEventListener('click', function () {
        movePrev();
      });
  
      nextButton.addEventListener('click', function () {
        moveNext();
      });
  
      const update = function(newActive) {
        const newActivePos = newActive.dataset.pos;
  
        const current = elems.find((elem) => elem.dataset.pos == 0);
        const prev = elems.find((elem) => elem.dataset.pos == -1);
        const next = elems.find((elem) => elem.dataset.pos == 1);
        const first = elems.find((elem) => elem.dataset.pos == -2);
        const last = elems.find((elem) => elem.dataset.pos == 2);
  
        current.classList.remove('carousel__item_active');
  
        [current, prev, next, first, last].forEach(item => {
          var itemPos = item.dataset.pos;
          item.dataset.pos = getPos(itemPos, newActivePos);
        });
      };
  
      const getPos = function (current, active) {
        const diff = current - active;
        if (Math.abs(current - active) > 2) {
          return -current
        }
        return diff;
      };
  
      const moveNext = function () {
        const newActive = elems.find((elem) => elem.dataset.pos == 1);
        update(newActive);
      };
  
      const movePrev = function () {
        const newActive = elems.find((elem) => elem.dataset.pos == -1);
        update(newActive);
      };
  
      const autoPlay = function () {
        setInterval(() => {
          moveNext();
        }, 4000);
      };
  
      autoPlay();