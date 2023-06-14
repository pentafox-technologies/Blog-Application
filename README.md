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
- [Useful Tools and Resources](#useful-tools-and-resources)
- [Recommended Design Resources](#recommended-design-resources)
- [Recommended Node.js Libraries](#recommended-nodejs-libraries)
- [Recommended Client-side Libraries](#recommended-client-side-libraries)
- [Pro Tips](#pro-tips)
- [FAQ](#faq)
- [How It Works](#how-it-works-mini-guides)
- [Cheatsheets](#cheatsheets)
    - [ES6](#-es6-cheatsheet)
    - [JavaScript Date](#-javascript-date-cheatsheet)
    - [Mongoose Cheatsheet](#mongoose-cheatsheet)
- [Deployment](#deployment)
- [Docker](#docker)
- [Production](#production)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)

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
**Obtaining API Keys:**

To use any of the included APIs and Database facilities, you will need to obtain appropriate credentials: TinyMCE\_API\_KEY and Postgres\_Database\_credentials(User, Host, Password, Database\_name and Port\_number). You will need to go through each provider to generate new credentials.

![Aspose Words cd06fab1-1ed8-4e40-b0f1-73e17886088b 001](https://github.com/coder-Sabarish/Blog-Application/assets/90779418/4243e223-eae7-4033-b74a-25054bf81516)

- Visit [www](http://www.tiny.cloud)[.](http://www.tiny.cloud)[tiny](http://www.tiny.cloud)[.](http://www.tiny.cloud)[cloud](http://www.tiny.cloud)
- Create a TinyMCE account with your email or google
- Login to your account
- In the Navbar choose “Cloud Dashboard”
- Scroll down the page, In the bottom you will find your api key.


- Visit your Postgres Database Dashboard (PG Admin)
- Right click on Databases and select create Database
- Enter the Database name and select Owner and click save
- After the Database is created visit the properties of the Database
- There you can find the Database Name, User(owner) and Port number
- Use your pgServer password for password and Host name will be your hosting server address or localhost(for running in your local machine)







**Project Structure:**

Client:

|**NAME**|**DESCRIPTION**|
| :-: | :-: |
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






Server:

|**NAME**|**DESCRIPTION**|
| :-: | :-: |
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



**List of Packages:**



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
