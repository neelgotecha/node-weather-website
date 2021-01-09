const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')
const { dirname } = require('path')
const { Http2ServerRequest } = require('http2')
const { response } = require('express')

const publicDirectoryAddress = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

const app = express()

app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static server to serve the directory
app.use(express.static(publicDirectoryAddress))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        author: 'Bhai Pote'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        author: 'Bhai Pote'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        author: 'Bhai Pote'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Kindly provide an address'
        })
    }

    geocode.getCoordinates(req.query.address, (error, {latitude,longitude,location}={})=> {
        if (error){
            return res.send({
                error
            })
        }
        weather.getWeather(latitude, longitude, (error, {description})=>{
            if(error){
                return res.send({
                    error
                })
            }
            console.log('Currently it is ' + description + ' in '+ location)
            res.send({
                currentWeather:description,
                location
            })
        })            
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorMsg:'Help article',
        title:'help',
        author:'Bhai Pote'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        errorMsg:'Page',
        title:'Error Page',
        author:'Bhai Pote'
    })
})

app.listen(3000, ()=>{
    console.log('Server started at port 3000')
})