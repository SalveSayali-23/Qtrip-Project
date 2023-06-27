import config from "../conf/index.js";

async function init() {
  console.log("from init()"); 
  console.log(config)
  //Fetches list of all cities along with their images and description
  
  let cities = await fetchCities();
//Updates the DOM with the cities

  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
 
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
try{
  const res=await fetch(config.backendEndpoint +"/cities")
  const data=await res.json()
  console.log(data)
  return data
}
catch(error){
  return null
}
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  const data=document.querySelector("#data")
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
 let card = document.createElement("div")
 card.id=id
 card.className = "col-6 col-lg-3 mb-3"
 card.innerHTML=`
 <a href="pages/adventures/?city=${id}" >
<div class="tile">
<div class="tile-text text-center">
    <h5>${city}</h5>
    <P>${description}</P>
</div>
  <img src=${image} class="img-fluid"/>
 </div> 
</a>`
 
data.append(card)

}

export { init, fetchCities, addCityToDOM };
