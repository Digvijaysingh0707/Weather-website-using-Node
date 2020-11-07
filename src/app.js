const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const { title } = require('process')
const app=express()
const port=process.env.PORT||3000

//Define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Digvijay Singh'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Digvijay Singh'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is a help page',
        title:'Help',
        name:'Digvijay Singh'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })

    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
   
})
app.get('/products',(req,res)=>{
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('My_404',{
        title:'404',
        name:'Digvijay Singh',
        errorMessage:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('My_404',{
        title:'404',
        name:'Digvijay Singh',
        errorMessage:'Page not found'
    })
})


app.listen(port,()=>{
    console.log('Server is up')
})