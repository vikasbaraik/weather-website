const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=105e0bda52a1dd865f635931d82006c7&query='+latitude+','+longitude
    request({url, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weatherAPI service',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            const data=(body.current.weather_descriptions[0] +'. It is currently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out. The humidity is '+body.current.humidity+"%.")
            callback(undefined,data)
        }
    })
}

module.exports=forecast