# Objective : create a music library app.

> What does the music library app do?

- The music library will have some songs already loaded in it.
- The music library web app lets a user to create an account.
- Registered users can login to their account and create a playlist.
- Users can add a playlist containing some songs or an empty playlist.
- After creating a playlist user can add or remove a song from the playlist.
- User can have multiple playlist.

> Future features that can be added.

- registered users can like or dislike a song or a playlist.

> What are the entities in the music library?

- song
- playlist
- user
- users

> what are the methods of a song?

```
song = new Song(id, title, artist)

The state of a song have to be preserved.


```

> What are the methods of a playlist?

```
playlist = new Playlist(songs);
playlist.add(song);
playlist.remove(song);
playlist.toJson();
```

> what are the methods of a user?

```
user.name;
user.password;
user.add(playlist);
user.addSong(song, playlist);
user.remove(playlist);
user.removeSong(song, playlist);
```

> what will the users do?

- users will manage multiple user.

## Doubts:

- should songs be an entity?
  yes.

# what happens when a playlist is added.

login a user.
only a logged in user can add a playlist.
extract the user id , playlist title from the request.
find the user and add a playlist of the given name.

```css
* {
  margin: 0;
  padding: 0;
  font-size: 16px;
  font-weight: 100;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

#page-header {
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

#login {
  text-decoration: none;
  font-size: 2em;
  font-weight: 400;
}

#page-heading {
  font-size: 3em;
  font-weight: 500;
}

#container {
  margin: 140px auto;
  padding: 0 20px;
  border: 1px solid gray;
  background-color: #dddddd;
  height: 45%;
  width: 35%;
  border-radius: 10px;
  display: flex;
  gap: 40px;
  flex-flow: column;
}

.welcome-message {
  margin: 40px 0;
  padding: 0 50px;
  font-size: 3em;
  font-weight: 600;
}

#welcome-message-line-2 {
  font-size: 5em;
}

#navigation-buttons {
  height: 15%;
  display: flex;
  padding: 0 50px;
  justify-content: space-between;
  align-items: center;
}

#navigation-buttons > input {
  height: 90%;
  width: 40%;
  font-weight: 300;
  border: none;
  border: 1px solid grey;
  border-radius: 10px;
  font-size: 1.5em;
  background-color: #aaaaaa;
}
```

```html
<html>
  <head>
    <title>Music library</title>
    <link rel="stylesheet" href="/styles/style.css" />
  </head>
  <body>
    <section id="page">
      <header id="page-header">
        <h1 id="page-heading">Music library</h1>
        <div id="authentication">
          <a id="login" href="/login">login</a>
        </div>
      </header>
      <main id="container">
        <div id="welcome-message-container">
          <p id="welcome-message-line-1" class="welcome-message">Welcome to,</p>
          <p id="welcome-message-line-2" class="welcome-message">Music library</p>
        </div>
        <div id="navigation-buttons">
          <input type="button" value="explore" id="explore-buttton" />
          <input type="button" value="sign Up/sign In" id="authentication-button" />
        </div>
      </main>
    </section>
  </body>
</html>
```
