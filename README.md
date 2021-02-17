# Restapify

<p>
  <img src="https://user-images.githubusercontent.com/31794680/107934535-7b4be300-6f80-11eb-9b26-87515325ca3f.png" alt="restapify cover" width="500">
</p>

<a href="https://codecov.io/gh/johannchopin/restapify">
  <img src="https://img.shields.io/codecov/c/github/johannchopin/restapify" alt="codecov">
</a>
<a href="https://gitmoji.dev">
  <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
</a>

<br>

📁 Restapify is a tool that allows you to easily and quickly deploy a local REST API by using an intuitive and developer friendly JSON file structure.

----
## Summary
- [**Why Restapify**](#why-restapify)
- [**Getting Started**](#getting-started)
- [**Features**](#features)
- [**Contributing**](#contributing)

## Why Restapify
When you start a new frontend project when the backend is not yet ready, you quickly come to the question of how to retrieve the data to be displayed. There are then many solutions that come with advantages but also some inconveniences. It's possible to use a tool like [postman](https://www.postman.com/) but it's not 100% free and require an account, to simply fetch local JSON data but it only supports a `GET` request or use a mocker library like this one ([json-server](https://github.com/typicode/json-server), [mocker-api](https://github.com/jaywcjlove/mocker-api) or [http-fake-backend](https://github.com/micromata/http-fake-backend)). 

The problem of most of this libraries is the way you have to define your API endpoints (a single file for all the routes, javascript files that took almost the same time to code than the real API, ...). Restapify try to make this process even faster with a file structure close to the one that you can see in [Nextjs](https://github.com/vercel/next.js) or [Sapper](https://github.com/sveltejs/sapper) and some developer friendly syntaxes to populate your json files.

## Features

- 💡 **Incredible DX** - Intuitive files structure and JSON syntax
- ✅ **JSON valid** - You will only use `.json` files that follows the [ECMA-404](https://www.ecma-international.org/publications-and-standards/standards/ecma-404/) standard
- 🎛 **Dashboard** - Out of the box SPA to explore and manage your mocked API
- 💻 **CLI** - Use the CLI for an instant deployment
- 🔥 **Built in hot watcher** - Directly see your changes after a file update
- 📝 **[Fakerjs](https://github.com/marak/Faker.js/) implementation** - Intuive syntax to use to easily populate your API responses
- 🚨 **Events handler** - Execute callbacks on specific events 
- 🏷️ **TypeScript support**

## Getting Started
### Using the cli
The simplest way to use Restapify is to use his [cli](https://github.com/johannchopin/restapify-cli):

```bash
npm i -g restapify-cli
```

and then serve the api folder:

```bash
restapify serve path/to/folder/
```

Read more about the cli *here*. <!-- TODO: add link -->

### Using the JavaScript class

You can install restapify's class using `npm` (note that this package should be a devDependency):

```bash
npm i -D restapify
```

You can then import the class and instanciate it to serve the api folder:

```javascript
import Restapify from 'restapify'

const apiFolderPath = path.resolve(__dirname, './path/to/folder')

const rpfy = new Restapify({
  rootDir: apiFolderPath
})
rpfy.run()
```

## Contributing

All remarks are welcome so feel free to [open an issue](https://github.com/johannchopin/restapify/issues).
Wants to collaborate? Please read the [contributing guidelines](./CONTRIBUTING.md).


## Documentation

### File structure
Restapify allow you to easily create REST API routes using a specific file structure. Take the following folder `api/` for example:
```
📂 api
┣ 📂 users
┃ ┗ 📜 *.json
┃ ┗ 📜 [userid].json
┃ ┗ 📜 [userid].DELETE.204.json
┣ 📂 posts
┃ ┗ 📜 [postid].json
┃ ┗ 📜 my-post.PUT.json
┣ 📜 posts.json
```

It will serve the following routes:
```
GET    /users
GET    /users/:userid
DELETE /users/:userid
GET    /posts
GET    /posts/:postid
PUT    /posts/my-post
```

### File name

```
{scope}.{method}.{statusCode}.{state}.json
```

#### `scope`:
#### Fixed value
The following file structure...
```
📂 api
┣ 📂 posts
┃ ┗ 📜 my-post.json
┣ 📜 posts.json
```

...will serve the following routes:
```
GET /posts
GET /posts/my-post
```

#### Star selector
The following file structure...
```
📂 api
┣ 📂 posts
┃ ┗ 📜 *.json
┣ 📜 *.json
```

...will serve the following routes:
```
GET /
GET /posts
```

#### Variable

### File content

The content of the `json` file will correspond to the body of the response. For example if the file `/api/users/*.json` contains this content:
```json
[
  {
    "id": 1,
    "name": "bob"
  },
  {
    "id": 2,
    "name": "alice"
  }
]
```

...you will get it as the request's body:

```js
let response = await fetch('/api/users')
let body = await response.json()
console.log(body) // [{"id":1,"name":"bob"},{"id":2,"name":"alice"}]
```
