//document.addEventListener("DOMContentLoaded", clearAge);

// listen for submit
// add fucntion isntead of previousy calculateResute since we want to add delay
document.getElementById("loan-form").addEventListener("submit", function (e) {
  // hide result
  document.getElementById("results").style.display = "none";
  document.getElementById("age-result").style.display = "none";
  document.getElementById("loading").style.display = "block";

  // call the function after 2second
  setTimeout(calculateResult, 2000);
  // show loader
  e.preventDefault();
});

function clearAge() {
  const ageRepresentationDiv = document.getElementById("age-representation");
  ageRepresentationDiv.children[0].remove();
}

function calculateResult() {
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

    //show results
    document.getElementById("results").style.display = "block";
    document.getElementById("age-result").style.display = "block";

    // hode the loading
    document.getElementById("loading").style.display = "none";
  } else {
    showError("you forger to complete the form");
  }
  //since form submit prevent default behaviour
  //   e.preventDefault();
}
function showError(errorMessage) {
  //show results
  document.getElementById("results").style.display = "none";
  document.getElementById("age-result").style.display = "none";

  // hode the loading
  document.getElementById("loading").style.display = "none";

  const errorDiv = document.createElement("div");
  //   get element
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  errorDiv.className = "alert alert-danger";
  // create textNode and append ot div
  errorDiv.appendChild(document.createTextNode(errorMessage));
  //insert error before heading
  card.insertBefore(errorDiv, heading);
  //clear the form after a moment
  setTimeout(clearError, 2000);
}
function clearError() {
  document.querySelector(".alert").remove();
}
function ageRepresentation(age) {
  const ageRepresentationDiv = document.querySelector("#age-representation");
  if (document.querySelector("#age-icon")) {
    //anotehr way to remove it from the parent
    // ageRepresentationDiv.removeChild(document.querySelector("#age-icon"));
    document.querySelector("#age-icon").remove();
  }
  const img = document.createElement("img");
  img.className = "img-thumbnail";
  img.id = "age-icon";
  //   console.log(img);

  let srcImg;

  if (age >= 18 && age <= 30) {
    //student
    srcImg = "img/education.svg";
  } else if (age > 30 && age <= 50) {
    //actif young
    srcImg = "img/industry.svg";
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
