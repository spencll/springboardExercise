"use strict";

// global to hold the User instance of the currently-logged-in user
let currentUser;

//login using form
async function login(evt) {
  console.debug("login", evt);
  evt.preventDefault();
  const username = $("#login-username").val();
  const password = $("#login-password").val();

  try{
  currentUser = await User.login(username, password);
  saveUserCredentialsInLocalStorage();
  hidePageComponents();
  updateUIOnUserLogin();
  }
  catch(e){
    alert("Incorrect login")
  }
}
$loginForm.on("submit", login);

//sign up using form, adds to local storage, and logins
async function signup(evt) {
  evt.preventDefault();
  const name = $("#signup-name").val();
  const username = $("#signup-username").val();
  const password = $("#signup-password").val();
 try {
  currentUser = await User.signup(username, password, name);
  saveUserCredentialsInLocalStorage();
  hidePageComponents();
  updateUIOnUserLogin();
}
  catch(e) {
    alert("Username already taken")
  }
}
$signupForm.on("submit", signup);

//log out, clears local storage and reloads whole page
function logout(evt) {
  localStorage.clear();
  location.reload();
}
$navLogOut.on("click", logout);

//saves into local storage currentUser 
function saveUserCredentialsInLocalStorage() {
  if (currentUser) {
    localStorage.setItem("token", currentUser.loginToken);
    localStorage.setItem("username", currentUser.username);
  }
}

//checks local storage for remembered user and attempts login with that info
async function checkForRememberedUser() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  if (!token || !username) return false;
  currentUser = await User.loginViaStoredCredentials(token, username);
}

//UI changes once user logs in
function updateUIOnUserLogin() {
  putStoriesOnPage();
  updateNavOnLogin();
}
