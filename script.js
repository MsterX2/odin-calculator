
const operations = {
    "+": (a,b) => a + b,
    "-": (a,b) => a - b,
    "*": (a,b) => a * b,
    "%": (a,b) => a / b,
};

const buttonsAllowed = {
    "1": "number",
    "2": "number",
    "3": "number",
    "4": "number",
    "5": "number",
    "6": "number",
    "7": "number",
    "8": "number",
    "9": "number",
    "0": "number",
    "<": "delete",
    ".": "floating",
    "CE": "clear",
    "%": "operator",
    "*": "operator",
    "+": "operator",
    "-": "operator",
    "=": "operate",
    "?": false,
}

function operate(a, b, operator, buttonPressed) {
    const typeOfButton = buttonsAllowed[buttonPressed]
            switch (typeOfButton) {
                case "number":
                    display.value += buttonPressed;
                    break;
                case "operator":
                    if (!existAnyOperator && display.value != "") {
                        existAnyOperator = buttonPressed;
                        display.value += buttonPressed
                    } else if (existAnyOperator && display.value != ""){
                        console.log({existAnyOperator, buttonPressed})
                        const lastOperator = display.value
                        display.value = lastOperator.replace(existAnyOperator, buttonPressed)
                        existAnyOperator = buttonPressed;
                    };
                    break;
                case "floating":
                    if (!hasAFloatingPoint) {
                        hasAFloatingPoint = true;
                        display.value += buttonPressed
                    };
                    break
                case "clear":
                    display.value = "";
                    break;
                case "delete":
                    display.value = display.value.slice(0, -1)
                    break;
                case "operate": 
                    existAnyOperator = false;
                    hasAFloatingPoint = false;
                    return operations[operator](a, b)
                    break;
                default:
                    break;
            }
}



const buttons = document.querySelectorAll(".button")
const display = document.querySelector("#display")
let existAnyOperator = false;
let hasAFloatingPoint = false ;

display.addEventListener("input", event => {
    console.log(event.target.value)
})


buttons.forEach(
    element => {
        element.addEventListener("click", (event) => {
            const buttonPressed = event.target.textContent
            const [a, b] = display.value.split(existAnyOperator)
            result = operate(+a, +b, existAnyOperator,buttonPressed)
            if (result !== undefined) display.value = result
            
        })
    }
)
