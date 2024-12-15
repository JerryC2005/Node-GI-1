const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast');
const { error } = require('console');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
// 
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and view location
app.set('views', viewPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jerry Castro Luz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name: 'Jerry Castro Luz'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This website is really cool',
        title: 'Help',
        name: 'Jerry Castro Luz'
    })
})

app.get('/weather', (req, res) => {
    // error msg if user put nothing in search
    if(!req.query.address) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    const unit = req.query.unit || 'F';


    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error: error})
        } 

        forecast(latitude, longitude, unit, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
                unit
            })
        })
    })

})

app.get('/products' , (req, res) => {
    //making if statemnent to check if user actually searched for something
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render( '404Page', {
        title: '404',
        error: 'Help article not found',
        name: 'Jerry Castro Luz' 
    })
})

app.get('*', (req, res) => {
    res.render('404Page', {
        title: '404',
        error: 'Page not found',
        name: 'Jerry Castro Luz'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
