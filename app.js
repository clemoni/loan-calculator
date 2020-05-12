//document.addEventListener("DOMContentLoaded", clearAge);

// listen for submit
document
  .getElementById("loan-form")
  .addEventListener("submit", calculateResult);

function clearAge() {
  const ageRepresentationDiv = document.getElementById("age-representation");
  ageRepresentationDiv.children[0].remove();
}

function calculateResult(e) {
  const age = document.querySelector("#age");
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");
  const totalAge = document.querySelector("#total-age");

  const principal = parseInt(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayment = parseFloat(years.value) * 12;
  const calculatedAge = parseInt(age.value) + parseFloat(years.value);

  // compute montly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);
    totalAge.value = calculatedAge;
    ageRepresentation(calculatedAge);
  } else {
    console.log("oh oh");
  }
  //since form submit prevent default behaviour
  e.preventDefault();
}
function ageRepresentation(age) {
  const ageRepresentationDiv = document.querySelector("#age-representation");
  if (document.querySelector("#age-icon")) {
    ageRepresentationDiv.removeChild(document.querySelector("#age-icon"));
  }

  const img = document.createElement("img");
  img.className = "img-thumbnail";
  img.id = "age-icon";
  //   console.log(img);

  let srcImg;

  if (age >= 18 && age <= 30) {
    //student
    srcImg = "img/student.svg";
  } else if (age > 30 && age <= 50) {
    //actif young
    srcImg = "img/stick-man.svg";
  } else if (age > 50 && age <= 60) {
    //actif mature
    srcImg = "img/avatar.svg";
  } else if (age > 60 && age <= 75) {
    //retired
    srcImg = "img/man-2.svg";
  } else if (age >= 75 && age <= 85) {
    //patient
    srcImg = "img/patient.svg";
  } else {
    //dead
    srcImg = "img/halloween.svg";
  }
  img.src = srcImg;
  ageRepresentationDiv.appendChild(img);
}
