import { countryList } from "./codes.js";

/**Variables */
const countries = Object.keys(countryList);
const currencies = Object.keys(countryList);
let length = countries.length;
const selectFrom = document.querySelector(".select-from");
const selectTo = document.querySelector(".select-to");
let selectedFromCountry = "USD";
let selectedToCountry = "INR";
const button = document.querySelector("button");

/**Functions */
//1. Add all the countries to options
const addCountryToOptions = () => {
  for (let i = 0; i < length; i++) {
    //Since one element created can only be added at one place. If added at multiple places, it gets removed from the DOM on the first place.
    let optionFrom = document.createElement("option");
    optionFrom.value = currencies[i];
    optionFrom.textContent = countries[i];
    optionFrom.type = "text";
    selectFrom.lastElementChild.appendChild(optionFrom);
    if (currencies[i] == "USD") {
      optionFrom.selected = "selected";
    }

    // Create a new option for selectTo
    let optionTo = document.createElement("option");
    optionTo.value = currencies[i];
    optionTo.textContent = countries[i];
    optionTo.type = "text";
    selectTo.lastElementChild.appendChild(optionTo);
    if (currencies[i] == "INR") {
      optionTo.selected = "selected";
    }
  }
};
//2. Change flags
const changeFromFlag = () => {
  const selectValue = selectFrom.lastElementChild.value;
  let image_url = `https://flagsapi.com/${selectValue.substring(
    0,
    2
  )}/flat/32.png`;
  selectFrom.firstElementChild.src = image_url;
  selectedFromCountry = selectValue;
};
const changeToFlag = () => {
  const selectValue = selectTo.lastElementChild.value;
  let image_url = `https://flagsapi.com/${selectValue.substring(
    0,
    2
  )}/flat/32.png`;
  selectTo.firstElementChild.src = image_url;
  selectedToCountry = selectValue;
};
//3. Get Exchange Rate
const getRate = async (country_code, target) => {
  try {
    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${country_code}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    return data[country_code][target];
  } catch (err) {
    alert(err);
  }
};
const getExchangeRate = async () => {
  //console.log(selectedFromCountry, selectedToCountry);
  let data = await getRate(
    selectedFromCountry.toLowerCase(),
    selectedToCountry.toLowerCase()
  );
  let amount = document.querySelector(".amount_input").value;
  //console.log(data);
  //console.log(amount);
  let result = (amount * data).toFixed(2);
  //console.log(result);
  const message = document.querySelector(".final_message");
  message.textContent = `${amount} ${selectedFromCountry} in ${selectedToCountry} is ${result}`;
};

/**Calling Functions */
addCountryToOptions();
selectFrom.addEventListener("change", changeFromFlag, false);
selectTo.addEventListener("change", changeToFlag, false);
button.addEventListener("click", getExchangeRate, false);

//Tips:-
//1. Improve DOM Manipulation while adding country
//2.
