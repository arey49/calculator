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
        ghostContent = false;
        unselectAllOperators();
    }

    else if (buttonClasses.contains("operator-button")) {
        if (operator != "") {
            operand2 = getNumberFromScreen();
            displayOnScreen(performOperation());
        }

        operand1 = getNumberFromScreen();
        selectOperator(event.target);
        ghostContent = true;     
    }

    else if (event.target.id == "equals-button") {
        operand2 = getNumberFromScreen();
        displayOnScreen(performOperation());
        ghostContent = true;
        resetOperator();
    }

    else if (buttonClasses.contains("options-button")) {
        if (event.target.id == "reset-button") {
            clearScreen();
            resetOperator();
        } else if (event.target.id == "change-sign-button") {
            let aux = getNumberFromScreen();
            displayOnScreen(aux * (-1));
        } else if (event.target.id == "percent-button") {
            let aux = getNumberFromScreen();
            displayOnScreen(aux / 100);
        }
    }

}

function displayOnScreen(number) {
    if (typeof number == "string") {
        screen.textContent = number;
        return;
    }
    screen.textContent = +number.toFixed(20);
}

function selectOperator(button) {
    operator = button.textContent;
    button.style.filter = "opacity(75%)";
}

function addDigitToDisplay(button) {
    if (button.id == "point-button") {
        if (ghostContent) {
            screen.textContent = "0.1";
        } else if (!screen.textContent.includes(".")) {
            screen.textContent += ".";
        }
        return;
    }

    if (ghostContent || screen.textContent == "0") {
        screen.textContent = button.textContent;
    } else {
        screen.textContent += button.textContent;
    }
}

function clearScreen() {
    screen.textContent = "0";
}

function getNumberFromScreen() {
    return Number(screen.textContent);
}

function unselectAllOperators() {
    const operators = buttonsDiv.querySelectorAll(".operator-button");
    operators.forEach(button => button.style.filter = "opacity(100%)");
}

function resetOperator() {
    unselectAllOperators();
    operator = "";
}

function performOperation() {
    if (operator == "") return screen.textContent;
    // if operator != "", then operand1 is defined
    let result = 0;
    switch (operator) {
        case("+"):
            result = add(operand1, operand2);    
            break;

        case("-"):
            result = substract(operand1, operand2);
            break;

        case("*"):
            result = multiply(operand1, operand2);
            break;

        case("/"):
            if (operand2 == 0) return "ERROR";
            result = divide(operand1, operand2);
            break;

        default:
            break;
    }

    return result;
}

let operand1;
let operand2;
let operator = "";
let ghostContent = true; // true means that any new number will overwrite the current display

const screen = document.querySelector(".screen");
const buttonsDiv = document.querySelector(".buttons-div");
buttonsDiv.addEventListener("click", buttonPressed);
