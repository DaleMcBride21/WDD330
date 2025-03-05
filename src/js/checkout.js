import { loadHeaderFooter, alertMessage } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";


loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );

// this is how it would look if we listen for the submit on the form
document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  // e.target would contain our form in this case
  checkoutProcess.checkout(e.target);
  console.log("test");
  window.location.href = "success.html";
  localStorage.removeItem("so-cart");
});

function validateForm() {
  const checkOutButton = document.querySelector("#checkoutSubmit");

  checkOutButton.addEventListener("click", () => {
    const inputs = document.querySelectorAll(".validation");
  
    const missingFields = [];
  
    inputs.forEach((input) => {
      if (!input.value) {
        missingFields.push(input.name);
      }
    });
  
  
    if (missingFields.length > 0) {
      alertMessage('Please fill in: ' + missingFields.join(', '));
    } else {
      alertMessage('Form submitted successfully!');
      // Optionally submit the form: event.target.submit();
    }
  })


}

validateForm();

// document.querySelector('#checkoutSubmit')
//   .addEventListener('click', (e) => {
//     e.preventDefault();
//     var myForm = document.forms[0];
//     var chk_status = myForm.checkValidity();
//     myForm.reportValidity();
//     console.log("test");
//     if(chk_status) 
//       checkoutProcess.checkout();
      
//   });