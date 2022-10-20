const request = require("./requests");

window.addEventListener("load", () => {
  const loginButton = document.getElementById("login");

  loginButton.addEventListener("click", (event) => {
    // prevent reload to perform validation
    event.preventDefault();

    // get the field values at the time of the submit button
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    request.login({ email: email, password: password });
    request.addAuth(localStorage.getItem("token"));
    window.location("/notes/");
    // set the headers
  });
});
