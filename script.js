document.getElementById('predictorForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting and reloading the page

    // Get values from the form
    const submitButton = document.querySelector('button[type="submit"]');
    const rank = parseInt(document.getElementById('rank').value);
    const location = document.getElementById('location').value;

    submitButton.disabled = true;
    submitButton.innerText = "Processing...";

    // Call the predictColleges function with the inputs
    
        let { eligibleColleges, notEligibleColleges } = predictColleges(rank, location, colleges);
    

    // Display the predicted colleges in the result div
    let resultDiv = document.getElementById('result');
    let notEligibleCollegesDiv = document.getElementById('noteligible');
    if (eligibleColleges.length === 0) {
        resultDiv.innerHTML = "<h3>Predicted Colleges</h3><p>No eligible colleges found for the given criteria.</p>";
    } else {
        let eligibleList = eligibleColleges
            .map(college => `<li>${college.name} - ${college.location} (Min Rank: ${college.minRank})</li>`)
            .join('');
        resultDiv.innerHTML = `<h3>Predicted Colleges</h3><ul>${eligibleList}</ul>`;
    }

    // Display non-eligible colleges
    if (notEligibleColleges.length > 0) {
        let notEligibleList = notEligibleColleges
            .map(college => `<li>${college.name} - ${college.location} (Min Rank: ${college.minRank})</li>`)
            .join('');
            notEligibleCollegesDiv.innerHTML += `<ul>${notEligibleList}</ul>`;
    }

    submitButton.disabled = false;
    submitButton.innerText = "Predict College";
});

// Function to predict colleges based on rank and location
function predictColleges(rank, preferredLocation, colleges) {
    
    // Filter colleges based on rank
    let eligibleColleges = colleges.filter(college => rank <= college.minRank);
    let notEligibleColleges = colleges.filter(college => rank > college.minRank);

    // Split colleges based on location preference
    let matchingLocation = eligibleColleges.filter(college => college.location === preferredLocation);
    let nonMatchingLocation = eligibleColleges.filter(college => college.location !== preferredLocation);

    // Sort both arrays by minRank (ascending order)
    matchingLocation.sort((a, b) => a.minRank - b.minRank);
    nonMatchingLocation.sort((a, b) => a.minRank - b.minRank);

    // Combine the results: matching location first, followed by non-matching location
    eligibleColleges = [...matchingLocation, ...nonMatchingLocation];

    return { eligibleColleges, notEligibleColleges };
}

// Example college data
const colleges = [
    { name: "Sunbeam Pune", location: "Pune", minRank: 300 },
    { name: "ACTS", location: "Pune", minRank: 500 },
    { name: "Juhu", location: "Mumbai", minRank: 1000 },
    { name: "IACSD", location: "Pune", minRank: 800 },
];
