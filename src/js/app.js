import "../css/app.scss";
//Api source : https://openweathermap.org/
import villesFrance from '../data/villes_france.js';

let server = "https://warm-peak-43536.herokuapp.com";
// let server = "http://127.0.0.1:3000" //For local testing
let city_input = document.querySelector('#city_input');
let match = document.querySelector('.mainContent__autocomplete');
let city_submit = document.querySelector('#city_submit');
let weatherResult = document.querySelector('.weatherResult');
let weatherLoading = document.querySelector('.weatherLoading');

const getWeather = function(e){
    document.querySelector('.mainContent__autocomplete').classList.remove('mainContent__autocomplete--active');

    e.stopPropagation();

    const responseBuilder = function(key, value){
        let div = document.querySelector('.weatherResult div');
        let p = document.createElement('p');
        let span = document.createElement('span');
        
        p.innerHTML = key;
        span.innerHTML = value;
        p.appendChild(span);
        div.appendChild(p);
        weatherResult.appendChild(div);
    }
    
    if(city_input.value == ""){
        alert('Entrez une ville')
    }else{
        weatherLoading.classList.add('loader');
    fetch(`${server}/api/search?q=${city_input.value}`)
    .then(response => response.json()) 
    .then(json => {
        weatherLoading.classList.remove('loader')
        if(weatherResult.children){weatherResult.innerHTML = ""}
        let div = document.createElement('div');
        weatherResult.appendChild(div);

        if(json.results.message !== "city not found"){
            let cityName = document.createElement('p');
            cityName.innerHTML = `Météo de ${json.results.name}`;
            weatherResult.insertBefore(cityName,weatherResult.firstChild);
            responseBuilder("Temps : ",json.results.weather[0].description[0].toUpperCase() + json.results.weather[0].description.substring(1));
            responseBuilder("Température actuelle : ",`${json.results.main.temp} C°`);
            responseBuilder("Température min - max  : ",`${json.results.main.temp_min} - ${json.results.main.temp_max} C°`);
            responseBuilder("Taux d'humidité : ",`${json.results.main.humidity} %`);
            responseBuilder("Vent : ",`${json.results.wind.speed} km/h`);
        }else{
            responseBuilder("Oups : ","Je n'ai pas de météo pour cette ville");
            responseBuilder("Essayez une grande ville proche !","");
        }
    });
    }
}

city_submit.addEventListener("click", getWeather);
city_submit.addEventListener("touchenter", getWeather);
document.addEventListener("keydown", function(e){
    if (e.code == 'Enter'){
        getWeather(e);
    }
})


///////ATOCOMPLETE FUNCTION///////


const autoComplete = function(e){
    let match = document.querySelector('.mainContent__autocomplete');
    match.classList.add('mainContent__autocomplete--active');

    let input = e.target.value.toUpperCase();
    let matchingCity = [];

    for(let i = 0; i < villesFrance.length; i++){
        if(input !== "" && villesFrance[i].nom.startsWith(input)){
            matchingCity.push({codep:villesFrance[i].codep, ville:villesFrance[i].nom})
        }else if(input !== "" && String(villesFrance[i].codep).startsWith(input)){
            matchingCity.push({codep:villesFrance[i].codep, ville:villesFrance[i].nom})
        }else if(input == ""){
            match.classList.remove('mainContent__autocomplete--active');
        }        
    }
    matchingCity.sort((a, b) =>{
        if (a.ville < b.ville) return -1;
        if (a.ville > b.ville) return 1;
        return 0
    });
    matchBuilder(matchingCity)
};

const matchBuilder = function(matchingCity){
    if(match.children){match.innerHTML = ""}
    for(let i=0;i<4;i++){
        let li = document.createElement('li')
        if(matchingCity[i] != undefined){
        li.innerHTML = matchingCity[i].codep + " - " + matchingCity[i].ville;
        match.appendChild(li);
        li.addEventListener('click',function(e){
            let clickedMatch = e.target.innerHTML.split(" - ");
            city_input.value = clickedMatch[1];
            match.classList.remove('mainContent__autocomplete--active');
            match.innerHTML = ""
        })
       }
    }
}


//fonction abandonnée
const autoCompleteFETCH = function(e){
    
    let match = document.querySelector('.mainContent__autocomplete');
    if(match.children){match.innerHTML = ""}
    match.classList.add('mainContent__autocomplete--active');
    try {
        fetch(`http://127.0.0.1:3000/api/city?q=${city_input.value}`)
        .then(response => response.json()) 
        .then(json => {
            console.log(json)
        });
    } catch (err) {
        console.log("Erreur : la ville n'a pas été trouvée");
    }

    };

city_input.addEventListener("input", autoComplete);


// let villesFrance = [{
//     "nom": "MAROLLES SOUS LIGNIERES",
//     "codep": 10130,
//     "gps": "48.0520003827, 3.93246550297"
// },
// {
//     "nom": "LES GRANDES CHAPELLES",
//     "codep": 10170,
//     "gps": "48.4916267047, 3.93350100384"}
// ];