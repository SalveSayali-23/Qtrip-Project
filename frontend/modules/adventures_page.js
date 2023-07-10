
//import { json } from "stream/consumers";
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search)
 const cityId= params.get("city")
//  console.log(cityId)
 return cityId
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  const res=await fetch(config.backendEndpoint +`/adventures?city=${city}`)
  const data=await res.json()
  console.log(data)
  return data
  }
  catch(e){
    return null
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
 adventures.forEach(({id,category, image, name, costPerHead, duration
  })=>{
    let cardDetail = document.createElement("div")
    cardDetail.className ="col-6 col-lg-3 mb-3 category-con"
    // console.log(cardDetail)
    cardDetail.innerHTML = `
      <a href="detail/?adventure=${id}" id=${id}>
      <div class="category-banner">${category}</div>
      <div class="activity-card">
      
      <img class="card-img-top" src=${image} /> 
      <div class="card-body text-center w-100 px-3 d-md-flex justify-content-between pl-3 pr-3">
      
      <h5 class="card-text" > ${name} </h5>
      <p class="card-text">${costPerHead}</p>
      </div>

     <div class="card-body text-center w-100 px-3 d-md-flex justify-content-between pl-3 pr-3">
     <h5 class="card-text" >Duration </h5>
     <p class="card-text">${duration} hours
     </p>
     </div>

      </div>
     
      </a>
    `
    document.getElementById("data").appendChild(cardDetail)
   }

 )

  } 





//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredAdventureList=list.filter((key)=>key.duration>=low && key.duration<=high)
  return filteredAdventureList
  

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredAdventureList =list.filter((adv)=>categoryList.includes(adv.category))

  return filteredAdventureList

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
 let filteredAdventureList=[]
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
 
  // 1. Filter by duration only
console.log(filters)
  if(filters["duration"].length>0){
    let splitDuration = filters["duration"].split("-")
    filteredAdventureList = filterByDuration(list, parseInt(splitDuration[0]), 
    parseInt(splitDuration[1]))
  }
  
  // 2. Filter by category only
  else if(filters["category"].length>0){
    filteredAdventureList = filterByCategory(list, filters["category"])
  }
//   // 3. Filter by duration and category together
else if(filters["duration"].length>0 && filters["category"].length>0 ){
  let splitDuration = filters["duration"].split("-")
    filteredAdventureList = filterByDuration(list, parseInt(splitDuration[0]), 
    parseInt(splitDuration[1]))

    filteredAdventureList = filterByCategory( filteredAdventureList, filters["category"])

}


else{
  
   filteredAdventureList=list
}
 return filteredAdventureList

  // Place holder for functionality to work in the Stubs

 //return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  return JSON.parse(localStorage.getItem("filters"))
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value=filters.duration
  filters["category"].forEach((ele)=>{
    let pillElement=document.createElement("div")
    pillElement.className="category-filter"
    pillElement.innerHTML=`
    <div>${ele}</div>
    
    `
    //console.log(pillElement)
document.getElementById("category-list").appendChild(pillElement)

  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
