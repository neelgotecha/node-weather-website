const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = searchElement.value
    const fetchUrl = 'http://localhost:3000/weather?address=' + location
    message1.textContent='Loading...'
    message2.textContent=''
    fetch(fetchUrl).then((response)=>{
    response.json().then((data)=>{
        if(data.error) { 
            message1.textContent=data.error
            message2.textContent=''
            return
        }
        message1.textContent = data.currentWeather
        console.log(data.currentWeather)
        message2.textContent = data.location
        console.log(data.location)
         })
    })
    console.log(location)
})