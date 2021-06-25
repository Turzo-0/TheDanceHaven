const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/ContactDance', { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();


const port = 8000;

//Define mongoose scema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    age: String,
    gender: String

});

const Contact = mongoose.model('Contact', ContactSchema);

//Express
app.use('/static', express.static('static'))
app.use(express.urlencoded())

//Pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, "views"))


//Endpoints
app.get('/', (req, res) => {

    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {

    const params = {}
    res.status(200).render('contact.pug', params);
})
app.get('/about', (req, res) => {

    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/services', (req, res) => {

    const params = {}
    res.status(200).render('services.pug', params);
})
app.get('/classInfo', (req, res) => {

    const params = {}
    res.status(200).render('classInfo.pug', params);
})


app.post('/contact', (req, res) => {

    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the dance database")
    }).catch(() => {
        res.status(404).send("The item was not saved.try again..")
    });

    // res.status(200).render('contact.pug');
})

//Starting the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});