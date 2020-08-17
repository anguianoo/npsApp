'use strict';


const Key = 'LVjb75ZIFT2Kotn4sAb6ii33QPib98EFnGjVKYE2';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}
function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    // iterate through the items array
    for (let i = 0; i < responseJson.data.length; i++){
        // for each video object in the items
        //array, add a list item to the results
        //list with the video title, description,
        //and thumbnail
        $('#results-list').append(
            `<li>
                <h3>${responseJson.data[i].name}</h3>
                <img src='${responseJson.data[i].images[0].url}'>
                <p>${responseJson.data[i].description}</p>
                <a href="${responseJson.data[i].url}" target="_blank" >Website: ${responseJson.data[i].url}</a>
      
            </li>`
        )};
    //display the results section
    $('#results').removeClass('hidden');
    console.log(responseJson.data.description);
};

function getNpsResults(query, limit=10){
    const params = {
       api_key : Key,
       stateCode: query,
        limit,
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);
    





    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-states').val();
        const maxResults = $('#js-max-results').val();
        getNpsResults(searchTerm, maxResults);
    });
}

watchForm();