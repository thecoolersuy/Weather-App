const form = document.querySelector(".weather-data")
const inputName = document.querySelector(".cityName")
const weatherButton = document.querySelector(".getWeather")

const cityName = document.querySelector(".city")
const weather = document.querySelector(".weather")
const info = document.querySelector(".weatherInfo")
const emoji = document.querySelector(".weatheremoji")
const card = document.querySelector(".displayWeatherCard")

const apiKey_weather = "ba7145b1f075417c5b7241a664bf0382";
const apiKey_AQI = "45dfac023f4d364d8b22b246a25a83c76149208d";

form.addEventListener("submit", async function(e){
        e.preventDefault();
        console.log("button clicked")
        const city = inputName.value
        

        if(city){
          try{
                const weatherData = await getWeatherData(city);
                displayWeatherData(weatherData);
          }catch(error){
                console.log(error)
          }
        }else{
                displayError("Please enter  a city")
        }
        
        async function getWeatherData(city){
               const response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey_weather}`)
               if(response.status == 404){
                      console.log( `Couldnot fetch the weather info for ${city}`)
               }
                console.log(response)
                return await response.json();
                
        };
       

        async function displayWeatherData(weatherData){
            const {name: city ,
                main:{temp,humidity},
                weather:[{description, id}] } = weatherData  //Object Destructuring
             
            card.textContent=""
            card.style.display= "flex"
            card.style.flexDirection = "column"
            card.style.gap = "2px"
            card.style.padding = "10px"
            card.style.width = "320px"
            card.style.height= "510px"
            card.style.background = "linear-gradient(180deg , #fe5060, #feac46)"
            card.style.border = "4px solid white"
            card.style.borderRadius = "15px"


           
            const cityDisplay = document.createElement("h1") 
            const tempDisplay = document.createElement("p")
            const humidityDisplay = document.createElement("p")
            const descDisplay = document.createElement("p")
            const emojiDisplay = document.createElement("p")
                
            cityDisplay.innerHTML = city
            cityDisplay.className = "city"
            card.appendChild(cityDisplay)
            
            
            tempDisplay.innerHTML = `${Math.floor((temp - 273.15))}°C`
            tempDisplay.className = "weather"
            card.appendChild(tempDisplay)

            humidityDisplay.innerHTML = `Humidity : ${humidity}`
            humidityDisplay.className = "weather"
            card.appendChild(humidityDisplay)

            descDisplay.innerHTML = `${description}`
            descDisplay.style.fontWeight = "bold"
            descDisplay.className = "weather"
            card.appendChild(descDisplay)

            emojiDisplay.innerHTML = `${displayWeatherEmoji(id)}`
            emojiDisplay.className = "weatheremoji"
            card.appendChild(emojiDisplay)
            



            
       
        };
        function displayWeatherEmoji(id){
            switch(true){
              case (id >= 200 && id < 300):
                return `🌩️`
              case (id>=300 && id<400):
                return `🌦️`
              case (id>=500 && id<600):
                return `🌧️`
              case (id>=600 && id<700):
                return `❄️`
              case (id>800 && id<810):
                return `☁️`
              case (id == 800):
                return `☀️`
              default:
                return `🌤️`
            }
        }
        function displayError(message){
                card.textContent = `${message}`
        }
        
})