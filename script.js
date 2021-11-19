const wrapper = document.querySelector(".wrapper"),
  inputPart = document.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button");

inputField.addEventListener("keyup", (e) => {
  // this condition get executed if user pressed enter btn & input value is non-empty
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});



locationBtn.addEventListener("Click", () => {
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
    console.log(position);
}
// onError Function 
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}







function requestApi(city) {
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aae5870fda4696f1f0b23a908e31c3de`;
  infoTxt.innerText = " Getting Weather Details......";
  infoTxt.classList.add("pending");
    // getting api response and returning it with parsing into js obj and in another
    // then function calling weatherDeatails function with parsing api result as an argument 
  fetch(api).then((response) => response.json()).then((result) => weatherDetails(result));
}

function weatherDetails(info){
    console.log(info);
}
