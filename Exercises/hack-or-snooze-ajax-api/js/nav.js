"use strict";

//clicking nav home page 
function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}
$body.on("click", "#nav-all", navAllStories);

//clicking nav login/signup
function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}
$navLogin.on("click", navLoginClick);

//nav update after login
function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

//clicking nav submit
function navSubmitClick() {
  hidePageComponents();
  $submitForm.show();   
}
$navSubmit.on("click", navSubmitClick);

//clicking nav favorites 
function navFavoritesClick(evt) {
  hidePageComponents();
  putFavoritesListOnPage();
} 
$body.on("click", "#nav-favorites", navFavoritesClick);

//clicking nav my stories
function navMyStories(evt) {
  hidePageComponents();
  putUserStoriesOnPage();
}
$body.on("click", "#nav-my-stories", navMyStories);


