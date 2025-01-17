document.getElementById('predictorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting and reloading the page

    console.log("Inside func");
  
    // Get values from the form
    const submitButton = document.querySelector('button[type="submit"]');
    const rank = document.getElementById('rank').value;
    const location = document.getElementById('location').value;
    
    submitButton.disabled = true;
    submitButton.innerText = "Processing...";
    // Call the predictColleges function with the inputs
    let result = predictColleges(rank, location, colleges);

    // Display the predicted colleges in the result div
    let resultDiv = document.getElementById('result');
    if (result.length === 0) {
        resultDiv.innerHTML = "No colleges found for the given criteria.";
    } else {
        let resultList = result.map(college => `<li>${college.name} - ${college.location} (Min Rank: ${college.minRank})</li>`).join('');
        resultDiv.innerHTML = `<ul>${resultList}</ul>`;
    }
    // console.log(result);
    submitButton.disabled = false;
    submitButton.innerText = "Predict College";
});

// Function to predict colleges based on rank and location

function predictColleges(rank, preferredLocation, colleges) {
    // Filter colleges based on rank
    let eligibleColleges = colleges.filter(college => rank <= college.minRank);
    
    // Split colleges based on location preference
    let matchingLocation = eligibleColleges.filter(college => college.location === preferredLocation);
    let nonMatchingLocation = eligibleColleges.filter(college => college.location !== preferredLocation);
    
    // Sort both arrays by minRank (ascending order)
    matchingLocation.sort((a, b) => a.minRank - b.minRank);
    nonMatchingLocation.sort((a, b) => a.minRank - b.minRank);
    
    // Combine the results: matching location first, followed by non-matching location
    return [...matchingLocation, ...nonMatchingLocation];
}

// Example college data
const colleges = [
    { name: "Sunbeam Pune", location: "Pune", minRank: 300 },
    { name: "ACTS", location: "Pune", minRank: 500 },
    { name: "Juhu", location: "Mumbai", minRank: 1000 },
    { name: "IACSD", location: "Pune", minRank: 800 },
    // { name: "College E", location: "City Y", minRank: 2000 }
];
