const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app= express()
const port=process.env.PORT || 3000

//Define paths for expres config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Vikas Baraik'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Vikas Baraik'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'We can create wonderful webapps',
        title: 'Help',
        name: 'Vikas Baraik'
    })
})

app.get('/weather',(req,res)=>{
    const address=req.query.address
    if(!address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })

    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message: 'Help article not found',
        title: '404',
        name: 'Vikas Baraik'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        message: 'Page not found',
        title: '404',
        name: 'Vikas Baraik'
    })
})

app.listen(port,()=>{
    console.log('Server is up on '+port+'.')
})