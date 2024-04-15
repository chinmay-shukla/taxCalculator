const calculateTax = (grossIncome, extraIncome, deductions, age) => {
    const totalIncome = parseFloat(grossIncome) + parseFloat(extraIncome) - parseFloat(deductions);
    // console.log(age + grossIncome + extraIncome + deductions + age);
    let tax = 0;
    if (totalIncome > 800000) {
        if (age == '< 40') {
            tax = 0.3 * (totalIncome - 800000);
        } else if (age == '≥ 40 & < 60') {
            tax = 0.4 * (totalIncome - 800000);
        } else {
            tax = 0.1 * (totalIncome - 800000);
        }
    }
    console.log(tax);
    const final = totalIncome - tax;
    return final;
}

module.exports = calculateTax;
