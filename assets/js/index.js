const links = document.querySelector('.grid__link');

async function getData() {
   const dadoResponse = await fetch('/data.json');
   const dadosJson = await dadoResponse.json();
   return dadosJson;
}

async function getDataFilter(e) {
   e.preventDefault();
   
   try {
      const text = e.target.innerText.toLowerCase();
      const dados = await getData();
      const hours = document.querySelectorAll('.hours');
      const times = document.querySelectorAll('.time')
      const previus = document.querySelectorAll('.previus');

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
   } catch(erro){
      console.log(erro);
   }
}

links.addEventListener('click', getDataFilter);