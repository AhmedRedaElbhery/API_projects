const input = document.querySelector("input");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const btn = document.querySelector("button");
const icon = document.querySelector("#ic");
const exchangeRateTxt = document.querySelector(".exchange-rate");


icon.addEventListener("click", e => {
    var s = to.value;
    to.value = from.value;
    from.value = s;
});


btn.addEventListener("click", e => {
    if (!isNaN(input.value) && input.value.trim() !== "") {
        if (input.value !== "0") {
            console.log("The input is a number:", parseFloat(input.value));
            change();

        }
        else {
            input.value = "";
            exchangeRateTxt.innerText = "Something went wrong";
        }
    } else {
        input.value = "";
        exchangeRateTxt.innerText = "Something went wrong";
    }
});

function change() {

    var apikey = 'a97a331aa9-3d9cef7283-sjca51';

    let apiUrl = new URL("https://api.fastforex.io/convert");

    let params = new URLSearchParams();
    params.append("from", from.value);
    params.append("to", to.value);
    params.append("amount", input.value);
    params.append("api_key", apikey);

    apiUrl.search = params.toString();


    fetch(apiUrl).then((result) => {
        let data = result.json();
        return data;
    }).then((currancy) => {
        console.log(currancy);
        var num = (currancy.result.rate * input.value);
        num = num.toFixed(2)
        exchangeRateTxt.innerText = `${input.value} ${from.value} , ${num} ${to.value}`;
    })

}


