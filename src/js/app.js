console.log("le js fonctionne");

let city_input = document.querySelector('#city_input');
let city_submit = document.querySelector('#city_submit');
let weatherResult = document.querySelector('.weatherResult')


const getWeather = function(e){
    e.stopPropagation();

    const responseBuilder = function(key, value){
            if(key !== 'forecast'){
                let p = document.createElement('p')
                let span = document.createElement('span')

                p.innerHTML = key + " : ";
                span.innerHTML = value;
                p.appendChild(span);
                weatherResult.appendChild(p)
        }
    }
    if(city_input.value == ""){
        alert('Entrez une ville ou un code postal')
    }else{
    fetch(`https://goweather.herokuapp.com/weather/${city_input.value}`)
    .then(response => response.json()) 
    .then(json => {
        console.log(json);
        if(weatherResult.children){weatherResult.innerHTML = ""}
        Object.entries(json).forEach(([key, value]) => {
            responseBuilder(key,value);
        });
    });

    }
}


city_submit.addEventListener("click", getWeather);


///////ATOCOMPLETE FUNCTION///////
//https://www.w3schools.com/howto/howto_js_autocomplete.asp
const autoComplete = function(e){
    // console.log(e.target.value);
};
city_input.addEventListener("input", autoComplete);

let villesFrance = "default";

const fetchVilles = async function(){
    fetch("./src/data/villes_sample.json")
    .then(response => response.json()) 
    .then(json => {
        // console.log(json);
        // Object.entries(json).forEach(([key, value]) => {
        //     console.log(`${key} ${value}`);
        // });
    });
}

// villesFrance = fetchVilles();
    
// Object.entries(villesFrance).forEach(([key, value]) => {
//     console.log(`${key} ${value}`);
// });
