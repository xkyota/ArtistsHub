const feedback = document.querySelector('.feedback');

fetch('https://sound-wave.b.goit.study/api/feedbacks')
  .then(response => response.json())
  .then(data => {
    const filteredFeedbacks = data.data.filter(isValidFeedback);

    filteredFeedbacks.forEach(element => {
      feedback.insertAdjacentHTML(
        'beforeend',
        `  <div class="feedback-item swiper-slide">
              <div class="stars">
                <span class="star" data-value="1"></span>
                <span class="star" data-value="2"></span>
                <span class="star" data-value="3"></span>
                <span class="star" data-value="4"></span>
                <span class="star" data-value="5"></span>
              </div>
              <p class="item-coment">${element.descr}</p>
              <p class="item-person">${element.name}</p>
           </div> `
      );

      const lastItem = feedback.lastElementChild;
      fillStars(lastItem, element.rating);
    });

    const swiper = new Swiper('.swiper', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
    
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  })
  .catch(error => {
    console.log(error);
  });

function fillStars(container, rating) {
  const stars = container.querySelectorAll('.star');

  stars.forEach((star, index) => {
    let fillPercent = 0;

    if (index + 1 <= rating) {
      fillPercent = 100;
    } else if (index < rating) {
      const decimal = rating - index;
      fillPercent = Math.round(decimal * 100);
    }

    star.style.setProperty('--fill', `${fillPercent}%`);
  });
}

function isValidFeedback(feedback) {
  if (!feedback.descr || !feedback.name) return false;

  const description = feedback.descr.trim();
  const wordCount = description.split(/\s+/).length;
  const charCount = description.length;

  const onlyNormalChars = /^[a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9\s.,!?'"()\-–—…]+$/.test(
    description
  );
  const noSpamWords =
    !/(test|asdf|qwer|123|lorem|fake|gghhh|ддд|аааа|яяяя)/i.test(description);
  const ratingIsHigh = feedback.rating >= 4;

  return (
    wordCount >= 5 &&
    charCount >= 30 &&
    onlyNormalChars &&
    noSpamWords &&
    ratingIsHigh
  );
}

function isValidFeedback(feedback) {
  if (!feedback.descr || !feedback.name) return false;

  const description = feedback.descr.trim();
  const wordCount = description.split(/\s+/).length;
  const charCount = description.length;

  const onlyNormalChars = /^[a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9\s.,!?'"()\-–—…]+$/.test(
    description
  );
  const noSpamWords =
    !/(test|asdf|qwer|123|lorem|fake|gghhh|ддд|аааа|яяяя)/i.test(description);
  const ratingIsHigh = feedback.rating >= 4;

  return (
    wordCount >= 5 &&
    charCount >= 30 &&
    onlyNormalChars &&
    noSpamWords &&
    ratingIsHigh
  );
}