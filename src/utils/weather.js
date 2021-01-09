const request = require('request')

const getWeather = function(lat, lon, callBack){
    console.log(lat)
    console.log(lon)
    const apiKey = '1a53c170d255b257452ffa3d62b53271'
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid='+apiKey
    request({url, json:true},function(error,{body}){
        if(error){
            console.log('Connection to API was unsuccessful')
        }else if(!body.weather){
            callBack('No location found')
        }else{
            callBack(undefined,body.weather[0])
        }
        
    })
}

module.exports = {getWeather:getWeather}