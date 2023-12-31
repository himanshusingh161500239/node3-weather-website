const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

// Define path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')


// Setup handlebars engine and views location
app.set('view engine','hbs') // handlebars are used to create dynamic template
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Himanshu'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Himamshu"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:"This is some helpful text",
        title:"Help",
        name:"Himanshu"
    })
})


// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express!!</h1>')
//     // res.send('Hello Express!!')
// })

// app.use(express.static(publicDirectoryPath))
// app.get('/help',(req,res)=>{
//     res.send({
//         name:"Himanshu",
//         age:25
//     })
//     // res.send('Help Page!!')
// })

// app.get('/about',(req,res)=>{
//     res.send("<h2>About page!!</h2>")
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provode as address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            // return console.log(error)
            return res.send({error:error})
        }
        forecast(latitude,longitude, (error, foreCastdata) => {
            if(error){
                // return console.log(error)
                return res.send({error:error})
            }
            return res.send({
                forecast:foreCastdata,
                location,
                address:req.query.address
            })
            })
    })
 
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:'404',
        name:'Himamshu',
        errorMessage:"Help article not found!!"
    })
})

app.get('*',(req,res)=>{
    res.render('404page',{
        title:'404',
        name:'Himamshu',
        errorMessage:"Error 404 page not found!!"
    })
    // res.send("My 404 page")
})

app.listen(3000,()=>{
    console.log("Server is up and running on port 3000.")
})