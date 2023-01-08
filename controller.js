console.log(`shop page`);
// fetch('https://fakestoreapi.com/products')
//   .then((res) => res.json())
//   .then((json) => console.log(json));

const saleTimer = function () {
  const days = document.querySelector('.sale__days');
  const hours = document.querySelector('.sale__hours');
  const minutes = document.querySelector('.sale__minutes');
  const seconds = document.querySelector('.sale__seconds');
  const message = document.querySelector('.sale__message');

  // getting dealine time
  const futureDate = new Date();
  const futureYear = futureDate.getFullYear();
  const futureMonth = futureDate.getMonth();
  const futureDay = futureDate.getDate();

  // const deadline = new Date(;
  const deadline = new Date(futureYear, futureMonth, futureDay + 10, 23, 59, 59);
  const deadlineDay = deadline.getDate();
  const deadlineHour = deadline.getHours();
  const deadlineMinutes = deadline.getMinutes();
  const deadlineSeconds = deadline.getSeconds();

  // getting actual time
  const actualDate = new Date();
  const actualDay = actualDate.getDate();
  const actualHour = actualDate.getHours();
  const actualMinutes = actualDate.getMinutes();
  const actualSeconds = actualDate.getSeconds();

  // calculating how much time left till the end
  const finalDay = deadlineDay - actualDay;
  const finalHour = deadlineHour - actualHour;
  const finalMinutes = deadlineMinutes - actualMinutes;
  const finalSeconds = deadlineSeconds - actualSeconds;

  finalDay < 10 ? (days.innerHTML = `0${finalDay}days,`) : (days.innerHTML = `${finalDay}days,`);
  finalHour < 10 ? (hours.innerHTML = `0${finalHour}h`) : (hours.innerHTML = `${finalHour}h`);
  finalMinutes < 10 ? (minutes.innerHTML = `0${finalMinutes}m`) : (minutes.innerHTML = `${finalMinutes}m`);
  finalSeconds < 10 ? (seconds.innerHTML = `0${finalSeconds}s`) : (seconds.innerHTML = `${finalSeconds}s`);

  if (actualDate > deadline) {
    clearInterval(timer);
    message.textContent = `End of giveaway`;
    days.innerHTML = `00`;
    hours.innerHTML = `00`;
    minutes.innerHTML = `00`;
    seconds.innerHTML = `00`;
  }
};

// const timer = setInterval(saleTimer, 1000);
// saleTimer();
