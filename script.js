
const operations = {
    "add": (a,b) => a + b,
    "subtract": (a,b) => a - b,
    "multiply": (a,b) => a * b,
    "divide": (a,b) => a / b,
};

function operate(a, b, operator) {
    operations[operator](a, b)
}