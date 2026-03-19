const form = document.querySelector(".weather-data")
const inputName = document.querySelector(".cityName")
const weatherButton = document.querySelector(".getWeather")

const cityName = document.querySelector(".city")
const weather = document.querySelector(".weather")
const info = document.querySelector(".weatherInfo")
const emoji = document.querySelector(".weatheremoji")
const card = document.querySelector(".displayWeatherCard")
const aqiCard= document.querySelector(".displayAQICard")

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
            card.style.alignItems = "center"
            card.style.gap = "10px"
            card.style.padding = "10px"
            card.style.width = "320px"
            card.style.height= "510px"
            card.style.backgroundColor = `${changeBackgroundCard(id)}`
            card.style.border = "1px white"
            card.style.borderRadius = "12px"
            card.style.boxShadow = "0px 4px 15px rgba(0,0,0,0.1)"


           
            const cityDisplay = document.createElement("h1") 
            const tempDisplay = document.createElement("p")
            const humidityDisplay = document.createElement("p")
            const descDisplay = document.createElement("p")
            const emojiDisplay = document.createElement("img")
                
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

            emojiDisplay.src = `${displayWeatherEmoji(id)}`
            emojiDisplay.alt = "image is only in the hosts computer so it wont display here"
            emojiDisplay.width = 110
            emojiDisplay.height = 110
            card.appendChild(emojiDisplay)
            



            
       
        };
        function displayWeatherEmoji(id){
          console.log("displayed")
            switch(true){
              case (id >= 200 && id < 300):
                return `WeatherIcons/thunderstorm200-300.png`
              case (id>=300 && id<400):
                return `WeatherIcons/drizzle300-400.png`
              case (id>=500 && id<600):
                return `WeatherIcons/rain500-600.png`
              case (id>=600 && id<700):
                return `WeatherIcons/snowflake600-700.png`
              case (id>=700 && id<800):
                return `WeatherIcons/wind700-800.png`
              case (id == 800):
                return `WeatherIcons/sun-800.png`
              case (id>800 && id<900):
                return `WeatherIcons/cloud800-900.png`
              default:
                return ``
            }
        }

        function changeBackgroundCard(id){
           switch(true){
              case (id >= 200 && id < 300):
                return `#c13d52`
              case (id>=300 && id<400):
                return `#ac526c`
              case (id>=500 && id<600):
                return `#23a3b0`
              case (id>=600 && id<700):
                return `#55787c`
              case (id>=700 && id<800):
                return `#88a660`
              case (id == 800):
                return `#ec6640`
              case (id>800 && id<900):
                return `#ecc951`
              default:
                return `#6a4a3d`
            }
        }
        function displayError(message){
                card.textContent = `${message}`
        }
        
})

form.addEventListener("submit", async (e) =>{
     e.preventDefault()
     const city = inputName.value

     if(city){
       try{
          const AQI = await getAQI(city);
          displayAQI(AQI)
          

       }catch(error){
        console.log(error);
       }
     }
     async function getAQI(city){
            const response = await fetch(`https://api.waqi.info/feed/${city}/?token=${apiKey_AQI}`)
            console.log(response);
            const AQIdata = await response.json();
            console.log(AQIdata)
            return AQIdata;
     }
     
   

     async function displayAQI(AQI){
          if(AQI.status == 'ok'){
              const {data:{aqi, city:{ name },dominentpol}} = AQI
              console.log(aqi)
              console.log(dominentpol)
              
              
              const displayAQIHeader = document.createElement("h1")
              const displayEmotion = document.createElement("img")
              const displayCity = document.createElement("p")
              const displayAQI = document.createElement("p")
              const displayPM = document.createElement("p")
              const displayStatus = document.createElement("p")
                   
              
              aqiCard.textContent = ""
              aqiCard.style.display = "flex"
              aqiCard.style.flexDirection = "column"
              aqiCard.style.alignItems = "center"
              aqiCard.style.padding = "20px"
              aqiCard.style.gap = "18px"
              aqiCard.style.backgroundColor = "#ffffff"
              aqiCard.style.width = "230px"
              aqiCard.style.height = "350px"
              aqiCard.style.borderRadius = "10px"
              aqiCard.style.boxShadow = "0px 4px 15px rgba(0,0,0,0.1)"

              const indicators = document.createElement("div")
              indicators.className = "indicatorValues"
              

              displayAQIHeader.textContent = "Air Quality Index (AQI)"
              displayAQIHeader.className = "area"
              displayAQIHeader.style.margin = "0px"

              displayEmotion.src= `${displayAQIEmotion(aqi)}`
              displayEmotion.alt = "image is only in the hosts computer so it wont display here"
              displayEmotion.width = 100
              displayEmotion.height = 100
              displayEmotion.style.borderRadius = "10px"
              

               displayCity.textContent = `${city}`
               displayCity.className = "area"
               displayCity.style.margin = "0px"

               displayAQI.textContent = `${aqi}`
               displayAQI.style.color = `${displayAQITextColor(aqi)}`
               displayAQI.style.fontWeight = "600"
               displayAQI.className = "aqiValue"
               displayAQI.style.margin = "0px"

               displayStatus.textContent = `${showStatus(aqi)}`
               displayStatus.style.color = `${displayAQITextColor(aqi)}`
               displayAQI.style.fontWeight = "bold"
               displayStatus.className = "aqiInfo"
               displayStatus.style.margin = "0px"

               displayPM.textContent = `pollutant : ${dominentpol}`
               displayPM.className = "aqiStatus"
               displayPM.style.margin = "0px"

              aqiCard.appendChild(displayAQIHeader)
              aqiCard.appendChild(displayEmotion)
              aqiCard.appendChild(displayCity)
              const infoDisplay = aqiCard.appendChild(indicators)
              infoDisplay.appendChild(displayAQI)
              infoDisplay.appendChild(displayStatus)
              aqiCard.appendChild(displayPM)
               
          }else{
               displayError("Cannot fetch AQI of this location")
          }
                   
     }

     function displayError(message){
         aqiCard.textContent = `${message}`
     }



     function displayAQIEmotion(aqi){
          switch(true){
               case (aqi >= 0 && aqi <= 50 ):
                  return "AQIemotions/0-50good.jpg";
               case (aqi >= 51 && aqi <=100 ):
                  return "AQIemotions/51-100moderate.jpg";
               case (aqi >= 101 && aqi <= 150 ):
                  return "AQIemotions/101-150Unhealthyforsensitivegroups.jpg";
               case (aqi >= 151 && aqi <=200 ):
                  return "AQIemotions/151-200Unhealthy.jpg";
               case (aqi >= 201 && aqi <= 300 ):
                  return "AQIemotions/201-300veryunhealthy.jpg";
               case (aqi >= 301):
                  return "AQIemotions/301-500hazardous.jpg";
               default:
                    return "aqi cannot be detected"
          }
     }

     function  showStatus(aqi){
          switch(true){
               case(0 <= aqi && aqi<=50):
                    return `• Good`
               case(51 <= aqi && aqi <=100):
                    return `• Moderate`
               case(101<= aqi && aqi<=150):
                    return `• Unhealthy for sensitive groups`
               case(151 <= aqi && aqi<=200):
                    return `• Unhealthy`
               case(201 <= aqi && aqi<=300):
                    return `• Very Unhealthy`
               case(301 <= aqi):
                    return `• Hazardous`
               default:
                    return `• unrecognized`
          }
     }
     function displayAQITextColor(aqi){
           switch(true){
               case(0 <= aqi && aqi<=50):
                    return `#64d49c`
               case(51 <= aqi && aqi <=100):
                    return `#edce35`
               case(101<= aqi && aqi<=150):
                    return `#efb42c`
               case(151 <= aqi && aqi<=200):
                    return `#ef8924`
               case(201 <= aqi && aqi<=300):
                    return `#ef5e1b`
               case(301 <= aqi):
                    return `#ef3711`
               default:
                    return `white`
          }
     }
})