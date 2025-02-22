const URL = "https://api.exchangerate-api.com/v4/latest/USD";

const select = document.querySelectorAll(".select-currency");
const amount = document.querySelector(".enter-amount-input");
const btn = document.querySelector("#exchange-button");
const result = document.querySelector("#result-msg");
const fromCurrency = document.querySelector(".select-from-container select");
const toCurrency = document.querySelector(".select-to-container select");


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    const img = element.parentElement.querySelector("img");
    img.src = newSrc;
};
for(let each of select) {
    for(let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(each.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (each.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        each.append(newOption);
    }
    each.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


const printResult = (finalAns) => { 
    if(amount.value == "" || Number(amount.value) <= 0) {
        result.innerText = "Please enter valid input !"
        result.style = "border: 1px solid lightgrey";
    } else {
        result.innerText = `${amount.value} ${fromCurrency.value} = ${finalAns} ${toCurrency.value}`;
        result.style = "border: 1px solid lightgrey";
    }
}
const calculation = (data) => {
    let fromBase = data.rates[fromCurrency.value];
    let toBase = data.rates[toCurrency.value]
    let currencyRate = toBase / fromBase;
    let finalAns = Number(amount.value) * currencyRate;
    printResult(finalAns);
}
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let response = await fetch(URL);
    let data = await response.json();
    calculation(data);
});