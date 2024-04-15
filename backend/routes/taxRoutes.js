const express = require('express');
const calculateTax = require('../calculateTax');

const router = express.Router();

router.post('/calculate', (req, res) => {
    const { grossIncome, extraIncome, deductions, age } = req.body;

    console.log(req.body);

    // Validate input data
    if (!grossIncome || !extraIncome || !deductions || !age) {
        console.log('all fields are required');
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate age
    const validAges = ['< 40', '≥ 40 & < 60', '≥ 60'];
    if (!validAges.includes(age)) {
        console.log('Invalid age value ' + age);
        return res.status(400).json({ error: 'Invalid age value' });
    }

    // Calculate tax
    const tax = calculateTax(grossIncome, extraIncome, deductions, age);
    console.log(tax);
    res.json({ tax });
});

module.exports = router;
