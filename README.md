## Starter kit API Backend
# ​AHA-Moment

## Description

We are all geniuses, the problem is not knowing what. AHA-Moment is the app where you can save your thoughts of lucidity and also, read, search and vote on the ideas of others
## Models

User model

```
 username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  ocupation: { type: String, required: true }
```

Event model

```
 <!-- title: { type: String, required: true, unique: true },
  description: { type: ObjectId, ref: "User"},
  owner: { type: ObjectId, ref: "User"},
  date: { type: Date, required: true },
  location: { type: String, required: true } -->
```

Quote model

```
 text: { type: String, required: true, unique: true },
 owner: { type: ObjecId, ref: "User", unique: true },
 date: { type: Date },
 location: { type: String },
 theme: { type: String, required: true }
```

## Routes

| Method   | Path              | Description         |
| -------- | ----------------- | ------------------- |
| `get`    | `/auth/me`        | Check if i'm logged |
| `post`   | `/auth/login`     | Login               |
| `post`   | `/auth/signup`    | Signup              |
| `post`   | `/auth/logout`    | Logout              |
| `get`    | `/auth/private`   | Private route       |
| `get`    | `/`               | Homepage            |
| `get`   | `/quotes`          | List all quotes     |
| `get`    | `/quotes/:id`     | Quote detail        |
| `get`    | `/quotes/edit/:id`| Edit Quote detail   |
| `post`   | `/quotes`         | Create quote        |
| `put`    | `/quotes/:id`     | Update quote        |
| `delete` | `/quotes/:id`     | Delete quote        |
| `get`    | `/events`         | List Event          |
| `post`   | `/events`         | Create event        |

## Links

### Git

​
The url to your repository and to your deployed project
​
[Repository Frontend Link](https://github.com/johanBautista/AHA-frontend)
​
[Repository Backend Link](https://github.com/johanBautista/AHA-backend)
​
[Deploy Link Backend](http://heroku.com/)
​
[Deploy Link Frontend](https://aha-moment.netlify.com/)

### Slides

​
[Slides Link](https://slides.com/johansbautistaparra/deck-2)