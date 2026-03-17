const locationName = document.querySelector("#search").value

document.querySelector("#button").addEventListener("click", function(e){
     async function getData(){
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API key}')
        console.log(response)
     }
})

document.querySelector(".display-weather")