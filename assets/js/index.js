const links = document.querySelector('.grid__link');
const linkA = document.querySelectorAll('.grid__link a');

const hours = document.querySelectorAll('.hours');
const times = document.querySelectorAll('.time')
const past = document.querySelectorAll('.previous');

async function initFetch() {
   const dataResponse = await fetch('data.json');
   const dataJson = await dataResponse.json();
   return dataJson;
}

async function initData() {
   const jsondata = await initFetch();
   linkA[1].classList.toggle('active');

   for (let i in jsondata) {
      const { current, previous } = jsondata[i]["timeframes"]["weekly"];
      hours[i].innerText = current;
      times[i].innerText = previous;
      past[i].innerText = 'Last Week';
   }
}
initData();

async function getData(e) {
   linkA.forEach((a) => {
      a.classList.remove('active');
   });

   e.target.classList.add('active');

   try {
      const text = e.target.innerText.toLowerCase();
      const dados = await initFetch();

      for (let i in dados) {
         const { current, previous } = dados[i]["timeframes"][text];
         hours[i].innerText = current;
         times[i].innerText = previous;

         if (text === 'daily') {
            past[i].innerText = 'Yesterday';
         }
         if (text === 'weekly') {
            past[i].innerText = 'Last Week';
         }
         if (text === 'monthly') {
            past[i].innerText = 'Last Month';
         }
      }
   }
   catch (erro) {
      console.log(erro);
   }
}

links.addEventListener('click', getData);