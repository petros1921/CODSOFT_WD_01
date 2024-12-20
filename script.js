const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = ''; 
let previousInput = ''; 
let operator = ''; 
let result = ''; 

// Event Listener for Button Clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        handleInput(value);
    });
});

// Handle Input
function handleInput(value) {
    if (value === 'C') {
        // Clear the display and reset
        clearDisplay();
    } else if (value === '=') {
        // Perform the calculation
        calculate();
    } else if (['+', '-', '*', '/'].includes(value)) {
        // Handle operator input
        setOperator(value);
    } else {
        // Handle number input
        appendNumber(value);
    }
}

// Append Numbers to Current Input
function appendNumber(value) {
    if (currentInput.length < 10) { 
        currentInput += value;
        updateDisplay(currentInput);
    }
}

// Set Operator
function setOperator(op) {
    if (currentInput === '' && result !== '') {
        // If no current input but a result exists, use the result as previousInput
        previousInput = result.toString();
    } else if (currentInput !== '') {
        // If there's input, calculate the current result first
        if (previousInput !== '') {
            calculate();
        }
        previousInput = currentInput;
    }

    currentInput = ''; 
    operator = op; 
}

// Perform Calculation
function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') return;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : 'Error'; 
            break;
    }

    updateDisplay(result);
    previousInput = result.toString();
    currentInput = ''; 
    operator = '';
}

// Clear the Display
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    result = '';
    updateDisplay(0);
}

// Update the Display
function updateDisplay(value) {
    display.textContent = value;
}
