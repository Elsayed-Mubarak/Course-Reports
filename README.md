# Course Reports

Implement a function that would process students, courses and instructors data (loaded from MongoDB collections) in order to produce information about students enrolled on courses (and store it in another MongoDB collection).

# Setup

Follow these steps if you are using zip/git mode (i.e. not available inside Devskiller in-browser IDE):

1. `npm install` – install dependencies
2. `npm test` – run all tests once (this will be used to evaluate your solutions)
3. `npm run test:watch` - run all tests in _watch mode_ (optionally, you can use it locally if you prefer)

## Mongo setup

Since your code will be ran against a suite of unit tests, the task relies of a lightweight, in-memory version of Mongo database (`mongodb-memory-server`, see `package.json` for details). But it doesn't deviate from [native Mongo node.js driver](http://mongodb.github.io/node-mongodb-native/3.1/api/). If you want, you can prepopulate your local Mongo database with the data import script.

## Your task

**Complete the code in `src/mongo-commands.js`** in order to create a function that reports each student’s:
- primary key
- their name
- the number of courses they are enrolled in

Store the output of this routine in a MongoDB collection called `coursereport`.

Once `mongo-commands.js` is executed the MongoDB `coursereport` collection should contain the following information:

```json
[
  {
    "_id": "jeff",
    "value": {
      "name": "Jeff Holland",
      "numbercourses": 2
    }
  },
  {
    "_id": "john.shore",
    "value": {
      "name": "John Shore",
      "numbercourses": 2
    }
  },
  {
    "_id": "lee2331",
    "value": {
      "name": "Lee Aldwell",
      "numbercourses": 1
    }
  },
  {
    "_id": "rcotter",
    "value": {
      "name": "Ray Cotter",
      "numbercourses": 2
    }
  },
  {
    "_id": "scott",
    "value": {
      "name": "Scott Mills",
      "numbercourses": 3
    }
  }
]
```
