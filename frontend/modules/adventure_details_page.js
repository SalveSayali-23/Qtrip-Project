import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search)
  const advId= params.get("adventure")
   //console.log(advId)
  return advId

  // Place holder for functionality to work in the Stubs
 // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
  const response =await fetch(config.backendEndpoint +`/adventures/detail/?adventure=${adventureId}`)
  const advData = await response.json()
  console.log(advData)
  return advData
  }
  catch(e){
    return null
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML=adventure.name
 // console.log(adventure.name)
 document.getElementById("adventure-subtitle").innerHTML=adventure.subtitle
 adventure.images.map((img)=>{
  let imageElement = document.createElement("div")
 
  imageElement.innerHTML=`<img src="${img}" class="activity-card-image pb-3 pb-md-0"/>`
  document.getElementById("photo-gallery").appendChild(imageElement)
})

 document.getElementById("adventure-content").innerHTML = adventure.content
 
 

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML=`
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
  
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `
   // <div class="carousel-item active">
  // <img src="..." class="d-block w-100" alt="...">
  // </div>
  images.forEach((img,idx)=>{
    let imageElement = document.createElement("div")
    //imageElement.className="col-lg-12"
    if(idx===0){
      imageElement.classList.add("carousel-item","active")
    }else{
      imageElement.classList.add( "carousel-item")
      console.log(imageElement)
    }
    //imageElement.classList.add( "carousel-item","col-lg-12",)
  imageElement.innerHTML=`<img src="${img}"  alt="..."
   class="activity-card-image pb-3 pb-md-0"/>`
  console.log(imageElement)
  //document.getElementById("photo-gallery").append(imageElement)
  document.querySelector(".carousel-inner").appendChild(imageElement)

  })
  //document.getElementById("photo-gallery").appendChild(imageElement)
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  if(adventure.available==true) {
    //console.log(adventure.available)
    // hide the "reservation-panel-sold-out" panel
    document.getElementById("reservation-panel-sold-out").style.display="none"
    //show reservation-panel-available panel
    document.getElementById("reservation-panel-available").style.display="block"
    
    document.getElementById("reservation-person-cost").innerHTML=adventure.costPerHead
    }
    else{
      document.getElementById("reservation-panel-available").style.display="none" 
      document.getElementById("reservation-panel-sold-out").style.display="block"
    }
    //console.log(adventure.available)
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  document.getElementById("reservation-cost").innerHTML= adventure.costPerHead * persons

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  const formElement = document.getElementById("myForm")
  formElement.addEventListener("submit",async (event)=>{
    event.preventDefault()
    //console.log(formElement)
    let url=config.backendEndpoint +"/reservations/new"
    
    let formDataJsonString=JSON.stringify({
      name:formElement.elements["name"].value,
      date:formElement.elements["date"].value,
      person:formElement.elements["person"].value,
      adventure:adventure.id,
    })
    console.log(formDataJsonString)
    // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
    let fetchOptions = {
      //HTTP method set to POST.
      method: "POST",
      //Set the headers that specify you're sending a JSON body request and accepting JSON response
      headers: {
        "Content-Type": "application/json",
        //Accept: "application/json",
      },
      // POST request body as JSON string.
      body: formDataJsonString,
    }
   try{ 
    let res=await fetch(url, fetchOptions)
    if(res.ok){
      alert("Success!")
      window.location.reload()
    }else{
      alert("Failed!")
    }
  }
    catch(error){
      console.log(error)
      alert("Failed - fetch call resulted in an error")
    }
  })
  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

  if(adventure.reserved==true){
    document.getElementById("reserved-banner").style.display="block"
  }else{
    document.getElementById("reserved-banner").style.display="none"
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
