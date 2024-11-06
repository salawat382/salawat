const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let totalNumber = 1000; // Initial total number

app.use(bodyParser.json());

app.get('/get-total', (req, res) => {
    res.json({ total: totalNumber });
});

app.post('/subtract', (req, res) => {
    const subtractValue = parseInt(req.body.value, 10);
    if (!isNaN(subtractValue)) {
        totalNumber -= subtractValue;
    }
    res.json({ total: totalNumber });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
function subtractNumber() {
    const subtractValue = parseInt(document.getElementById('subtractNumber').value, 10);
    
    // Check if the input is a valid number and is not negative
    if (isNaN(subtractValue) || subtractValue < 0) {
        alert("Please enter a valid number greater than or equal to 0.");
        return;
    }

    // Subtract the number but ensure the remaining number doesn't go below 0
    remainingNumber -= subtractValue;
    if (remainingNumber < 0) {
        remainingNumber = 0; // Set the remaining number to 0 if it goes below 0
    }

    // Store the updated remaining number in localStorage
    localStorage.setItem('remainingNumber', remainingNumber);
    
    // Update the displayed remaining number with formatting
    const formattedRemaining = formatNumberWithCommas(remainingNumber);
    document.getElementById('remainingNumber').textContent = formattedRemaining;
}
