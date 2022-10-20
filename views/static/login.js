window.addEventListener("load", () => {
  const loginButton = document.getElementById("login");

  loginButton.addEventListener("click", () => {
    // get the field values at the time of the submit button
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // generate the request body object
    const reqBody = {
      email: email,
      password: password,
    };
  });
});
