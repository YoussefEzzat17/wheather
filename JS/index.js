var searchInput = document.getElementById('searchInput')
var weatherData ;
// https://api.weatherapi.com/v1/forecast.json?key=ab665c02dc384b38902150930242803&q=london&days=3
async function getData(key){
    var response = await fetch(` https://api.weatherapi.com/v1/forecast.json?key=ab665c02dc384b38902150930242803&q=${key}&days=3`)
    var finaldata = await response.json()
    return finaldata
}





async function startApp(key){
    weatherData = await getData(key);
    todayData()
    tommorwData()
    afterTomData()
}


function todayData(){
    let date = new Date(weatherData.location.localtime)
     
    document.getElementById('day').innerHTML = date.toLocaleDateString('en-US',{weekday:'long'})
    document.getElementById('Month').innerHTML = date.toLocaleDateString('en-US',{month:'short'})
    document.getElementById('date').innerHTML = date.getDate()
    document.getElementById('city').innerHTML= weatherData.location.name
    document.getElementById('degree').innerHTML = weatherData.current.temp_c+'°C'
    document.getElementById('weatherCondition').innerHTML = weatherData.current.condition.text
    document.getElementById('humidity').innerHTML = weatherData.current.wind_mph+'%'
    document.getElementById('winds').innerHTML = weatherData.current.wind_kph+'km/h'
    document.getElementById('weatherTrend').innerHTML=weatherData.current.wind_dir
    document.getElementById('todayImg').setAttribute('src','https:'+weatherData.current.condition.icon)
}
function tommorwData(){
    let date = new Date(weatherData.forecast.forecastday[1].date)

    document.getElementById('tommorowday').innerHTML = date.toLocaleDateString('en-US',{weekday:'long'})
    document.getElementById('maxTemperature').innerHTML = weatherData.forecast.forecastday[1].day.maxtemp_c+'°C'
    document.getElementById('minTemperature').innerHTML = weatherData.forecast.forecastday[1].day.mintemp_c+'°C'
    document.querySelector('.degree .forecast-icon  img').setAttribute('src','https:'+weatherData.forecast.forecastday[1].day.condition.icon)
    document.querySelector('.tomorrow .forecast-body .weatherCondition').innerHTML=weatherData.forecast.forecastday[1].day.condition.text
}
function afterTomData(){
    document.getElementById('AftertomorrowmaxTemperature').innerHTML = weatherData.forecast.forecastday[2].day.maxtemp_c+'°C'
    document.getElementById('AftertomorrowminTemperature').innerHTML = weatherData.forecast.forecastday[2].day.mintemp_c+'°C'
    document.getElementById('afterimage').setAttribute('src','https:'+weatherData.forecast.forecastday[2].day.condition.icon)
    document.getElementById('AftertomorrowweatherCondition').innerHTML=weatherData.forecast.forecastday[2].day.condition.text
}

searchInput.addEventListener('keyup',function(){
    startApp(searchInput.value)
})