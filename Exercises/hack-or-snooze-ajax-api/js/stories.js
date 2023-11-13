"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

//starting stories
async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
  putStoriesOnPage();
}

//putting stories on page
function putStoriesOnPage() {
  $allStoriesList.empty();
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }
  $allStoriesList.show();
}

//HTML of each story 
function generateStoryMarkup(story, showDeleteBtn = false ) {
  const hostName = story.getHostName();
  const showStar = Boolean(currentUser);
  return $(`
      <li id="${story.storyId}">
      ${showDeleteBtn ? getDeleteBtnHTML() : ""}
      ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

//submitting stories using form
async function submitStory(e){
  e.preventDefault();
  const author = $(`#submit-author`).val()
  const title = $(`#submit-title`).val()
  const url = $(`#submit-url`).val()
  const user = currentUser.username
  const story = await storyList.addStory(currentUser, {title,author,url})
  hidePageComponents();
  const storyHTML = generateStoryMarkup(story)
  $allStoriesList.prepend(storyHTML)
  $allStoriesList.show()
}
$submitForm.on("submit", submitStory);

//star HTML that toggles 
function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `
      <span class="star">
        <i class="${starType} fa-star"></i>
      </span>`;
}

//trash can HTML 
function getDeleteBtnHTML() {
  return `
      <span class="trash-can">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}

//removes targeted story after click on trashcan using API 
async function deleteStory(evt) {
  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");
  await storyList.removeStory(currentUser, storyId);
  putUserStoriesOnPage();
}
$ownStories.on("click", ".trash-can", deleteStory);

//adds HTML favorites on page
function putFavoritesListOnPage() {
  $favoritedStories.empty();
  if (currentUser.favorites.length === 0) {
    $favoritedStories.append("<h5>No favorites added!</h5>");
  } else {
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoritedStories.append($story);
    }
  }
  $favoritedStories.show();
}

//favorite toggling 
async function toggleStoryFavorite(evt) {
  const $tgt = $(evt.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);
  // see if the item is already favorited (checking star property)
  if ($tgt.hasClass("fas")) {
    // currently a favorite: remove from user's fav list and change star and vice versa 
    await currentUser.removeFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  } else {
    await currentUser.addFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  }
  if ($favoritedStories.is(":visible")){
    hidePageComponents();
    putFavoritesListOnPage();
  }
}
$storiesLists.on("click", ".star", toggleStoryFavorite);

//adding user submited stories to my stories
function putUserStoriesOnPage() {
  $ownStories.empty();
  if (currentUser.ownStories.length === 0) {
    $ownStories.append("<h5>No stories added by user yet!</h5>");
  } else {
    // loop through all of users stories and generate HTML for them
    for (let story of currentUser.ownStories) {
      let $story = generateStoryMarkup(story, true);
      $ownStories.append($story);
    }
  }
  $ownStories.show();
}


