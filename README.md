**Obtaining API Keys:**

To use any of the included APIs and Database facilities, you will need to obtain appropriate credentials: TinyMCE\_API\_KEY and Postgres\_Database\_credentials(User, Host, Password, Database\_name and Port\_number). You will need to go through each provider to generate new credentials.


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
