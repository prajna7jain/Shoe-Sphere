

// document.addEventListener("DOMContentLoaded", function () {
//   const toggleSwitch = document.querySelector(".switch input");
//   const body = document.body;

//   function enableDarkMode() {
//     body.classList.add("dark-mode");
//     localStorage.setItem("theme", "dark");
//     toggleSwitch.checked = true;
//   }

//   function disableDarkMode() {
//     body.classList.remove("dark-mode");
//     localStorage.setItem("theme", "light");
//     toggleSwitch.checked = false;
//   }

//   const savedTheme = localStorage.getItem("theme");
//   if (savedTheme === "dark") {
//     enableDarkMode();
//   }

//   toggleSwitch.addEventListener("change", function () {
//     if (this.checked) {
//       enableDarkMode();
//     } else {
//       disableDarkMode();
//     }
//   });
// });

// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
// import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// // Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyAMpWy83cxekLoaAxpcgzxAwBSvwwVHuqU",
//   authDomain: "shoesphere-fd438.firebaseapp.com",
//   databaseURL: "https://shoesphere-fd438-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "shoesphere-fd438",
//   storageBucket: "shoesphere-fd438.appspot.com",
//   messagingSenderId: "481493885560",
//   appId: "1:481493885560:web:d8c08fea6b6ec54517c38d",
//   measurementId: "G-9HMR2XWZ7G"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
// const database = getDatabase(app);



// // SignUP
// const signUpBtn = document.getElementById("signUpBtn");
// signUpBtn.addEventListener("click", () => signUp());
// function signUp() {
//   let name = document.getElementById("name").value;
//   let email = document.getElementById("email").value;
//   let password = document.getElementById("password").value;
//   let conPassword = document.getElementById("copass").value;

//   if (password !== conPassword) {
//     alert("Password Mismatch");
//     return;
//   }

//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userAuth) => {
//       const user = userAuth.user;

//       // Save user data to Realtime Database
//       return set(ref(database, "users/" + user.uid), {
//         name: name,
//         email: user.email
//       }).then(() => user);
    
//        // return user for next .then()
//     })
//     .then((user) => {
//       localStorage.setItem("signInMsg", " Welcome! Log in to continue. ✅ ");
//       localStorage.setItem("userInfo", JSON.stringify({ name: name, email: email }));
//       console.log("User signed up:", user.email);
//       console.log("data saved");
//       window.location.href = "login.html";
//     })
//     .catch((error) => {
//       console.error("Signup error:", error.message);
//       alert("Error: " + error.message);
//     });
// }
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAMpWy83cxekLoaAxpcgzxAwBSvwwVHuqU",
  authDomain: "shoesphere-fd438.firebaseapp.com",
  databaseURL: "https://shoesphere-fd438-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "shoesphere-fd438",
  storageBucket: "shoesphere-fd438.appspot.com",
  messagingSenderId: "481493885560",
  appId: "1:481493885560:web:d8c08fea6b6ec54517c38d",
  measurementId: "G-9HMR2XWZ7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

// SignUP
const signUpBtn = document.getElementById("signUpBtn");
signUpBtn.addEventListener("click", () => signUp());

function signUp() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const conPassword = document.getElementById("copass").value;

  if (password !== conPassword) {
    alert("Password Mismatch");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userAuth) => {
      const user = userAuth.user;

      // Update display name
      return updateProfile(user, {
        displayName: name
      }).then(() => {
        // Save user data to Realtime Database
        return set(ref(database, "users/" + user.uid), {
          name: name,
          email: user.email
        }).then(() => user); // Return user for next .then()
      });
    })
    .then((user) => {
      localStorage.setItem("signInMsg", " Welcome! Log in to continue. ✅ ");
      localStorage.setItem("userInfo", JSON.stringify({
        name: user.displayName,
        email: user.email
      }));
      console.log("User signed up:", user.email);
      console.log("Data saved with name:", user.displayName);
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Signup error:", error.message);
      alert("Error: " + error.message);
    });
}
