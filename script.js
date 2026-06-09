
const operations = {
    "+": (a,b) => Number(a) + Number(b),
    "-": (a,b) => Number(a) - Number(b),
    "*": (a,b) => Number(a) * Number(b),
    "/": (a,b) => Number(a) / Number(b),
};

const keyboardAllowed = {
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "0",
    "Backspace": "<",
    ".": ".",
    "/": "/",
    "*": "*",
    "+": "+",
    "-": "-",
    "=": "=",
    "Enter": "=",
}

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
    "/": "operator",
    "*": "operator",
    "+": "operator",
    "-": "operator",
    "=": "operate",
    "?": false,
}

function operate(a, b, operator, buttonPressed, typeOfButton) {
    let result;
    console.log(typeOfButton)
    
    switch (typeOfButton) {
        case "number":
            if (operator) {
                return [a, operator, b += buttonPressed]
            }
            return [a += buttonPressed, operator, b]
            break;
        case "operator":
            if (a !== 0 && !a) return ["", "", ""]
            if ((b !== 0 && !b)) {
                buttonsAllowed["."] = "floating";
                return [a, buttonPressed, ""]
            }
            result = operations[operator](a, b)
            if (result === Math.trunc(result)) buttonsAllowed["."] = "floating";
            buttonsAllowed["."] = false;
            return [result, buttonPressed, ""]
            break;
        case "floating":
            if (b === 0 || b) {
                buttonsAllowed["."] = false;
                return [a, operator, b += buttonPressed]
            }
            if (a === 0 || a) {
                buttonsAllowed["."] = false;
                return [a += buttonPressed, operator, b]
            }
            return [a, operator, b]
            
            break
        case "clear":
            return ["", "", ""]
            break;
        case "delete":
            if (a !== 0 && !a) return ["", "", ""]
            if (operator !== 0 && !operator) {
                if (a.at(-1) === ".") buttonsAllowed["."] = "floating";
                return [a.slice(0, -1), operator, b]
            }
            if ((b !== 0 && !b)) return [a, "", b]
            if (b.at(-1) === ".") buttonsAllowed["."] = "floating";
            return [a, operator, b.slice(0, -1)]
            break;
        case "operate": 
            result =  operations[operator](a, b)
            if (result === Math.trunc(result)) buttonsAllowed["."] = "floating";
            else buttonsAllowed["."] = false;
            return [result, "", ""]
            break;
        default:
            return [a, operator, b]
            break;
    }
}



const buttons = document.querySelectorAll(".button")
const display = document.querySelector("#display")
let existAnyOperator = false;
let hasAFloatingPoint = false;
let number1 = ""
let operator = "";
let number2 = "";

display.addEventListener("keydown", event => {
    event.preventDefault();
    const buttonPressed = event.key
    const typeOfButton = buttonsAllowed[keyboardAllowed[buttonPressed]];
    [number1, operator, number2] = operate(number1, number2, operator,buttonPressed, typeOfButton);
    display.value = `${number1}${operator}${number2}` 
})

// display.addEventListener("mouseDown", (event) => {
//     event.preventDefault()
// })

buttons.forEach(
    element => {
        element.addEventListener("click", (event) => {
            const buttonPressed = event.target.textContent;
            const typeOfButton = buttonsAllowed[buttonPressed];
            [number1, operator, number2] = operate(number1, number2, operator,buttonPressed, typeOfButton);
            display.value = `${number1}${operator}${number2}`      
        })
    }
)
