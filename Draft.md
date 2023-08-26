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

