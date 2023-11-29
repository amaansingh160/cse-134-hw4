document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contact-form");
    const Name = document.getElementById("Name");
    const errorName = Name.nextElementSibling;
    const email = document.getElementById("Email");
    const error = email.nextElementSibling;
    const message = document.getElementById("Message");
    const errorMessage = message.nextElementSibling;
    const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const formErrors = [];
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    
    const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            body.classList.add(savedTheme);
        }


    themeToggle.addEventListener("click", function() {
        body.classList.toggle("dark-mode");
        
        // Store the current theme preference in localStorage
        const currentTheme = body.classList.contains("dark-mode") ? "dark-mode" : "";
        localStorage.setItem("theme", currentTheme);
    });


    function validateName() {
        const isValid = Name.value.length !== 0;
      
        email.className = isValid ? "valid" : "invalid";
      
        if (!isValid) {
          errorName.textContent = "Please enter a valid Name.";
          errorName.className = "error active";
        } else {
          errorName.textContent = "";
          errorName.className = "error";
        }
        
        //console.log(isValid);
        return isValid;
    }
    
    function validateEmail() {
      const isValid = email.value.length !== 0 && emailRegExp.test(email.value);
    
      email.className = isValid ? "valid" : "invalid";
    
      if (!isValid) {
        formErrors.push(email.value);
        error.textContent = "Please enter a valid email address.";
        error.className = "error active";
      } else {
        error.textContent = "";
        error.className = "error";
      }
      
      //console.log(isValid);
      return isValid;
    }

    function validateMessage() {
        const isValid = message.value.length !== 0 || message.value.length >= 250;
    
        email.className = isValid ? "valid" : "invalid";
      
        if (!isValid) {
          errorMessage.textContent = "Don't go over 250 characters.";
          errorMessage.className = "error active";
        } else {
          errorMessage.textContent = "";
          errorMessage.className = "error";
        }
        console.log(isValid);
        return isValid;
      }
    
    //window.addEventListener("load", validateEmail);
    
    //email.addEventListener("input", validateEmail);
    
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    
      if (!validateName() || !validateEmail() || !validateMessage()) {
        email.focus(); // Optionally, focus on the email field for better user experience.
      } else {
        // Proceed with form submission

        const formErrorsEncoded = encodeURIComponent(JSON.stringify(formErrors));
        const hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name = "form-errors";
        hiddenInput.value = formErrorsEncoded;
        form.appendChild(hiddenInput);

        form.submit();
        //console.log("Form Errors:", formErrorsEncoded);
      }
    });
});
