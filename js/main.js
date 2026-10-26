const currentTemp = document.querySelector('.current-temp');
const city = document.querySelector('.city')
const searchButton = document.querySelectorAll('.search-img');
const inputElemSearch = [document.querySelector('#search-top'), document.querySelector('#search-right')];


console.log(searchButton);
currentTemp.textContent = '25°';

function chooseCity() {
    inputElemSearch.forEach((inputs) => {
        if (inputs.value.trim() === '') {
            return;
        } else {
            const userValueSearch = inputs.value;
            console.log(userValueSearch);
            city.textContent = userValueSearch; 
        }
    })
}

searchButton.forEach((pics) => {
    pics.addEventListener('click', chooseCity);
})

