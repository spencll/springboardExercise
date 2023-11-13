"use strict";

//Main page
const $body = $("body");
const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
//Forms
const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $submitForm = $("#submit-form");
//Nav
const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
const $navSubmit = $("#nav-submit-story");
const $navFavorites = $("#nav-favorites");
const $navStories = $("#nav-my-stories")
//specific lists
const $ownStories = $("#my-stories");
const $storiesLists = $(".stories-list");
const $favoritedStories = $("#favorited-stories");

//clean slate
function hidePageComponents() {
  const components = [
    $allStoriesList,
    $loginForm,
    $signupForm,
    $submitForm,
    $favoritedStories,
    $ownStories
  ];
  components.forEach(c => c.hide());
}

//Initializing 
async function start() {
  console.debug("start");
//checking local storage for user info
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();
  if (currentUser) updateUIOnUserLogin();
}
// Once the DOM is entirely loaded, begin the app
console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
$(start);
