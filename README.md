# Start-mongoose

This is my work assigned by [Route-Academy](https://www.linkedin.com/company/routeacademy/mycompany/) during learning backend web development.

This documentation provides a detailed explanation of the file structure and code used in the MongoDB, Mongoose, Node.js, and Express.js app. The app follows the MVC design pattern and consists of multiple files organized into various folders for improved readability and maintainability.

---

## Installation and Setup

The code in this module runs with the main server file `index.js` in the root directory.

Install dependencies:

```shell
npm install
```

To run the server:

```shell
node index.js
```

The server will start running on `http://localhost:3000`.

---

## File Structure

The file structure of the project is as follows:

- index.js
- src/
  - config/
    - connection.js
  - controllers/
    - post.controller.js
    - user.controller.js
  - middlewares/
    - checkEmail.js
    - checkPostOwner.js
    - checkUserId.js
  - models/
    - post.model.js
    - user.model.js
  - routes/
    - post.route.js
    - user.route.js
  - router.js

---

## API Documentation

This API documentation provides detailed information about the available endpoints and their usage in the MongoDB, Mongoose, Node.js, and Express.js app.

## User Endpoints

#### Sign up

- URL: `/user/signup`
- Method: `POST`
- Description: Create a new user account.

- Body:

```json
{
  "name": "user",
  "email": "user@user.com",
  "password": "12345",
  "age": 39,
  "gender": "male",
  "phone": "01xxxxxxxxx"
}
```

#### Login

- URL: `/user/login`
- Method: `POST`
- Description: Log in a user.

- Body:

```json
{
  "email": "user@user.com",
  "password": "12345"
}
```

#### Update User

- URL: `/user/update`
- Method: `PUT`
- Description: Update user data.

- Body:

```json
{
  "id": "64b66db2f066cb441a671917",
  "name": "user",
  "email": "user@user.com",
  "password": "12345",
  "age": 30,
  "phone": "01xxxxxxxxx"
}
```

#### Delete User

- URL: `/user/delete`
- Method: `DELETE`
- Description: Delete a user.

- Body:

```json
{
  "id": "64b69b63ecc66ede4d71dc6e"
}
```

#### Filter Users by Name and Age

- URL: `/user/filterNameAge`
- Method: `GET`
- Description: Search for users whose names start with a specific letter and whose age is less than a specified value.

- Body:

```json
{
  "letter": "m",
  "age": 30
}
```

#### Filter Users by Age Range

- URL: `/user/filterAge`
- Method: `GET`
- Description: Search for users whose age falls within a specified range.

- Body:

```json
{
  "lowAge": 15,
  "highAge": 30
}
```

#### Get All Users

- URL: `/user/all`
- Method: `GET`
- Description: Retrieve all users.

#### Get Users with Posts

- URL: `/user/posts`
- Method: `GET`
- Description: Retrieve user profiles along with their associated posts.

---

## Post Endpoints

#### Add Post

- URL: `/post/add`
- Method: `POST`
- Description: Add a new post.

- Body:

```json
{
  "author": "64b6ae543d3961d763baa4ff",
  "title": "1st post",
  "content": "This is my 1st post"
}
```

#### Update Post

- URL: `/post/update`
- Method: `PUT`
- Description: Update an existing post.

- Body:

```json
{
  "id": "64b6bb1c4969be200376fe25",
  "author": "64b66d6c46ffc64f18244cf5",
  "title": "edit",
  "content": "editing.........."
}
```

#### Delete Post

- URL: `/post/delete`
- Method: `DELETE`
- Description: Delete an existing post.

- Body:

```json
{
  "id": "64b6bb1c4969be200376fe25",
  "author": "64b66d6c36ffc64f18244cf5"
}
```

#### Get All Posts

- URL: `/post/all`
- Method: `GET`
- Description: Retrieve all posts.

#### Get Posts with Authors

- URL: `/post/authors`
- Method: `GET`
- Description: Retrieve all posts along with their associated authors.

#### Sort Posts in Descending Order

- URL: `/post/sortDesc`
- Method: `GET`
- Description: Retrieve all posts sorted in descending order by the `createdAt` timestamp.

---

## File Descriptions

### index.js

The `index.js` file is the entry point of the application. It imports the `express` module and the `router` function from the `router.js` file in the `src` folder. The application is configured to listen on port 3000, and the `router` function is called to set up the routes and connect to the database.

### router.js

The `router.js` file contains the `router` function that sets up the app's routes and database connection. It imports the `userRouter` and `postRouter` from the respective route files. The function first calls the `db()` function from the `connection.js` file in the config folder to establish a connection to the MongoDB database. Then, it sets up middleware to parse incoming JSON data and sets up the `/user` and `/post` routes using the `userRouter` and `postRouter`, respectively.

### connection.js

The `connection.js` file contains the `db` function that establishes a connection to the MongoDB database. It uses the `mongoose` module to connect to the database at `mongodb://127.0.0.1:27017/assignment_5`. If the connection is successful, it logs the name of the connected database. If an error occurs during the connection, it logs the error.

### post.controller.js

The `post.controller.js` file contains the controller functions for handling post-related operations. It imports the `Post` model from the `post.model.js` file and the `User` model from the `user.model.js` file. It also imports the `userController` object from the `user.controller.js` file to use the `pushPosts` function.

The controller functions in this file include:

- `addPost`: Adds a new post to the database. It expects the `author`, `title`, and `content` data from the request body. If the post is added successfully, it calls the `pushPosts` function from the `userController` to associate the post with the user.

- `updatePost`: Updates an existing post in the database. It expects the `id`, `title`, and `content` data from the request body. It checks if there are any updates to be made and updates the post accordingly.

- `deletePost`: Deletes an existing post from the database. It expects the `id` of the post to be deleted.

- `getAllPosts`: Retrieves all posts from the database.

- `getAllPostsWithAuthors`: Retrieves all posts from the database along with their associated authors.

- `sortDesc`: Retrieves all posts from the database sorted in descending order by the `createdAt` timestamp.

### user.controller.js

The `user.controller.js` file contains the controller functions for handling user-related operations. It imports the `User` model from the `user.model.js` file and the `bcrypt` module for password hashing.

The controller functions in this file include:

- `signUp`: Creates a new user account in the database. It expects the `name`, `email`, `password`, `age`, `gender`, and `phone` data from the request body. It hashes the password using `bcrypt` and saves the user data to the database.

- `logIn`: Logs in a user by checking the provided email and password against the database. If the email and password match, it returns a success message; otherwise, it returns a failed message.

- `updateUser`: Updates an existing user's data in the database. It expects the `id`, `name`, `email`, `password`, `age`, and `phone` data from the request body. It checks for any updates and updates the user's data accordingly.

- `deleteUser`: Deletes an existing user's data from the database. It expects the `id` of the user to be deleted.

- `searchNameAndAge`: Searches for users whose names start with a specific letter and whose age is less than a specified value.

- `searchAgeRange`: Searches for users whose age falls within a specified range.

- `getAllUsers`: Retrieves all users from the database.

- `getUserPosts`: Retrieves all users from the database along with their associated posts.

- `pushPosts`: Utility function used internally to associate a post with a user.

### checkEmail.js

The `checkEmail.js` file contains a middleware function `isEmailExist` that checks if a given email already exists in the database. It is used in the user sign-up route to ensure unique email addresses.

### checkPostOwner.js

The `checkPostOwner.js` file contains a middleware function `isOwner` that checks if the user trying to update a post is the post's owner. It is used in the post update route to prevent unauthorized updates.

### checkUserId.js

The `checkUserId.js` file contains a middleware function `isAuthorExist` that checks if a given user ID exists in the database. It is used in various routes to ensure that the provided user ID is valid.

### post.model.js

The `post.model.js` file contains the Mongoose schema for the `Post` model. It defines the `author`, `title`, and `content` fields and includes a `timestamps` option to automatically add `createdAt` and `updatedAt` timestamps to the document.

### user.model.js

The `user.model.js` file contains the Mongoose schema for the User model. It defines the `name`, `email`, `password`, `age`, `gender`, `phone`, and `posts` fields. The `posts` field is an array of `Post` ObjectIds, establishing a one-to-many relationship between users and posts. The schema also includes a `timestamps` option to automatically add `createdAt` and `updatedAt` timestamps to the document.

### post.route.js

The `post.route.js` file contains the routes for handling post-related requests. It imports the `Router` from Express.js and the `postController` object from `post.controller.js` to handle the request handlers. The file defines routes for adding, updating, deleting, and retrieving posts.

### user.route.js

The `user.route.js` file contains the routes for handling user-related requests. It imports the `Router` from Express.js and the `userController` object from `user.controller.js` to handle the request handlers. The file defines routes for user sign-up, login, updating user data, deleting a user, searching for users based on specific criteria, retrieving all users, and retrieving user profiles along with their posts.

---

## Author

- GitHub - [IMostafaR](https://github.com/IMostafaR)
- Linkedin - [@imostafarh](https://www.linkedin.com/in/imostafarh/)
