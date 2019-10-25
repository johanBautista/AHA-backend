## Starter kit API Backend

```javascript
$ npm install
$ npm run start:dev
```

El backend se ejecuta en el puerto 3001 por defecto

**importante** cambiar el `.env-sample` a `.env` con vuestras variables de entorno.

## Routes 
| Method | Path | Description |
|--------|------|-------------|
| `get`  | `/auth/me` | Check if i'm logged |
| `postt`  | `/auth/login` | Login |
| `post`  | `/auth/signup` | Signup |
| `post`  | `/auth/logout` | Logout |
| `get`  | `/auth/private` | Private route |


## Login & Signup

```json
{
  "username": "string",
  "password": "string"
}
```