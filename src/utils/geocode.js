const request=require('request')

const geocode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiaGltYW5zaHUyMzkiLCJhIjoiY2t3YWludmwyMHloaTJ1czNhenYyam8xZyJ9.w0RreZc9K-lfSBsMqHbfcA&limit=1"
    //when location contains some special characters that mean something in terms of url, encodeURIComponent() will convert it into valid character
    request({url,json:true},(error,{body}=response)=>{
        if(error){
            callback('Unable to connect to location services!!',undefined)
        }
        else if(body.features.length===0){
            callback('Unable to find location. Try another search',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode