var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

if (dd < 10) {
   dd = '0' + dd;
}

if (mm < 10) {
   mm = '0' + mm;
} 
    
today = yyyy + '-' + mm + '-' + dd;
document.querySelector("#fromDate").setAttribute("min",today);//setting min date to current date
function computeTotal() {
    let bookingName = document.getElementById("bookingName").value;
    let noOfAdults = document.getElementById("noOfAdults").value;
    let refToFrom = document.getElementById("fromDate");
    let fromDate = new Date(refToFrom.value);
    let refToId = document.getElementById("id");//invisible number box to send id value to next page
    refToId.value = id;
    var fd = fromDate.getDate() + 1;//refers to next day
    var fm = fromDate.getMonth() + 1;//January is 0
    var fy = fromDate.getFullYear();
    if (fd < 10) {
        fd = '0' + fd;
     }
     
     if (mm < 10) {
        fm = '0' + fm;
     } 
     minDate = fy + '-' + fm + '-' + fd;
     document.querySelector("#toDate").setAttribute("min",minDate);//setting attribute of checkout date to min one day after checkin date
    let refToTo = document.getElementById("toDate");
    let toDate = new Date(refToTo.value);
    let refToTotal = document.getElementById("totalPrice");
    let diffInTime = toDate.getTime() - fromDate.getTime();
    let totalPrice= noOfAdults*1000*diffInTime/(1000 * 3600 * 24);//converting time from seconds to days
    if(totalPrice > 0){
        refToTotal.value = 'Rs. '+ totalPrice;
    }
}
//api request
const url = window.location.search;
const urlParams = new URLSearchParams(url);
const id = urlParams.get("id");
const key = "7f9f15f992mshda3749cebff6b34p1f5740jsn7e5848b768e0";
getHotelDetails = () => {//to get hotel details
   const xhr = new XMLHttpRequest();
   const apiURL = `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${id}&checkin=2022-03-15&adults=1&lang=en_US&currency=USD&nights=2`;
   xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {//check if positive reply is received
        var jsonData = JSON.parse(this.responseText);
        document.getElementById("loader").style.display = "none";//display loader while waiting for page to load
        document.getElementById("Main").style.display = "block";
      //   console.log(jsonData.data);
        parseHotelDetails(jsonData.data);//sending to another function to parse and populate details
      }
   };
   xhr.open("GET",apiURL);
   xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
   xhr.setRequestHeader("x-rapidapi-key" , key);
   xhr.send();
}
getHotelImages = () => {
   const xhr = new XMLHttpRequest();
   const apiURL = `https://travel-advisor.p.rapidapi.com/photos/list?location_id=${id}&currency=USD&limit=50&lang=en_US`;
   xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var jsonData = JSON.parse(this.responseText);
      //   console.log(jsonData.data);
        parseHotelImages(jsonData.data);
      }
   };
   xhr.open("GET",apiURL);
   xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
   xhr.setRequestHeader("x-rapidapi-key" , key);
   xhr.send();
}
getHotelDetails();
getHotelImages();

parseHotelImages = data => {//set hotel images in carousel
   let carouselContent = "";
   let isActive = "active";
   getImages = (item) => {
      const image = item.images.large.url;
      carouselContent = carouselContent + `
      <div class="carousel-item ${isActive}">
        <img
          src=${image}
          class="align-items-center reSize"
          alt="..."
        />
      </div>`
      isActive = "";
   }
   data.forEach(getImages);
   
   const refToCarousel = document.getElementById("carouselDiv");
   refToCarousel.innerHTML = carouselContent;
}

parseHotelDetails = (data) => {//setting hotel details on page
   const name = data[0].name;
   const rating = data[0].rating;
   const description = data[0].description;
   const amenities = data[0].amenities;

   printRating(rating);
   const refToHotelName = document.getElementById("hotelName");
   refToHotelName.innerHTML = name;
   const refToAmenities  = document.getElementById("hotelAmenities");
   //Constructing an unordered list from data
   let listData = "";
   for(i = 0 ; i < 10 ; i++) {
      listData = listData + `<li>${amenities[i].name}</li>`;
   }
   refToAmenities.innerHTML = listData;

   const refToDescription = document.getElementById("hotelDescription");
   refToDescription.innerHTML = description;
}

printRating = (rating) => {//print rating as stars based on numerical value
   let ratingNum = parseInt(rating);
   let ratingString = "";
   let i = 0;
   // var isPositive = true;
   const refToRating = document.getElementById("starRating");
   for(i = 0 ; i < ratingNum ; i++) {
      ratingString = ratingString + `<i class="fa-solid fa-star fill"></i>`;
   }
   if(rating.length > 1 && rating[2] != "0") {
      // isPositive = false;
      ratingString = ratingString + `<i class="fa-solid fa-star-half-stroke fill"></i>`;
      i++;
   }
   for(let j = i ; j < 5 ; j++) {
      ratingString = ratingString + `<i class="fa-solid fa-star"></i>`;
   }
   refToRating.innerHTML = ratingString;
}