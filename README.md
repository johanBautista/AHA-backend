## Starter kit API Backend

```javascript
$ npm install
$ npm run start:dev
```

El backend se ejecuta en el puerto 3001 por defecto

**importante** cambiar el `.env-sample` a `.env` con vuestras variables de entorno.

## Routes

| Method   | Path              | Description         |
| -------- | ----------------- | ------------------- |
| `get`    | `/auth/me`        | Check if i'm logged |
| `post`   | `/auth/login`     | Login               |
| `post`   | `/auth/signup`    | Signup              |
| `post`   | `/auth/logout`    | Logout              |
| `get`    | `/auth/private`   | Private route       |
| `get`    | `/`               | Homepage            |
| `get`    | `/quote/:quoteId` | Quote detail        |
| `post`   | `/quote`          | Create quote        |
| `put`    | `/quote/:quoteId` | Update quote        |
| `delete` | `/quote/:quoteId` | Delete quote        |
| `get`    | `/event/:eventId` | Event detail        |
| `post`   | `/event`          | Create event        |
| `put`    | `/event/:eventId` | Update event        |
| `delete` | `/event/:eventId` | Delete event        |

## Login & Signup

```json
{
  "username": "string",
  "password": "string"
}
```
