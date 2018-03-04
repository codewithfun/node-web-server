const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//     });
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send('Hello Express!');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to our web site',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error !!'
    })
});

app.listen(3000, () => {
    console.log('Starting server at port 3000 ...')
});