pay();
//sets functionality of pay now button based on login status
function pay() {
    if (localStorage.isLogin === "true") {
        document.querySelector("#bookButton").removeAttribute("disabled");
    }
    else {
        document.querySelector("#bookButton").setAttribute("disabled",0);
    }
}
const urlParams = new URLSearchParams(window.location.search);
const hotelId = urlParams.get("id");
const key = "7f9f15f992mshda3749cebff6b34p1f5740jsn7e5848b768e0";
const xhr = new XMLHttpRequest();
const apiURL = `https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id=${hotelId}&checkin=2022-03-15&adults=1&lang=en_US&currency=USD&nights=2`;
getHotelDetails = () => {
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var jsonData = JSON.parse(this.responseText);
          document.getElementById("loader").style.display = "none";
          document.getElementById("Main").style.display = "block";
          setHotelDetails(jsonData.data);
        }
     };
     xhr.open("GET",apiURL);
     xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
     xhr.setRequestHeader("x-rapidapi-key" , key);
     xhr.send();
}
getHotelDetails();
setHotelDetails = (data) => {
    const name = data[0].name;
    const address = data[0].address;
    const ranking = data[0].ranking;
    const imageUrl = data[0].photo.images.large.url;

    const refToImg = document.getElementById("imageHotel");
    refToImg.setAttribute("src", imageUrl);

    const refToName = document.getElementById("hotelName");
    refToName.innerHTML = name;

    const refToRanking = document.getElementById("ranking");
    refToRanking.innerHTML = ranking;

    const refToAddress = document.getElementById("address");
    refToAddress.innerHTML = address;
}
setBookingDetails = (data) => {//setting details of booking on page based on url parameters
    const name = urlParams.get("name");
    const adults = urlParams.get("adult");
    const stringFromDate = urlParams.get("fromDate");
    const stringToDate = urlParams.get("toDate");
    const fromDateArr = stringFromDate.split("-");
    const toDateArr = stringToDate.split("-");
    const fromDate = new Date(stringFromDate);
    const toDate = new Date(stringToDate);
    const noOfDays = (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24);
    const total = 1000 * noOfDays * parseInt(adults);

    const refToName = document.getElementById("customerName");
    refToName.innerHTML = `<strong>Name: </strong>${name}`;

    const refToAdults = document.getElementById("adults");
    refToAdults.innerHTML = `<strong>Number of Adults: </strong>${adults}`;

    const refToFromDate = document.getElementById("checkIn");
    refToFromDate.innerHTML = `<strong>Check-in Date: </strong>${fromDateArr[2]}/${fromDateArr[1]}/${fromDateArr[0]}`;

    const refToToDate = document.getElementById("checkOut");
    refToToDate.innerHTML = `<strong>Check-out Date: </strong>${toDateArr[2]}/${toDateArr[1]}/${toDateArr[0]}`;

    const refToTarrifBreakdown = document.getElementById("tariffBreakdown");
    refToTarrifBreakdown.innerHTML = `<strong>Tariff Breakdown: </strong>Rs.1000 x ${adults} Adults x ${noOfDays} Nights`;

    const refToTotalAmount = document.getElementById("totalAmount");
    refToTotalAmount.innerHTML = `<strong>Total Amount: </strong>Rs.${total}`;
}
setBookingDetails();