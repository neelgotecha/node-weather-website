const request = require('request')

const getCoordinates = function(address, callBack){
    const geoAPIKey = 'pk.eyJ1IjoibmVlbGdvdGVjaGEiLCJhIjoiY2tqa3ZmaDdxMjRkNjJ5cGdudmV4MmFqcCJ9._C3a3ItYJp1T48j7NdOC9Q'
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+'.json?access_token=' + geoAPIKey+'&limit=1'
    request({url, json:true}, function(error,{body}){
        if(error){
            callBack('Unable to connect to location services')
        }else if(!body.features || body.features.length===0){
            callBack("Unable to find location, try another search")
        }else{
            const data = {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            }
            callBack(error,data) 
        }       
    }) 
}

module.exports = {
    getCoordinates: getCoordinates
}