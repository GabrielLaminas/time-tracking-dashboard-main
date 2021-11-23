const links = document.querySelector('.grid__link');
const linkA = document.querySelectorAll('.grid__link a');

const hours = document.querySelectorAll('.hours');
const times = document.querySelectorAll('.time')
const previus = document.querySelectorAll('.previus');

async function getData() {
   const dadoResponse = await fetch('/data.json');
   const dadosJson = await dadoResponse.json();
   return dadosJson;
}

async function initData() {
   const jsondata = await getData();
   linkA[1].classList.toggle('active');

   for (let i in jsondata) {
      const { current, previous } = jsondata[i]["timeframes"]["weekly"];
      hours[i].innerText = current;
      times[i].innerText = previous;
      previus[i].innerText = 'Last Week';
   }
}
initData();

async function getDataFilter(e) {
   linkA.forEach((a) => {
      a.classList.remove('active');
   });

   e.target.classList.add('active');

   try {
      const text = e.target.innerText.toLowerCase();
      const dados = await getData();

      for (let i in dados) {
         const { current, previous } = dados[i]["timeframes"][text];
         hours[i].innerText = current;
         times[i].innerText = previous;

         if (text === 'daily') {
            previus[i].innerText = 'Yesterday';
         }
         if (text === 'weekly') {
            previus[i].innerText = 'Last Week';
         }
         if (text === 'monthly') {
            previus[i].innerText = 'Last Month';
         }
      }
   } 
   catch (erro) {
      console.log(erro);
   }
}

links.addEventListener('click', getDataFilter);