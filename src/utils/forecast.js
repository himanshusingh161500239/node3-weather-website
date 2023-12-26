const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=4a07f2392566605d805a9de12608b345&query="+latitude+","+longitude
    request({url,json:true},(error,{body}=response)=>{
        if(error){
            callback('Unable to connect to weather service!!',undefined)
        }
        else if(body.error){
            callback("Unable to find location",undefined)
        } 
        else{
            callback(undefined,body.current.weather_descriptions+`. It's currently ${body.current.temperature} degree out. It's feel like ${body.current.feelslike} degree out there.`)
        }
    })
}

module.exports=forecast