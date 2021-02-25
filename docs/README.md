# Documentation

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
      - [Number casting](#number-casting)
      - [Boolean casting](#boolean-casting)
  - [Consume route's query string variables](#consume-routes-query-string-variables)
  - [Fakerjs integration](#fakerjs-integration)
  - [For-loops](#for-loops)
    - [For-loop's array sequence](#for-loops-array-sequence)
    - [For-loop's range sequence](#for-loops-range-sequence)
    - [Use route's variables in sequence](#use-routes-variables-in-sequence)
- [CLI](#cli)
  - [`restapify serve`](#restapify-serve)
  - [`restapify list`](#restapify-list)
  - [🚧 Serve from configuration file](#-serve-from-configuration-file)
  - [Flags](#flags)
- [JavaScript's API](#javascripts-api)
  - [Types definition list](#types-definition-list)
    - [RestapifyParams](#restapifyparams)
    - [RouteState](#routestate)
  - [Restapify's constructor](#restapifys-constructor)
  - [Restapify.run()](#restapifyrun)
  - [Restapify.close()](#restapifyclose)
  - [Restapify.on()](#restapifyon)
    - [Events list](#events-list)
    - [Restapify.on('error', <callback>)](#restapifyonerror-callback)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## File structure
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

## Route's filename
The mocked API creation start directly with the filename choice.

### Simple route
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

### Star notation
To easily manage your different routes `json` files into folder, you can use the star notation:

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

### Route's variables
You can define some variables in your routes by using squared brackets. It works on a filename but also on directory name:

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

### HTTP's methods

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

### HTTP's status code

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

### Route's state

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

## Route's file content
The structure of the files allows to define the API endpoints, now it is necessary to define what they respond.

### Response's body
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

### Extended syntax
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

### Consume route's variables

You can define some route's variables in your route's filename (see [route's variables](#routes-variables) section). You can then consume them in your response's body.

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

#### Route's variable casting
By default, all route's variables are interpreted as a string.

##### Number casting
You can cast a variable to a number by using the following syntax `"n:[<variable>]"`. So if you use the previous example and replace the file content to:

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

##### Boolean casting
You can cast a variable to a number by using the following syntax `"b:[<variable>]"`. So if you use the example `/api/posts/[postid]/private/[isPrivate].POST.json`:

```json
{
  "id": "n:[postid]",
  "private": "b:[isPrivate]",
  "content": "Lorem ipsum dolor sit amet, consectetur adipisici elit, …"
}
```

and call it from `POST /posts/42/private/true`, you will get the response:

```json
{
  "id": 42,
  "private": true,
  "content": "Lorem ipsum dolor sit amet, consectetur adipisici elit, …"
}
```

### Consume route's query string variables
You can consume query string variables in your body using the syntax `[q:<variable>]`

Take the following file `/api/users.json` for example:
```json
[
  {
    "id": 1,
    "name": "bob",
    "age": "[q:age]"
  },
  {
    "id": 2,
    "name": "alice",
    "age": "[q:age]"
  }
]
```

I you request `GET /api/users?age=42`, you will get:
```json
[
  {
    "id": 1,
    "name": "bob",
    "age": "42"
  },
  {
    "id": 2,
    "name": "alice",
    "age": "42"
  }
]
```

You can also declare a default value using this syntax `[q:<variable>|<defaultValue>]`:
```json
[
  {
    "id": 1,
    "name": "bob",
    "age": "[q:age|30]"
  },
  {
    "id": 2,
    "name": "alice",
    "age": "[q:age|42]"
  }
]
```

So if you request `GET /api/users` you will get:
```json
[
  {
    "id": 1,
    "name": "bob",
    "age": "30"
  },
  {
    "id": 2,
    "name": "alice",
    "age": "42"
  }
]
```

### Fakerjs integration

To easily create mocked data, restapify integrate the [fakerjs](https://github.com/Marak/faker.js) library with an easy to use syntax.

To get for example a faked text content with the regular library you will call `faker.lorem.paragraphs()`. In your route's response you can use it following the syntax `[#faker:<namespace>:<method>]`:


```json
{
  "id": "n:[postid]",
  "content": "[#faker:lorem:paragraphs]"
}
```

Checkout [here](https://github.com/Marak/faker.js#api-methods) all the methods that you can use.

### For-loops

To easily create a big amount of data in an array, Restapify provides a for-loop syntax. Its structure is the following:

```js
[
  "#for <x> in <sequence>",
  "<statement>",
  "#endfor"
]
```

There is 2 options to create a `sequence`: using an [array](#for-loops-array-sequence) or the [range](#for-loops-range-sequence) function.

#### For-loop's array sequence

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

#### For-loop's range sequence

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

#### Use route's variables in sequence

You can use [route's variables](#consume-routes-variables) and [route's query string variables](#consume-routes-query-string-variables) in your for loop's sequence:

```json
[
  "#for userId in range([q:limit|20])",
  { "id": "n:[userId]", "type": "user" },
  "#endfor"
]
```

You can then have `x` users in the response of `GET /api/users?limit=x`

## CLI
Restapify comes with a cli to easily serve your mocked API.

### `restapify serve`
Serve the mocked API from a specific directory:

```
restapify serve <rootDir>
```

### `restapify list`
List all the routes detected by restapify from a specific directory:

```
restapify list <rootDir>
```

### 🚧 Serve from configuration file
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
  "rootDir": string,           // [REQUIRED] relative path to the API root directory
  "apiBaseUrl": string,        // default: `api/`
  "port": number,              // default: `6767`
  "states": ConfigFileState[], // default: `undefined`
  "openDashboard": boolean     // default: `true` 
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

### Flags
| short         | long                 | description                          | default  |
|---------------|----------------------|--------------------------------------|----------|
| `-v`          | `--version`          | output the current version           |          |
| `-p <number>` | `--port <number>`    | port to serve the API                | `6767`   |
| `-b <string>` | `--baseUrl <string>` | base url to serve the API            | `'/api'` |
|               | `--no-open`          | don't open dashboard on server start | `false`  |

## JavaScript's API

Restapify provides a JavaScript API which is usable from Node.js. You will rarely need to use this, and should probably be using the command line.

### Types definition list

#### RestapifyParams
Object of needed parameters to instanciate a Restapify's instance.

```typescript
interface RestapifyParams {
  rootDir: string
  port?: number           // default: 6767
  baseUrl?: string        // default: '/api'
  states?: RouteState[]   // default: []
  openDashboard?: boolean // default: false
  hotWatch?: boolean      // default: true
}
```

#### RouteState
Used in Restapify parameter to specify which state use for a specific route.
```typescript
interface RouteState {
  route: string
  state?: string
  method?: HttpVerb // default: 'GET'
}
```

### Restapify's constructor
First step is to create an Restapify's instance with a `params` object from type [RestapifyParams](#restapifyParams):

```js
import Restapify from 'restapify'

const params = {...}

const rpfy = new Restapify(params)
```

Be aware that `params.rootDir` has to be the **absolute** path to the directory. This can be easily achieved by using the [path](https://nodejs.org/api/path.html) library:

```js
import * as path from 'path'

const rootDir = path.resolve(__dirname, './api')
const params = { rootDir }
// ...
```

### Restapify.run()
Use the method `run` after the instanciation to start the mocked API server:

```js
import Restapify from 'restapify'
const params = {...}
const rpfy = new Restapify(params)

rpfy.run()
```

### Restapify.close()
Stop the mocked API server:

```js
import Restapify from 'restapify'
const params = {...}
const rpfy = new Restapify(params)

rpfy.run()

setTimeout(() => { 
  // Close the server after 3 seconds
  rpfy.close()
}, 3000);
```

### Restapify.on()
You can trigger callbacks on different event with the help of the `on(<event>, <callback>)` method:

```js
import Restapify from 'restapify'
const params = {...}
const rpfy = new Restapify(params)

rpfy.on('start', () => { console.log('Mocked API successfully started') })
rpfy.on(['server:start', 'server:restart'], () => { console.log('Event on server') })
rpfy.on('error', ({ error, message }) => {
  console.log(`Failed with error ${error}: ${message}`)
  rpfy.close()
  process.exit(1)
})

rpfy.run()
```

#### Events list

| event              | description                                  | callback type                                              |
|--------------------|----------------------------------------------|------------------------------------------------------------|
| **start**          | Restapify started successfully               | `() => void`                                               |
| **server:start**   | Mocked API served successfully               | `() => void`                                               |
| **server:restart** | Mocked has been refreshed successfully       | `() => void`                                               |
| **dashboard:open** | Dashboard SPA has been opened in the browser | `() => void`                                               |
| **error**          | Error detected                               | `({ error: RestapifyErrorName, message?:string } => void)` |

#### Restapify.on('error', <callback>)

The error callback provides as parameter an object with 2 usefull infos: the `error` string identifier and *optionally* a `message` that explain the reason of the error. Here is the list of the different errors (type `RestapifyErrorName`):

| error                | description                                                           | message |
|----------------------|-----------------------------------------------------------------------|:-------:|
| **INV:JSON_FILE**    | one of the detected json files is invalid                             |    ✅    |
| **MISS:ROOT_DIR**    | root directory parameter is missing or invalid                        |    ❌    |
| **MISS:PORT**        | given port is not available                                           |    ❌    |
| **INV:API_BASEURL**  | given api base url is needed for internal purposes (ex: `/restapify`) |    ❌    |
| **INV:FAKER_SYNTAX** | invalid call to the fakerjs library                                   |    ✅    |
| **ERR**              | Unhandled error triggered                                             |    ✅    |
