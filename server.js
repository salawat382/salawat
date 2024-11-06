const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const initialTotal = 1000000; // Initial total number set to 1,000,000
let remainingNumber = initialTotal;

app.use(bodyParser.json());

app.get('/get-total', (req, res) => {
    res.json({ total: remainingNumber });
});

app.post('/subtract', (req, res) => {
    const subtractValue = parseInt(req.body.value, 10);
    if (!isNaN(subtractValue) && subtractValue >= 0) {
        remainingNumber = initialTotal - subtractValue;
    }
    res.json({ total: remainingNumber });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
// Function to get the cookie value
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to set the cookie value
function setCookie(name, value, days) {
    let d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiration
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Set initial total number to 1,000,000
const initialTotal = 1000000;
const resetPassword = "yourPassword123"; // Set your own password here

// Get the remaining number from cookie or use the initial total
let remainingNumber = getCookie('remainingNumber');
if (remainingNumber === null) {
    remainingNumber = initialTotal;
} else {
    remainingNumber = parseInt(remainingNumber, 10);
}

// Function to format the number with commas
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to handle subtraction
function subtractNumber() {
    const subtractValue = parseInt(document.getElementById('subtractNumber').value, 10);

    // Check if the input is a valid number and is not negative
    if (isNaN(subtractValue) || subtractValue <= 0) {
        alert("Please enter a valid number greater than 0.");
        return;
    }

    // Subtract the number but ensure the remaining number doesn't go below 0
    remainingNumber -= subtractValue;

    // Prevent going below 0
    if (remainingNumber < 0) {
        remainingNumber = 0;
    }

    // Save the updated remaining number to cookie
    setCookie('remainingNumber', remainingNumber, 365); // Cookie expires in 365 days

    // Update the displayed remaining number
    const formattedRemaining = formatNumberWithCommas(remainingNumber);
    document.getElementById('remainingNumber').textContent = formattedRemaining;
}

// Function to handle reset
function resetNumber() {
    const userPassword = prompt("Enter the password to reset:");
    if (userPassword === resetPassword) {
        remainingNumber = initialTotal;
        setCookie('remainingNumber', remainingNumber, 365); // Update cookie
        const formattedRemaining = formatNumberWithCommas(remainingNumber);
        document.getElementById('remainingNumber').textContent = formattedRemaining;
        alert("Remaining number has been reset!");
    } else {
        alert("Incorrect password! Reset denied.");
    }
}

// Update the displayed remaining number initially
const formattedRemaining = formatNumberWithCommas(remainingNumber);
document.getElementById('remainingNumber').textContent = formattedRemaining;
