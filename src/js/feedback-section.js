
const feedback = document.querySelector('.feedback')
fetch("https://sound-wave.b.goit.study/api/feedbacks")
 .then(response => {
   return response.json();
 })
 .then(data => {
  data.data.forEach(element => {
    console.log(element)
    feedback.insertAdjacentHTML('beforeend',`
      <div class="feedback-item">
        <img src="" alt="" class="item-mark">
        <p class="item-coment">${element.descr}</p>
        <p class="item-person">${element.name}</p>
    </div>
    `)
    console.log(element)
  });
 })
 .catch(error => {
  console.log(error);
 });



