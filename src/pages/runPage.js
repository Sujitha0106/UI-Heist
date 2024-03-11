import { createElement } from "../utils/htmlUtils.js";
import { APP_CONSTANTS } from "../constants/appConstants.js";


document.addEventListener("DOMContentLoaded", function () {
  let runModeScreen = createElement("div", {
    className: "run-mode-screen"
  });

  let runModeContainer = createElement("div", {
    className: "run-mode-container-1"
  });

  let currentTimeElement = createElement("div", {
    className: "current-time",
    textContent: getCurrentTime(),
  });

  let userWelcomeMsg = createElement("div", {
    className: "greeting-msg",
    textContent: getGreetings() + " Pavithra & Sujitha",
  });

  let temp = createElement("div", {
    className: "temp",
  });

  let currentTemp = createElement("div", {
    className: "current-temp",
    textContent: "Fetching temperature...",
  });

  let tempMsg = createElement("div", {
    className: "temp-msg",
    textContent: "Outside",
  });

  let tempImg = (createElement("img", {
    className: "weather-img",
    src: 'src/assets/images/clear.png',
    alt: "img"
  }));

  tempMsg.appendChild(tempImg);

  let runModeContain = createElement("div", {
    className: "run-mode-container-2"
  });

  let currentDisel = createElement("div", {
    className: "current-disel",
  });
  let quantity = createElement("div", {
    className: "current-disel-quantity",
    textContent: 60,
  });
  let measure = createElement("div", {
    className: "current-disel-quantity-measure",
    textContent: "Ltrs",
  });

  let progressDiv = createElement("div", {
    className: "current-disel-progress",
  });

  let progress = createElement("div", {
    className: "progress",
  });

  progressDiv.appendChild(progress);
  currentDisel.appendChild(quantity);
  currentDisel.appendChild(measure);
  currentDisel.appendChild(progressDiv);

  let currentSpeed = createElement("div", {
    className: "current-speed",
  });

  let warnDiv = createElement("div", {
    className: "warn-div",
  });

  let warnIcon = createElement("img", {
    className: "warn-img",
    src: 'src/assets/icons/warning.png',
    alt: "img"
  });

  let warnMsg = createElement("div", {
    className: "warn-msg",
    textContent:APP_CONSTANTS.WARNING_MSG,
  });
  let speed = createElement("div", {
    className: "current-speed-quantity",
    textContent: 0,
  });
  let speedMeasure = createElement("div", {
    className: "current-speed-measure",
    textContent: "Kmph",
  });

  let steering = createElement("img", {
    id:"steering-image",
    className: "steering-img rotated",
    src: 'src/assets/images/steering-wheel.png',
    alt: "img"
  });


  warnDiv.appendChild(warnIcon);
  warnDiv.appendChild(warnMsg);
  currentSpeed.appendChild(warnDiv);
  currentSpeed.appendChild(speed);
  currentSpeed.appendChild(speedMeasure);

  temp.appendChild(currentTemp);
  temp.appendChild(tempMsg);

  runModeContainer.appendChild(currentTimeElement);
  runModeContainer.appendChild(userWelcomeMsg);
  runModeContainer.appendChild(temp);

  runModeContain.appendChild(currentDisel);
  runModeContain.appendChild(currentSpeed);
  runModeContain.appendChild(steering);
  runModeScreen.appendChild(runModeContainer);
  runModeScreen.appendChild(runModeContain);
  // document.querySelector(".warn-div").style.display = "none";
  getTemp().then(temp => {
    console.log(temp);
    currentTemp.textContent = temp[0] + "°C";

    switch (temp[1]) {
      case 'Clear':
        tempImg.src = "src/assets/images/clear.png";
        break;
      case 'Rain':
        tempImg.src = "src/assets/images/rain.png";
        break;
      case 'Snow':
        tempImg.src = "src/assets/images/snow.png";
        break;
      case 'Clouds':
        tempImg.src = "src/assets/images/cloud.png";
        break;
      case 'Haze':
        tempImg.src = "src/assets/images/mist.png";
        break;
      default:
        tempImg.src = "src/assets/images/cloud.png";
    }
  }).catch(error => {
    console.error('There was a problem fetching the weather data:', error);
    currentTemp.textContent = "Temperature data unavailable";
  });
  let image = document.getElementById("steering-image");
  let rotationAngle = 0;
  let remainingTime = 60;
  let interval = setInterval(function () {
    remainingTime--;
    quantity.textContent = remainingTime;
    if (remainingTime <= 0) {
      clearInterval(interval);
      quantity.textContent = 0;
    }
  }, 5000);

  document.addEventListener("keydown", function (event) {
    if (event.key === "r" || event.key === "R") {
      if (quantity) {
        quantity.textContent = 60; // Reset quantity to 60
      } else {
        console.error("Quantity element not found");
      }
      let progressBar = document.querySelector('.progress');
      if (progressBar) {
        progressBar.style.width = '0';
        progressBar.style.animation = 'none'; 
        void progressBar.offsetWidth; 
        progressBar.style.animation = 'fill 1000s linear forwards'; 
      } else {
        console.error('Progress bar not found');
      }
      remainingTime = 60;
      clearInterval(interval);
      interval = setInterval(function () {
        remainingTime--;
        quantity.textContent = remainingTime;
        if (remainingTime <= 0) {
          clearInterval(interval);
          quantity.textContent = 0;
        }
      }, 5000);
    }
    if (event.key === "ArrowRight") {
      rotationAngle += 10;
      image.style.transform = `rotate(${rotationAngle}deg)`;
      console.log(rotationAngle);
    }
    else if (event.key === "ArrowLeft") {
      rotationAngle -= 10;
      image.style.transform = `rotate(${rotationAngle}deg)`;
      console.log(rotationAngle);
    }
  });

  let intervalId; 
  document.addEventListener("keydown", function (event) {

    if (event.key === "a" || event.key === "A") {
      intervalId = setInterval(function () {
        increaseSpeed();
      }, 1000);
      let audio = new Audio('src/assets/audio/acceleration.mp3');
      audio.play();
    }
  });
  
  document.addEventListener("keyup", function (event) {
    if (event.key === "a" || event.key === "A") {
      clearInterval(intervalId);
      decreaseSpeed();
    }
  });
  
  function increaseSpeed() {
    let currentSpeed = parseInt(speed.textContent);
    let newSpeed = currentSpeed + 1;
    if (newSpeed <= 280) {
      speed.textContent = newSpeed;
      // if(newSpeed>80){
      //   document.querySelector(".warn-div").style.display = "block";
      // }
    }
  }
  
  function decreaseSpeed() {
    let currentSpeed = parseInt(speed.textContent);
    let newSpeed = currentSpeed - 1;
    if (newSpeed >= 0) {
      speed.textContent = newSpeed;
    }
  }
  
  let rootElement = document.getElementById("root");
  rootElement.appendChild(runModeScreen);
});


function getCurrentTime() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let meridiem = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let time = hours + ": " + minutes + " " + meridiem;
  return time;

}

function getGreetings() {

  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greetingText = "";

  if (currentHour < 12) {
    greetingText = "Good morning...!";
  } else if (currentHour < 18) {
    greetingText = "Good afternoon...!";
  } else {
    greetingText = "Good evening...!";
  }

  return greetingText;
}

async function getTemp() {
  const apiKey = 'c9fd43801139727fa8cfa688df99a18f';
  const city = 'Chennai';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const currentTemperature = data.main.temp;
    const desc = data.weather[0].main;

    const tempDetails = [currentTemperature, desc];
    console.log(`Current temperature in ${city}: ${currentTemperature}°C +${desc}`);
    return tempDetails;
  } catch (error) {
    throw new Error('There was a problem fetching the weather data:', error);
  }
}

