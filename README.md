
<h1 align="center">
  <br>
  <a href="https://managet.vercel.app/"><img src="https://res.cloudinary.com/amitkumarshaw/image/upload/v1693855024/Logo_citpy5.png" alt="managet" width="200"></a>
  <br>
  Managet
  <br>
</h1>

<h4 align="center">A task management tool built using MERN Stack</h4>

<p align="center">
  <a href="https://react.dev/">
    <img width="20px" src="https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-svg-vector.svg" alt="React">
  </a>
  
  <a href="https://nodejs.org/en">
  <img width="20px" src="https://cdn.freebiesupply.com/logos/large/2x/nodejs-icon-logo-svg-vector.svg" alt="Node js">
  </a>
  
  <a href="https://www.mongodb.com/">
      <img height="20px" src="https://1000logos.net/wp-content/uploads/2020/08/MongoDB-Emblem-640x400.jpg" alt="mongo db">
  </a>
  
  <a href="https://expressjs.com/">
    <img height="20px" src="https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg" alt="express js">
  </a>
  
   <a href="https://tailwindcss.com/">
    <img height="20px" width="30px" src="https://w7.pngwing.com/pngs/293/485/png-transparent-tailwind-css-hd-logo.png">
  </a>
  
   <a href="https://jwt.io/">
    <img height="20px" src="https://jwt.io/img/pic_logo.svg" alt="express js">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

## Preview

![screenshot](https://res.cloudinary.com/amitkumarshaw/image/upload/v1693977564/managetScreenRecordingFinal_qljspy.gif)

## Screenshots

![screenshot](https://res.cloudinary.com/amitkumarshaw/image/upload/v1693944696/LoginPageScreenshot_zrsyzm.png)

![screenshot](https://res.cloudinary.com/amitkumarshaw/image/upload/v1693944698/AddingTaskScreenshot_ly48ps.png)

![screenshot](https://res.cloudinary.com/amitkumarshaw/image/upload/v1693945359/HomepageScreenshot_aou1wn.jpg)

![screenshot](https://res.cloudinary.com/amitkumarshaw/image/upload/v1693945222/lightmodeScreenshot_a2fvdt.jpg)

## Key Features


* Complete user authentication.  
* Create a task.
* Edit task
* Delete task.
* Change status of task (todo , doing , done) using easy drag and drop.
* Dark / Light mode toggle.
* Emoji support.
* Fully responsive.


## How to run in your system

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Amit-Shaw7/kanban-task-management.git

# Go into the frontend
$ cd frontend

# Install dependencies
$ npm install

# Create a .env file
# Open the .env file and 
## create a variable PORT with value 3000
## create a variable REACT_APP_BACKEND_URI with value http://localhost:5000

# Come back to previous path
$ cd ..

# Go into the backend
$ cd backend

# Install dependencies
$ npm install

# Create a .env file.
# Open the .env file and
## create a variable MONGO_URI with value your mongodb database connection uri.
## create a variable JWT_SECRET_KEY with value some strong string. 
## create a variable PORT with value 5000.

# Come back to previous path
$ cd ..

# Run the app

## Go into the backend
$ cd backend
$ npm run start

# Come back to previous path
$ cd .. 

## Go into the frontend
$ cd frontend
$ npm run start
```

## How to use

- Please wait for 15 second after the first visit to this app beacuse it's backend is hosted in a free server and if no request is made in last 15 minutes the company switch the server off till the next request and when a new request comes it takes about 15 sec to give first response.


- Signup with an email , name and password. After succesfull signup you will be redirected to login page.

- Login with that email and password. After succesfull login you will be redirected to home page where you can add task.

- Add a task using the + sign button in the bottom right of your screen. You can edit task , delete task if your want to work on that task drag it from todo to the doing area and when task completed drag it from doing area and drop in the done area.

- This way you can use it and don't forget to logout when you leave 😄

## Credits

This web app uses the following technologies:

- [Node.js](https://nodejs.org/)
- [React.js ](https://react.dev/)
- [MongoDB - a database](https://www.mongodb.com/)
- [Tailwin Css](https://tailwindcss.com/)

This web app uses the following important npm packages:

- [express.js](https://expressjs.com//)
- [mongoose ](https://mongoosejs.com/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://jwt.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [react-beautiful-dnd - for drag and drop feature](https://www.npmjs.com/package/react-beautiful-dnd)

## Related

[managet](https://managet.vercel.app/) - Deployed version of managet


## You may also like...

- [Yt Clone](https://github.com/Amit-Shaw7/yt-clone-frontend) - A youtube clone.
- [Pijja](https://github.com/Amit-Shaw7/pizzaApp---Frontend) - A dummy pizza ordering webapp

## License

MIT

---

> [Amit Shaw](https://amitshaw.vercel.app) &nbsp;&middot;&nbsp;
> GitHub [Amit-Shaw7](https://github.com/Amit-Shaw7) &nbsp;&middot;&nbsp;
> LinkedIn [amit-shaw-a95121230](https://www.linkedin.com/in/amit-shaw-a95121230/)

