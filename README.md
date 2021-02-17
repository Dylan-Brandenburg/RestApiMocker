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
- [**Documentation**](#documentation)

## Why Restapify
When you start a new frontend project when the backend is not yet ready, you quickly come to the question of how to retrieve the data to be displayed. There are then many solutions that come with advantages but also some inconveniences. It's possible to use a tool like [postman](https://www.postman.com/) but it's not 100% free and require an account, to simply fetch local JSON data but it only supports a `GET` request or use a mocker library like this one ([json-server](https://github.com/typicode/json-server), [mocker-api](https://github.com/jaywcjlove/mocker-api) or [http-fake-backend](https://github.com/micromata/http-fake-backend)). 

The problem of most of this libraries is the way you have to define your API endpoints (a single file for all the routes, javascript files that took almost the same time to code than the real API, ...). Restapify try to make this process even faster with a file structure close to the one that you can see in [Nextjs](https://github.com/vercel/next.js) or [Sapper](https://github.com/sveltejs/sapper) and some developer friendly syntaxes to populate your json files.

## Features

- 💡 **Incredible DX** - Intuitive files structure and JSON syntax
- ✅ **JSON valid** - You will only use `.json` files that follows the [ECMA-404](https://www.ecma-international.org/publications-and-standards/standards/ecma-404/) standard
- 🎛 **Dashboard** - Out of the box SPA to explore and manage your mocked API
- 💻 **CLI** - Use the CLI for an instant deployment
- 🔥 **Built in hot watcher** - Directly see your changes after a file update
- 📝 **[Fakerjs](https://github.com/marak/Faker.js/) implementation** - Intuitive syntax to quickly populate your API responses
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

You can then import the class and instantiate it to serve the api folder:

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

<!-- Generate table of content by running `yarn readme:generate-doc-table` -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [File structure](#file-structure)
- [Route's filename](#routes-filename)
  - [Simple route](#simple-route)
  - [Star notation](#star-notation)
  - [Route's variables](#routes-variables)
  - [HTTP's methods](#https-methods)
  - [HTTP's status code](#https-status-code)
  - [Route's state](#routes-state)
- [Route's file content](#routes-file-content)
  - [Response's body](#responses-body)
  - [Extended syntax](#extended-syntax)
  - [Consume route's variables](#consume-routes-variables)
    - [Route's variable casting](#routes-variable-casting)
  - [Fakerjs integration](#fakerjs-integration)
  - [For-loops](#for-loops)
    - [For-loop's array sequence](#for-loops-array-sequence)
    - [For-loop's range sequence](#for-loops-range-sequence)
- [CLI](#cli)
  - [`restapify serve`](#restapify-serve)
  - [`restapify list`](#restapify-list)
  - [🚧 Serve from configuration file](#-serve-from-configuration-file)
  - [Flags](#flags)
- [JavaScript's API](#javascripts-api)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### File structure
Restapify allow you to easily create REST API routes using a specific file structure. Take the following folder `api/` for example:
```
📂 api
┣ 📂 users
┃ ┗ 📜 *.json
┃ ┗ 📜 [userid].json
┃ ┗ 📜 [userid].DELETE.json
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

### Route's filename
The mocked API creation start directly with the filename.

#### Simple route
You can create a simple route with the filename of a `json` file:
```
📂 api
┣ 📂 animals
┃ ┗ 📜 rabbits.json
┣ 📜 posts.json
```

It will serve the routes:
```
GET /animals/rabbits
GET /posts
```

#### Star notation
To easily manage your different routes `json` files you can use the star notation:

```
📂 api
┣ 📂 animals
┃ ┗ 📜 *.json
┃ ┗ 📜 rabbits.json
```

It will serve the routes:

```bash
GET /animals    # <-- served from the file /animals/*.json
GET /animals/rabbits
```

#### Route's variables
You can define some variables in your routes by using squared brackets. It works on a filename but also on directories name:

```
📂 api
┣ 📂 posts
┃ ┗ 📜 [postid].json
┃ ┣ 📂 [postid]
┃ ┃ ┗ 📜 comments.json
```

This will serve:

```
GET /posts/:postid
GET /posts/:postid/comments
```

You will be then able to use theses variables in the json files (see the [Consume route's variables](#consume-routes-variables) section).

> ⚠️ In case your want to use severals variables inside a route like `/posts/:var1/comments/:var2`, make sure that they have an unique name

#### HTTP's methods

Define your routes method (`GET`, `POST`, `PUT`, `DELETE` or `PATCH`) by adding it in the filename separated by a `.`. The default method is `GET`:

```
📂 api
┣ 📂 posts
┃ ┗ 📜 *.GET.json
┃ ┣ 📂 [postid]
┃ ┃ ┗ 📜 *.json
┃ ┃ ┗ 📜 *.POST.json
┃ ┃ ┗ 📜 *.DELETE.json
```

This will serve:

```
GET    /posts
GET    /posts/:postid
POST   /posts/:postid
DELETE /posts/:postid
```

#### HTTP's status code

Define what status code your route should respond by adding it in the filename after the HTTP method (if there is one) separated by a `.`. The default status code is `200`

```
📂 api
┣ 📂 posts
┃ ┗ 📜 *.GET.json
┃ ┣ 📂 [postid]
┃ ┃ ┗ 📜 *.200.json
┃ ┃ ┗ 📜 *.POST.201.json
┃ ┃ ┗ 📜 *.DELETE.204.json
```

It will serve:

```bash
GET    /posts          # 200
GET    /posts/:postid  # 200
POST   /posts/:postid  # 201
DELETE /posts/:postid  # 204
```

#### Route's state

In an API, the same route may return different responses depending on certain factors. A simple example is a request called with a wrong parameter, the response will probably contain an error message instead of the expected result.

So you can create an endpoint with several different states. To do this you just have to create a new file for each different state by adding at the end of the file the syntax `{STATE_NAME}` separated by a dot.

Here is an example of how to define an endpoint with several states:

```
📂 api
┣ 📂 posts
┃ ┗ 📜 *.json
┃ ┣ 📂 [postid]
┃ ┃ ┗ 📜 *.json
┃ ┃ ┗ 📜 *.404.{INV_ID}.json
┃ ┃ ┗ 📜 *.POST.201.json
┃ ┃ ┗ 📜 *.POST.401.{INV_CRED}.json
┃ ┃ ┗ 📜 *.POST.400.{INV_PARAMS}.json
```

It will serve:

```bash
GET    /posts
GET    /posts/:postid  # 200
POST   /posts/:postid  # 201
```

You will then in the [dashboard](todo) be able to select which state you want to use for a specific route. So for example if you select the state `INV_PARAMS` for the route `POST /posts/[postid]`, the server will respond with the status code `400`.

### Route's file content
The structure of the files allows to define the API endpoints, now it is necessary to define what they respond.

#### Response's body
The content of a route file will correspond to the body of the request's response. For example if the file `/api/users/*.json` contains this content:
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

The response's body of `GET /users` will be this array of 2 users.

#### Extended syntax
A route file can also contain an 'extended' syntax that allow you to specify a custom response's header. The syntax is the following:

```typescript
{
  "#header": Object,
  "#body": Array or Object 
}
```

Example:
```json
{
  "#header": {
    "Content-Type": "text/html; charset=UTF-8"
  },
  "#body": {
    "success": false
  }
}
```

#### Consume route's variables

You can define some route's variables in your route's filename (see [route's variables](#routes-variable) section). You can then consume them in your response's body.

For example the file `/api/posts/[postid].json` contains the route variable `postid` that you can use in the file content:

```json
{
  "id": "[postid]",
  "content": "Lorem ipsum dolor sit amet, consectetur adipisici elit, …"
}
```

As a result, if you request `GET /posts/my-post` you will get the response:

```json
{
  "id": "my-post",
  "content": "Lorem ipsum dolor sit amet, consectetur adipisici elit, …"
}
```

##### Route's variable casting

By default, all route's variables are interpreted as a string. You can cast a variable to a number by using the following syntax `"n:[myroutevar]"`. So if you use the previous example and replace the file content to:

```json
{
  "id": "n:[postid]",
  "content": "Lorem ipsum dolor sit amet, consectetur adipisici elit, …"
}
```

and then call the route `GET /posts/42`, you will get the response:

```json
{
  "id": 42,
  "content": "Lorem ipsum dolor sit amet, consectetur adipisici elit, …"
}
```

> ⚠️ Don't cast your number route's variable that are present in a string. Just use them like `"content": "The post [postid] is nice …"`

#### Fakerjs integration

To easily create mocked data, restapify integrate the [fakerjs](https://github.com/Marak/faker.js) library with an easy to use syntax.

To get for example a faked text content with the regular library you will call `faker.lorem.paragraphs()`. In your route's response you can use it following the syntax `[#faker:<namespace>:<method>]`:


```json
{
  "id": "n:[postid]",
  "content": "[#faker:lorem:paragraphs]"
}
```

Checkout [here](https://github.com/Marak/faker.js#api-methods) all the methods that you can use.

#### For-loops

To easily create a big amount of data in an array, Restapify provides a for-loop syntax. Its structure is the following:

```js
[
  "#for <x> in <sequence>",
  "<statement>",
  "#endfor"
]
```

There is 2 options to create a `sequence`: using an [array](#for-loops-array-sequence) or the [range](#for-loops-range-sequence) function.

##### For-loop's array sequence

You can easily create multiple data by iterate over an array:

```json
[
  "#for animal in ['rabbit', 'mouse', 'lion']",
  { "type": "[animal]" },
  "#endfor"
]
```

Here the `<sequence>` is `['rabbit', 'mouse', 'lion']`, the iterator variable `<x>` is `animal` and the statement is `{ "type": "[animal]" }`. Note that you can use the value of `x` inside the statement by using the syntax `[x]`. This example will produce:

```json
[
  { "type": "rabbit" },
  { "type": "mouse" },
  { "type": "lion" }
]
```

##### For-loop's range sequence

For bigger amount of data you can use the `range` syntax that works the same than [range() from lodash](https://lodash.com/docs/4.17.15#range):

```json
[
  "#for userId in range(10)",
  { "id": "n:[userId]", "type": "user" },
  "#endfor"
]
```

This example will produce:

```js
[
  { "id": 0, "type": "user" },
  { "id": 1, "type": "user" },
  // ...
  { "id": 9, "type": "user" },
]
```

### CLI
Restapify comes with a cli to easily serve your mocked API.

#### `restapify serve`
Serve the mocked API from a specific directory:

```
restapify serve <rootDir>
```

#### `restapify list`
List all the routes detected by restapify from a specific directory:

```
restapify list <rootDir>
```

#### 🚧 Serve from configuration file
Serve the mocked API from a configuration file. The default path is `./restapify.config.json`:

```
restapify [path]
```

The configuration file has to follow the structure of the type `ConfigFile`:

```typescript
interface ConfigFileState  {
  "route": string,
  "method": 'GET' | 'POST' | 'DELETE' | 'PUT' |'PATCH',
  "state": string
}
interface ConfigFile {
  "rootDir": string, // relative path to the API root directory (REQUIRED)
  "apiBaseUrl": string, // By default: `api/`
  "port": number, // By default: `6767`
  "states": ConfigFileState[] // By default `undefined`
}
```

Example:
```json
{
  "rootDir": "./api",
  "apiBaseUrl": "my-api/",
  "port": 6768,
  "states": [
    {
      "route": "/users/[userid]",
      "method": "DELETE",
      "state": "ERR"
    }
  ]
}
```

#### Flags
| short         | long                 | description                          | default  |
|---------------|----------------------|--------------------------------------|----------|
| `-v`          | `--version`          | output the current version           |          |
| `-p <number>` | `--port <number>`    | port to serve the API                | `6767`   |
| `-b <string>` | `--baseUrl <string>` | base url to serve the API            | `'/api'` |
|               | `--no-open`          | don't open dashboard on server start | `false`  |

### JavaScript's API
