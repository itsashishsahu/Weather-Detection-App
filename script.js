const wrapper = document.querySelector(".wrapper"),
  inputPart = document.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button");


let api;

inputField.addEventListener("keyup", (e) => {
  // this condition get executed if user pressed enter btn & input value is non-empty
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});



locationBtn.addEventListener("click", () => {
    if (navigator.geolocation){
        // if browser support geolocaion api
        // on succesful getCurrentPosition method onSuccess function is called otherwise onError is called 
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Your Browser Does not support geolocation api");
    }
});

// onSuccess Function 
function onSuccess(position){
  // Getting latitude & longitude of the user device from coorfinates 
    const {latitude, longitude} = position.coords;
    api = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=mteric&appid=aae5870fda4696f1f0b23a908e31c3de`;
    fetchData();
}
// onError Function 
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}







function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aae5870fda4696f1f0b23a908e31c3de`;
  fetchData();
}

function fetchData(){
  infoTxt.innerText = " Getting Weather Details......";
  infoTxt.classList.add("pending");
    // getting api response and returning it with parsing into js obj and in another
    // then function calling weatherDeatails function with parsing api result as an argument 
  fetch(api).then((response) => response.json()).then((result) => weatherDetails(result));
}

function weatherDetails(info){
  if(info.cod == "404"){
    infoTxt.classList.replace("pending", "error");
    infoTxt.innerText = `${inputField.value} isn't a valid city name`;
  }else{
    // get required properties value from the info Object

    const city = info.name;
    const country = info.sys.country;
    const {description, id} = info.weather[0];
    const {feels_like, humidity, temp} = info.main;
    

    // pass these values to a particular html element 
    wrapper.querySelector(".temp .numb").innerText = temp;
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
    wrapper.querySelector(".temp .numb-2").innerText = feels_like;
    wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

    infoTxt.classList.remove("pending", "error");
    wrapper.classList.add("active");
    console.log(info);
  }
}

