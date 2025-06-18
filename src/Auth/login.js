document.addEventListener("DOMContentLoaded", function () {
  const toggleSwitch = document.querySelector(".switch input");
  const body = document.body;

  function enableDarkMode() {
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    toggleSwitch.checked = true;
  }
  function disableDarkMode() {
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    toggleSwitch.checked = false;
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    enableDarkMode();
  }

  toggleSwitch.addEventListener("change", function () {
    if (this.checked) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  let LoggedIn = localStorage.getItem("logIn");
  if (LoggedIn) {
    window.location.href = "profile/profile.html";
  }
  const cart_msg = document.getElementById("cart-msg");

  let message = localStorage.getItem("signInMsg");
  if (message) {
    cart_msg.style.transform = "translateX(0px)";
    localStorage.removeItem("signInMsg");

    setTimeout(() => {
      cart_msg.style.transform = "translateX(380px)";
    }, 3000);
  }
});
//   Auth -> Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAMpWy83cxekLoaAxpcgzxAwBSvwwVHuqU",
    authDomain: "shoesphere-fd438.firebaseapp.com",
    databaseURL: "https://shoesphere-fd438-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "shoesphere-fd438",
    storageBucket: "shoesphere-fd438.firebasestorage.app",
    messagingSenderId: "481493885560",
    appId: "1:481493885560:web:d8c08fea6b6ec54517c38d",
    measurementId: "G-9HMR2XWZ7G"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
console.log(firebase);

const logIn = document.getElementById("logIn");

logIn.addEventListener("click", function () {
  LogIn();
});

function LogIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("User signed in:", userCredential.user.email);

      window.location.href = "profile/profile.html";
      localStorage.setItem("logIn", "Logged In");
    })
    .catch(()=>{
      const signInMethods = fetchSignInMethodsForEmail(auth, email);
      console.log(signInMethods,"not login")
    })
    .catch(() => {
      localStorage.setItem("logInMsg", "❌Invalid email or password.");
    });

  let message = localStorage.getItem("logInMsg");

  if (message) {
    document.getElementById("cart-msg").style.transform = "translateX(0px)";
    document.getElementById("cart-msg").textContent = message;
    localStorage.removeItem("logInMsg");

    setTimeout(() => {
      document.getElementById("cart-msg").style.transform = "translateX(380px)";
    }, 3000);
  }
}
