# Social Network API

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Description

The Social Network API is a backend application that provides a RESTful API for a social network web application. Users can share their thoughts, react to friends' thoughts, and create a friend list. The application uses Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Table of Contents

- [Demonstration](#demonstration)
- [Screenshot](#screenshot)
- [Installation](#installation)
- [Usage](#usage)
- [Database Model](#database-model)
- [API Routes](#api-routes)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)
- [Citations](#citations)

## Demonstration

- [https://www.youtube.com/watch?v=cykOp8QJlEs/]

## Screenshot

![Screenshot](/images/social-network-api.png)

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Install the dependencies: `npm install`
3. Start the server: `npm start`
4. Install required dependencies.

- "dependencies": {
  "express": "^4.19.2",
  "mongoose": "^8.5.0"
  }

## Usage

1. Use Insomnia or a similar tool to interact with the API endpoints.
2. Explore the available routes for users, thoughts, and reactions.
3. Create, read, update, and delete users, thoughts, and reactions.
4. Add and remove friends from a user's friend list.

## Database Model

- `User`
- `username`: String, unique, required, trimmed
- `email`: String, required, unique, valid email format
- `thoughts`: Array of `_id` values referencing the `Thought` model
- `friends`: Array of `_id` values referencing the `User` model (self-reference)
- `Thought`
- `thoughtText`: String, required, between 1 and 280 characters
- `createdAt`: Date, default value to the current timestamp, formatted using a getter method
- `username`: String, required
- `reactions`: Array of nested documents created with the `reactionSchema`
- `Reaction` (schema only)
- `reactionId`: ObjectId, default value is set to a new ObjectId
- `reactionBody`: String, required, 280 character maximum
- `username`: String, required
- `createdAt`: Date, default value to the current timestamp, formatted using a getter method

## API Routes

- `/api/users`
- `GET`: Retrieve all users
- `GET`: Retrieve a single user by ID
- `POST`: Create a new user
- `PUT`: Update a user by ID
- `DELETE`: Delete a user by ID
- `/api/users/:userId/friends/:friendId`
- `POST`: Add a friend to a user's friend list
- `DELETE`: Remove a friend from a user's friend list
- `/api/thoughts`
- `GET`: Retrieve all thoughts
- `GET`: Retrieve a single thought by ID
- `POST`: Create a new thought
- `PUT`: Update a thought by ID
- `DELETE`: Delete a thought by ID
- `/api/thoughts/:thoughtId/reactions`
- `POST`: Create a reaction to a thought
- `DELETE`: Remove a reaction from a thought

## Features

- RESTful API endpoints for creating, reading, updating, and deleting users, thoughts, and reactions
- Ability to add and remove friends from a user's friend list
- MongoDB database integration using Mongoose ODM
- Timestamp formatting using a custom date library or the native JavaScript `Date` object

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript date library (e.g., Moment.js, date-fns)

## Contributing

Contributions to this project are not currently accepted. This is a graded classroom assignment, and it is an assessment of the developer's skills in using Node.js, Express.js, MongoDB, and Mongoose. If you have any suggestions, bug reports, or feature requests, please open an issue or leave a comment for future reference.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Questions

If you have any questions about the Social Network API, you can reach me at Jake_Toton@live.com. You can find more of my work at [Jtoton](https://github.com/Jtoton/).

## Citations

1. Node.js. (n.d.). Node.js. Retrieved from https://nodejs.org/
2. Express.js. (n.d.). Express - Node.js web application framework. Retrieved from https://expressjs.com/
3. MongoDB. (n.d.). MongoDB. Retrieved from https://www.mongodb.com/
4. Mongoose. (n.d.). Mongoose ODM. Retrieved from https://mongoosejs.com/
5. Moment.js. (n.d.). Moment.js. Retrieved from https://momentjs.com/
6. date-fns. (n.d.). date-fns. Retrieved from https://date-fns.org/
7. Open Source Initiative. (n.d.). The MIT License. Retrieved from https://opensource.org/licenses/MIT
8. Module 18 challenge. (n.d.). https://bootcampspot.instructure.com/courses/5301/assignments/74815

- Canvas assignment page which housed the assignment description, requirements and acceptance criteria.
  - This additionally provided the model schema to use including the required API routes.
  - Assignment did not contain source code that was provided, however assistance from teaching staff was aquired via zoom meetings.
