// server
const express = require('express');
// middleware
const morgan = require('morgan');
// db
const mongoose = require('mongoose');

// routes
const blogRoutes = require('./routes/blogRoutes');
// custom functions
const { success } = require('../basics/chalkFunctions');

// express app
const app = express();
// db
const dbURI = 'mongodb://127.0.0.1:27017/blog';
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log(success('DB Running'));
    // listen for requests
    app.listen(3000, () => {
      console.log(success('App Listening On Port: 3000'));
    });
  })
  .catch((err) => console.log(err));

// register view engine
// ? app.set('views', 'myviews' <--- if you want to name your own folder);
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
// ? a piece of middleware at the end after it goes through all the routes and can't find one the 404 will display
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
