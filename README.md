![](https://drive.google.com/file/d/1NlAo9WPz_16kGr-pCBMSMy5LVGU-yOvB/view)

Dynamic Content Delivery Application
====================================

**Website Link**: [Blog App](https://github.com/coder-Sabarish/Blog-Application)

Jump to [Source Code](https://github.com/coder-Sabarish/Blog-Application)

We are developing a web application which serves as a Content Manager Platform for Dynamic Content Delivery. This helps the company to post their technologies and company's services. The primary objective of the application is to provide quality content and give a great impression about the company to its users.

The main feature of the application is the provision of a blog system with various user privileges. Users can create and submit blog posts for approval and publishing, with the moderation process handled by authorized users known as Moderators. These Moderators are appointed by the Admin, who possesses comprehensive control over the application, including user and article management.

The web application is dynamic and stores all data in a database, enhancing the overall user experience. Users can contribute to different categories defined by the Admin, ensuring diverse content creation. The application caters to four types of users: Standard users, Moderators, Anonymous users, and the Admin.

<h4 align="center">Home Page</h4>

<img align="center" alt="Coding" width="800" src="https://lh3.googleusercontent.com/drive-viewer/AFGJ81pO4DXqveMskeQoL74SnMzQ4Zjo8HVxoPHCDZ7-ZT9K-Vo04L2CVHI0Q2ru7ZslsgPR06gFHjF3DYioUwBr7nnndBuv=s1600">

<h4 align="center">Editing Page</h4>

<img align="center" alt="Coding" width="800" src="https://lh3.googleusercontent.com/drive-viewer/AFGJ81oguX7-q2FJnPGHxE50FsiBuGqMK68d1jEzEyeaNQOPQlTmeM3GFn2oWKX4Fv8g3wpdGWqxnOvR8whIvhszsWCsaN_t=s1600">

<h4 align="center">Profile Page</h4>

<img align="center" alt="Coding" width="800" src="https://lh3.googleusercontent.com/drive-viewer/AFGJ81oYNQFUfpVvtGhuk0PjNQxO2D5ShZDCpp7K0lVRRYF7vFyxA3hf_sEY8ba8Wwwq9gk1x_mc6RAa4-NC0lE9mmDrSAwsMA=s1600">

<h4 align="center">Admin Dashboard</h4>

<img align="center" alt="Coding" width="800" src="https://lh3.googleusercontent.com/drive-viewer/AFGJ81rwQUDRRTRWYf0E1KxT9mCceAXVJb85j04nigDAWyQ-ti-o3Jy7_X3TiKSH4r2qDL2CxPqMvnvKGz17dHKLqXHoXcyElQ=s1600">


Table of Contents
-----------------

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Obtaining API Keys](#obtaining-api-keys)
- [Project Structure](#project-structure)
- [List of Packages](#list-of-packages)
- [Recommended Node.js Libraries](#nodejs-libraries)
- [Recommended Client-side Libraries](#client-side-libraries)
- [FAQ](#faq)
- [Roles and Permissions](#roles-and-permissions)
- [Database diagram](#database-diagram)

Features
--------

- **Local Authentication** using Email and Password
- **Account Management**
 - Profile Details
 - Change Password
 - Adding Profile Pictures
 - Viewing Article Details
- JWT Tokenization
- **Authorization** using Cerbos application
- Managing user type and their privilages
- Promoting Users to Moderator
- Article editor with rich text
- Static Content Delivery using **NextJS**
- Bootstrap 5 Styling
- MUI Rsponsive Components

Prerequisites
-------------

- [PostgreSQL](https://www.postgresql.org/docs/)
- [ExpressJS](https://expressjs.com/en/5x/api.html)
- [Cerbos](https://cerbos.dev/)
- [Next.js](https://nextjs.org/docs)
- [MUI](https://mui.com/)

**Note:** 
- If you are new to Next.js, you may find)
[documentation](https://nextjs.org/docs)
helpful for learning the basics and setup of Next.js. 
- For cerbos you can book a [session](https://go.cerbos.io/workshop)

Getting Started
---------------

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/coder-Sabarish/Blog-Application

# Change directory to client
cd client

# Install NPM dependencies
npm install

# Change directory to server
cd ..
cd server

# Install NPM dependencies
npm install

# Installation is completed

# Then simply start your app
Client => npm run dev
Server => npm start
```

**Warning:** If you want to create an article you have to **Login** first. Suppose you don't have account Register with necessary details.

**Note:** I highly recommend installing [Nodemon](https://github.com/remy/nodemon).
It watches for any changes in your  node.js app and automatically restarts the
server. Once installed, instead of `node app.js` use `nodemon app.js`. It will
save you a lot of time in the long run, because you won't need to manually
restart the server each time you make a small change in code. To install, run
`npm install -g nodemon`.
<br>
<br>
<h2>Obtaining API Keys:</h2>

To use any of the included APIs and Database facilities, you will need to obtain appropriate credentials: TinyMCE\_API\_KEY and Postgres\_Database\_credentials(User, Host, Password, Database\_name and Port\_number). You will need to go through each provider to generate new credentials.
<br/><br/><br/>
![images](https://github.com/coder-Sabarish/Blog-Application/assets/90779418/d839470a-8284-4c73-a8a6-e24163ed50a3)

- Visit [www](http://www.tiny.cloud)[.](http://www.tiny.cloud)[tiny](http://www.tiny.cloud)[.](http://www.tiny.cloud)[cloud](http://www.tiny.cloud)
- Create a TinyMCE account with your email or google
- Login to your account
- In the Navbar choose “Cloud Dashboard”
- Scroll down the page, In the bottom you will find your api key.
<br/><br/><br/>
![download](https://github.com/coder-Sabarish/Blog-Application/assets/90779418/49643443-4ffe-40ba-845a-36eac38d8574)

- Visit your Postgres Database Dashboard (PG Admin)
- Right click on Databases and select create Database
- Enter the Database name and select Owner and click save
- After the Database is created visit the properties of the Database
- There you can find the Database Name, User(owner) and Port number
- Use your pgServer password for password and Host name will be your hosting server address or localhost(for running in your local machine)



<br/><br/>



<h2>Project Structure:</h2>

<h4>Client:</h4>

|**NAME**|**DESCRIPTION**|
| :- | :- |
|pages/posts/[slug].js|view different articles based on the slug|
|pages/validate/[slug].js|Get jwt Tokens from cookies after login|
|pages/blogs.js|Display available blogs as cards for viewers|
|pages/editor,js|Editor page to create blog|
|pages/home.js|Home page layout|
|pages/index.js|Starting page of the application|
|pages/login.js|Login page|
|pages/signup.js|Signup Page|
|pages/Profile.js|Profile Page Layout|
|components/|Required components to all the pages|
|helper/index.js|Verify user has logged in or not|
|public/images|Add the needed images here|
|public/ThemeConfig.js|Specifies the color theme of the application|
|styles/|StyleSheets for each pages|
|middleware.js|Store the tokens in cookies and retrieve it|
|next.config.js|Contains api keys for client side|
|package.json|NPM Dependencies|
|package.lock.json|Contains exact versions of NPM dependencies in package.json.|






<h4>Server:</h4>

|**NAME**|**DESCRIPTION**|
| :- | :- |
|cerbos/policies/derived\_roles.yaml|Different roles and their conditions|
|cerbos/policies/resource\_.yaml|Permission to different resources for different users|
|controllers/articleController.js|Api functions related to Articles|
|controllers/authController.js|Api functions related to Authentication|
|controllers/categoryController.js|Api functions related to Category of articles|
|controllers/supportController.js|Api functions related to support of articles|
|controllers/userController.js|Api functions related to users|
|middleware/cerbos.js|Connect cerbos server with our node server|
|middleware/multer.js|Store photos uploaded by the users|
|public/articleCoverImages|Stores articles CoverImage of all articles|
|public/userProfilePic|Stores users profile pictures|
|routes/articleRoute.js|Matches article related request to appropriate functions in articleController|
|routes/categoryRoute.js|Matches category related request to appropriate functions in categoryController|
|routes/supportRoute.js|Matches support related request to appropriate functions in supportController|
|routes/userRoute.js|Matches user related request to appropriate functions in userController|
|.env|Stores database credentials and jwt secretary|
|app.js|Handles middlewares and routings|
|db.js|Connects server to database|
|index.js|Connects server to port|
|package.json|NPM Dependencies|
|package.lock.json|Contains exact versions of NPM dependencies in package.json.|

<br/><br/>

<h2>List of Packages:</h2>



|bcrypt|Library for hashing and salting user password|
| :- | :- |
|body-parser|Node.js body parsing middleware|
|cors|To remove restrictions on request policies|
|dotenv|Load environment variables from .env file|
|express|Node.js web framework|
|multer|Node.js middleware for handling multipart/form-data|
|slugify|Slugifies a string|
|url|utilities for URL resolution and parsing meant to have feature parity with node.js core [url](http://nodejs.org/api/url.html) module|
|tinymce|To integrate TinyMCE editor with React|
|mui-image|To get material UI images for our application|
|validator|Input validation for forms|
|next|React web framework|

# Node.js Libraries

## [nodemon](https://github.com/remy/nodemon)
A development tool that automatically restarts your Node.js application whenever file changes are detected.

## [jwt](https://github.com/auth0/node-jsonwebtoken)
A library for creating and verifying JSON Web Tokens (JWT) used for secure authentication and data exchange between parties.

## [pg](https://github.com/brianc/node-postgres)
A PostgreSQL client library for Node.js that provides a convenient interface for interacting with PostgreSQL databases.

## [slugify](https://github.com/simov/slugify)
A library for creating URL-friendly slugs by converting strings into a format suitable for use in URLs.

## [sharp](https://github.com/lovell/sharp)
A powerful image processing library for Node.js that enables resizing, cropping, and manipulating images with high performance and quality.

## [multer](https://github.com/expressjs/multer)
A middleware for handling file uploads in Node.js web applications, allowing you to handle and process multipart form data.

# Client-Side Libraries

## [material UI](https://github.com/mui-org/material-ui)
A popular React UI framework that provides pre-designed and customizable components following the Material Design guidelines.

## [js-cookie](https://github.com/js-cookie/js-cookie)
A lightweight JavaScript library for managing browser cookies, making it easier to create, read, and delete cookies in the browser.

## [react-cookie](https://github.com/reactivestack/cookies/tree/master/packages/react-cookie)
A React library that provides easy integration with browser cookies, allowing you to manage and access cookies within your React application.

## [axios](https://github.com/axios/axios)
A promise-based HTTP client for making HTTP requests from both browsers and Node.js, providing a simple and intuitive interface.

## [react-fontawesome](https://github.com/FortAwesome/react-fontawesome)
A library that provides React components for easily incorporating Font Awesome icons into React applications.

## [react-toastify](https://github.com/fkhadra/react-toastify)
A library for displaying toast notifications in React applications, offering customizable and responsive notification messages.

## [validator](https://github.com/validatorjs/validator.js)
A library for validating and sanitizing data in JavaScript, providing utility functions for validating various data types and formats.

## [prop-types](https://github.com/facebook/prop-types)
A library for defining and enforcing the expected types and structures of React component props, helping catch potential bugs and issues.

