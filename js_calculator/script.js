const secValueSpan = document.querySelector('.secValueSpan');
const display = document.querySelector('.display');
const buttonGroup = document.querySelector('.button-group');
let buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.value = button.innerText;
})
let displayValue = 0;
let firstValue = null;
let WaitSecondValue = false;
let operator = null;
let equalOn = false;
function updateDisplay() {
    display.value = displayValue;
}
updateDisplay();
buttonGroup.addEventListener('click', function(e){
    let element = e.target;
    if(!element.matches('button')) return;
    if(element.classList.contains('operator')) {
        operand(element.value)
        updateDisplay();
        return
    }
    if(element.classList.contains('clear')) {
        clear();
        updateDisplay();
        return
    }
    if(element.classList.contains('sqrt')) {
        if(!firstValue) {
            displayValue = Math.sqrt(displayValue)
            updateDisplay();
            return
        }
        calculate(firstValue, displayValue, operator)
        displayValue = Math.sqrt(firstValue)
        secValueSpan.textContent = '';
        operator = null
        firstValue = null
        updateDisplay();
        return
    }
    if(element.classList.contains('equal')) {
        if(!firstValue) {
            return
        }
        calculate(firstValue, displayValue, operator)
        displayValue = firstValue;
        secValueSpan.textContent = '';
        operator=null;
        WaitSecondValue = false;
        equalOn = true;
        updateDisplay();
        return
    }
    if(element.classList.contains('decimal')) {
        decimal();
        updateDisplay()
        return
    }
    updateNumber(element.value);
    updateDisplay();
});
function updateNumber(number){
    if(equalOn) {
        return
    }
    if(WaitSecondValue) {
        displayValue = number;
        WaitSecondValue = false
        return
    }
    if(displayValue === 0) {
        displayValue = number
    } else {
        displayValue += number
    }
}
function decimal() {
    if(displayValue.includes('.')) return;
    displayValue += '.'
}
function operand(oper) {
    
    if(!firstValue) {
        firstValue = displayValue;
        secValueSpan.textContent = firstValue;
        displayValue = 0
    }
    if(firstValue) {
        calculate(firstValue,displayValue,operator);
        secValueSpan.textContent = firstValue;
        displayValue = 0;
    }
    WaitSecondValue = true;
    operator = oper
    equalOn = false;
}
function calculate(first, second, operator){
    switch (operator) {
        case '+': first = Number(first) + Number(second);
        secValueSpan.textContent = first;
        firstValue = first;
            break;
        case '-': first = Number(first) - Number(second)
        secValueSpan.textContent = first;
        firstValue = first;
            break;
        case '*': first = Number(first) * Number(second)
        secValueSpan.textContent = first;
        firstValue = first;
            break;
        case '/': first = Number(first) / Number(second)
        secValueSpan.textContent = first;
        firstValue = first;
            break;
        case '%': first = Number(first) * Number(second) / 100;
        secValueSpan.textContent = first;
        firstValue = first;
            break;
    }
}
function clear () {
    displayValue = 0;
    firstValue = null;
    WaitSecondValue = false;
    operator = null;
    equalOn = false;
    secValueSpan.textContent = '';
}
