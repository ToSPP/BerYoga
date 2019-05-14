window.onload = () => {
  // Show up
  const blocksClasses = ['.promo-block', '.features-block', '.articles-block'];
  // сдвиг сверху, чтобы блок появлялся не сразу по достижении его положения,
  // а чуть позже
  const shift = 150;

  const blocks = [];
  for (const item of blocksClasses) {
    const elem = document.querySelector(item);
    blocks.push({block: elem, offsetTop: elem.getBoundingClientRect().top});
  }

  window.addEventListener('scroll', function showUp() {
    if (blocks.length) {
      const viewportHeight = window.innerHeight;
      // блоки появляются по-порядку
      if (blocks[0].offsetTop - window.scrollY <= viewportHeight - shift) {
        blocks[0].block.classList.add('showed-up');
        blocks.shift();
      }
    } else {
      window.removeEventListener('scroll', showUp);
    }
  });

  // Scrolling
  const menu = document.querySelector('.top-menu');
  menu.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName === 'A') {
      const id = e.target.dataset.link;
      if (id) {
        const targetElem = document.querySelector(`#${id}`);
        scrollToTarget(targetElem, {marginTop: 100});
      }
    }
  });
};

function scrollToTarget(target, options = {}) {
  const maxAnimationTime = options.animationTime || 750;
  const framesCount = options.framesCount || 25;
  // отступ - при необходимсоти
  const marginTop = options.marginTop || 0;

  const targetOffsetTop = target.getBoundingClientRect().top;
  // ставим время в зависимости от расстояния до блока
  const time = maxAnimationTime * targetOffsetTop / document.body.offsetHeight;

  let t = setTimeout(function ScrollWindow() {
    // если текущий scroll выше положения элемента
    // и текущий scroll + высота окна браузера меньше общей высоты документа
    if (targetOffsetTop > window.scrollY + marginTop
      && window.scrollY + window.innerHeight < document.body.offsetHeight) {
      // если следующий сдвиг будет дальше положения блока
      if (targetOffsetTop + marginTop < window.scrollY + targetOffsetTop / framesCount) {
        // сдвигаем до блока
        window.scrollTo(0, targetOffsetTop);
      } else {
        // сдвигаем на шаг
        window.scrollTo(0, window.scrollY + targetOffsetTop / framesCount);
      }
      // новый timeout
      t = setTimeout(ScrollWindow, time / framesCount);
    } else {
      // очищаем timeout
      clearTimeout(t);
    }
  }, time / framesCount);
}