document.getElementById("loader").style.display = "none";
document.getElementById("Main").style.display = "block";
//View More/Less Functionality
function viewMore() {
    let refToViewMore = document.getElementById('viewMoreBtn');
    console.log('inside');
    if(refToViewMore.innerText === 'View More'){
        const moreElements = document.querySelectorAll('.more');
        moreElements.forEach(element => {
            element.style.display = 'flex';
        })
        refToViewMore.innerText = 'View Less';
    }
    else {
        const moreElements = document.querySelectorAll('.more');
        moreElements.forEach(element => {
            element.style.display = 'none';
        })
        refToViewMore.innerText = 'View More';
    }
}

//Search Bar Functionality
const key = "7f9f15f992mshda3749cebff6b34p1f5740jsn7e5848b768e0";
const refToSearchBar = document.getElementById("searchBar");
searchCity = () => {
    let searchQuery = refToSearchBar.value;
    if(searchQuery.length >=3){
        const xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                let jsonData = JSON.parse(this.responseText);
                parseResults(jsonData.data.Typeahead_autocomplete.results);
            }
        }
        const apiURL = `https://travel-advisor.p.rapidapi.com/locations/v2/auto-complete?query=${searchQuery}&lang=en_US&units=km`;
        xhr.open("GET",apiURL);
        xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key" , key);
        xhr.send();
    }
    else {
        document.getElementById("searchResult").innerHTML = "";
    }
    parseResults = (data) => {
        let results = "";
        getResults = (item) => {
            if (item.detailsV2 != undefined && item.detailsV2.placeType == "CITY") {
                results = results + `
                <a href="list.html?city=${item.detailsV2.names.name}">${item.detailsV2.names.name}</a>`;
            }
        }
        data.forEach(getResults);
        document.getElementById("searchResult").innerHTML = results;
    }
}
refToSearchBar.addEventListener("input", searchCity);