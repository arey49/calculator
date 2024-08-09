function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operand1, operator, operand2) {
    switch (operator) {
        case "+":
            return add(operand1, operand2);
        case "-":
            return substract(operand1, operand2);
        case "*":
            return multiply(operand1, operand2);
        case "/":
            return divide(operand1, operand2);
        default:
            return 0;
    }
}

function buttonPressed(event) {
    const buttonClasses = event.target.classList;

    if (buttonClasses.contains("operand-button")) { // classList isn't an array. Can't use .includes()
        addDigitToDisplay(event.target);
    }
    else if (buttonClasses.contains("options-button")) {
        if (event.target.id == "reset-button") {
            clearScreen();
        }
    }

}

function addDigitToDisplay(button) {
    if (screen.textContent == "0") {
        screen.textContent = "";
    }

    screen.textContent += button.textContent;
}

function clearScreen() {
    screen.textContent = "0";
}

let operand1;
let operand2;
let operator;

const screen = document.querySelector(".screen");
const buttonsDiv = document.querySelector(".buttons-div");
buttonsDiv.addEventListener("click", buttonPressed);
