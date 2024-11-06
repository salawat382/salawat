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
