"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

class Story {

  //follows data API of story
  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }

  //returns just host name of the story
  getHostName() {
     const noHTTP = this.url.slice(this.url.indexOf(`//`)+2)
     if (noHTTP.includes(`/`)){
      return noHTTP.slice(0, noHTTP.indexOf(`/`))
     }
    return noHTTP;
  }
}

//array of stories at that instance
class StoryList {

  constructor(stories) {
    this.stories = stories;
  }

  static async getStories() {
    //Don't need StoryList instance to run
    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "GET",
    });

    //Each API story data become story class and becomes array in stories  
    const stories = response.data.stories.map(story => new Story(story));
    //getStories returns StoryList class with the array of story classes 
    return new StoryList(stories);
  }

  async addStory(user, {title,author,url}) {
    //creating a token variable taking the loginToken property of user
    const token = user.loginToken;
    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "POST",
      //uses parameters as data for POST request
      data: {token, story:{title,author,url}}
    });
    //getting posted story data object response to add to top of storyList stories 
    //also to user's own stories
    //then returns the post response story data
    const postedStory = new Story(response.data.story)
    this.stories.unshift(postedStory);
    user.ownStories.unshift(postedStory);
    return postedStory;
  }

  async removeStory(user, storyId) {
    const token = user.loginToken;
    await axios({
      url: `${BASE_URL}/stories/${storyId}`,
      method: "DELETE",
      data: { token: user.loginToken }
    });
    //filter only stories that isn't specified storyId to every story list (main page/own stories/favorites)
    this.stories = this.stories.filter(story => story.storyId !== storyId);
    user.ownStories = user.ownStories.filter(s => s.storyId !== storyId);
    user.favorites = user.favorites.filter(s => s.storyId !== storyId);
  }
}

class User {
  constructor({
                username,
                name,
                createdAt,
                favorites = [],
                ownStories = []
              },
              token) {

    //creating properties of user
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;
    this.loginToken = token;
    //converting to array of story classes 
    this.favorites = favorites.map(s => new Story(s));
    this.ownStories = ownStories.map(s => new Story(s));
  }

  static async signup(username, password, name) {
    //Don't need user class instance to run function since user not even created yet
    const response = await axios({
      url: `${BASE_URL}/signup`,
      method: "POST",
      data: { user: { username, password, name } },
    });

  //Extracts user object from POST response 
    let { user } = response.data
   //follows constructor using user object to make new user class
    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  static async login(username, password) {
    const response = await axios({
      url: `${BASE_URL}/login`,
      method: "POST",
      data: { user: { username, password } },
    });

    //Extracts user object from POST response 
    let { user } = response.data;
   //follows constructor using user object to make new user class
    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  //if already credentialed with token, login
  static async loginViaStoredCredentials(token, username) {
    try {
      const response = await axios({
        url: `${BASE_URL}/users/${username}`,
        method: "GET",
        //putting in query string of token, giving access 
        params: { token }
      });

     //Extracts user object from POST response
      let { user } = response.data;
      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories
        },
        token
      );
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }

 //add to favorite array
   async addFavorite(story) {
    this.favorites.push(story);
    await this._addOrRemoveFavorite("add", story)
  }

  async removeFavorite(story) {
    //filters all favorites that isn't the targeted story
    this.favorites = this.favorites.filter(s => s.storyId !== story.storyId);
    await this._addOrRemoveFavorite("remove", story);
  }  

  //favorite switch 
  async _addOrRemoveFavorite(newState, story) {
    //if add, then post
    const method = newState === "add" ? "POST" : "DELETE";
    const token = this.loginToken;
    //same specified method on API  
    await axios({
      url: `${BASE_URL}/users/${this.username}/favorites/${story.storyId}`,
      method: method,
      data: { token },
    });
  }

  //checks if story is in favorite array
  isFavorite(story) {
    return this.favorites.some(s => (s.storyId === story.storyId));
  }
}



