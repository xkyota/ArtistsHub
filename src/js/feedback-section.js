const feedback = document.querySelector('.feedback');

fetch('https://sound-wave.b.goit.study/api/feedbacks')
  .then(response => response.json())
    .then(data => {
        data.data.forEach(element => {
              feedback.insertAdjacentHTML(
                      'beforeend',
                              `
                                    <div class="feedback-item">
                                            <div class="stars">
                                                      <span class="star" data-value="1"></span>
                                                                <span class="star" data-value="2"></span>
                                                                          <span class="sta} " data-value="3"></span>
                                                                                    <span class="star" data-value="4"></span>
                                                                                              <span class="star" data-value="5"></span>
                                                                                                      </div>
                                                                                                              <p class="item-coment">${element.descr}</p>
                                                                                                                      <p class="item-person">${element.name}</p>
                                                                                                                            </div>
                                                                                                                                  `
                                                                                                                                        );

                                                                                                                                              const lastItem = feedback.lastElementChild;
                                                                                                                                                    fillStars(lastItem, element.rating);
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