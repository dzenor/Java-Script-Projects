let select1 = document.getElementById("select1input");
let input_currency = document.getElementById("input_currency");
let select2 = document.getElementById("select2input");
let btn = document.getElementById("button");
let output_currency = document.getElementById("output_currency");

const host = "api.frankfurter.app";
fetch(`https://${host}/currencies`)
  .then((data) => data.json())
  .then((data) => {
    const entries = Object.entries(data);
    // console.log(entries);
    for (let i = 0; i < entries.length; i++) {
      console.log(entries[i]);
      let opt = document.createElement("option");
      opt.innerHTML += `<option>${entries[i][0]}</option>`;
      select1.appendChild(opt);
      let opt1 = document.createElement("option");
      opt1.innerHTML += `<option>${entries[i][0]}</option>`;
      select2.appendChild(opt1);
    }
  });

function converter() {
  let input_currency_val = input_currency.value;
  if (select1.value != select2.value) {
    //alert("right");
    const host = "api.frankfurter.app";
    fetch(
      `https://${host}/latest?amount=${input_currency_val}&from=${select1.value}&to=${select2.value}`
    )
      .then((val) => val.json())
      .then((val) => {
        output_currency.value = Object.values(val.rates)[0];
      });
  } else {
    alert("Please select two different currencies");
  }
}

$(document).ready(function () {
  $("#firstBtn").click(function (e) {
    $(".first-container").hide();
    $(".container").show();
  });
});
