const request=require('request')
const forecast=(latitude,longitude,callback) =>{
const url='http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=fc9914b0e5671e88ffeb1d156906c5fc'
request({url,json:true},(error,{body})=>{
if(error){
callback('Unable to connect to weather service',undefined)
}
else if(body.error){
callback('Unable to find location',undefined)
}
else{
callback(undefined,'It is '+body.weather[0].description+' there')
}
})
}
module.exports=forecast