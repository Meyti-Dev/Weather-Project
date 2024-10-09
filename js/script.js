// get element
const $ = document;
const inputSearch = $.querySelector(".weather-search__input");
const btnSearch = $.querySelector(".weather-search__btn");
const weatherError = $.querySelector(".weather__error");
const countryContainer = $.querySelector(".country ");
const countryName = $.querySelector(".country__name");
const countryDate = $.querySelector(".country__date");
const temperature = $.querySelector(".weather__temperature");
const conditionContainer = $.querySelector(".condition");
const conditionAir = $.querySelector(".condition__air");
const conditionTemperature = $.querySelector(".condition__temperature");

// handler
function showValue() {
    weatherError.style.display = "none";
    countryContainer.style.display = "flex";
    temperature.style.display = "block";
    conditionContainer.style.display = "flex";
}
function removeValue() {
    countryContainer.style.display = "none";
    temperature.style.display = "none";
    conditionContainer.style.display = "none";
    weatherError.style.display = "block";
    weatherError.innerHTML = "error, is not defined...";
}
function newDate() {
    const months = [
        "",
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
    ];
    const days = [
        "",
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];
    let newDate = new Date();
    let whichDay = newDate.getDay();
    let whichMonth = newDate.getMonth();
    let whichYear = newDate.getFullYear();
    let wichDate = newDate.getDate();
    return `${days[whichDay + 1]}, ${wichDate} ${
        months[whichMonth + 1]
    } ${whichYear}`;
}
function insertValue(data) {
    countryName.innerHTML = `${data.name}, ${data.sys.country}`;
    temperature.innerHTML = `${Math.floor(data.main.temp - 273.15)}c`;
    conditionAir.innerHTML = `${data.weather[0].description}`;
    conditionTemperature.innerHTML = `tm ${Math.floor(
        data.main.temp_min - 273.15
    )} , tx ${Math.floor(data.main.temp_max - 273.15)}`;
    countryDate.innerHTML = newDate();
}
function serach() {
    let inputSearchValue = inputSearch.value.toLowerCase();
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputSearchValue}&appid=ab3f3ace4335a10458572a82be6ba060`
    )
        .then((response) => {
            if (response.status === 200) {
                showValue();
                return response.json();
            } else {
                removeValue();
            }
        })
        .then((data) => {
            console.log(data);
            insertValue(data);
        });
    inputSearch.value = "";
}

// get city or country from api
function inputSearchHandler(event) {
    if (event.key === "Enter") {
        serach();
    }
}
function btnSearchHandler() {
    serach();
}

// event
inputSearch.addEventListener("keydown", inputSearchHandler);
btnSearch.addEventListener("click", btnSearchHandler);
