//creates all calculator buttons and appends to calculator container
const container = document.querySelector(".container");
for (let i = 0; i <=9; i++)
{
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add("digit");
    button.id = i;
    button.style.cssText = `grid-area: digit${i}`;
    container.appendChild(button);
}

let symbols = ["+","-","x","/"];
let operator_id = ["add","subtract","multiply","divide"];
for (let i = 0; i < 4; i++)
{
    const operator = document.createElement("button");
    operator.textContent = symbols[i];
    operator.classList.add("operator");
    operator.style.cssText = `grid-area: ${operator_id[i]}`
    container.appendChild(operator);
}


//creates all variables needed in operation
let display_value = '', number1, number2, symbol;
const display = document.querySelector(".display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");

//adds digit to display value when clicked
digits.forEach(digit => {
    digit.addEventListener("click", () => {
        display_value += digit.textContent;
        display.textContent = display_value;
    });
});

//adds decimal point and disables button when decimal is clicked
const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {

    display_value += decimal.textContent;
    display.textContent = display_value;
    decimal.disabled = true;
});
//stores first number and operator in variables; evaluates if there is already an operation

operators.forEach(button => {
    button.addEventListener("click", () => {
        removeClasses(operators);
        
        if(number1 && symbol && (display_value !== ''))
        {
            getResults();
        }
        if (!number1)
        {
            number1 = display_value;
        }
        button.classList.add("selected");
        symbol = button.textContent;
        decimal.disabled = false;
        display_value = '';
        
    });
});
function removeClasses(btns) {
    btns.forEach((btn) => {
      btn.classList.remove("selected");
    });
  }

//evaluates operation when equals sign is clicked
const equals = document.querySelector(".equals");
equals.addEventListener("click", getResults);

function getResults(){
    number2 = display_value;
    if ((number2 === '') || (!number1 && !number2))
    {
        display.textContent = "ERROR. PRESS CLEAR";
        return;
    }
    if (number2 == 0 && symbol === '/')
    {
        display.textContent = "Cannot divide by 0. Press Clear";
        return;
    }
    display_value = (operate(symbol, parseFloat(number1), parseFloat(number2))*1).toString();
    display.textContent = display_value;
    number1 = display_value;
    number2 = undefined;
    symbol = undefined;
    decimal.disabled = false;
    removeClasses(operators);
}

//resets all variables when clear is clicked
const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
    display_value = '';
    display.textContent = '\xa0';
    decimal.disabled = false;
    number1 = undefined;
    number2 = undefined;
    symbol = undefined;
});

//removes last digit when delete button is clicked
const backspace = document.querySelector(".backspace")
backspace.addEventListener("click", () => {
    display_value = display_value.slice(0,-1);
    if (display_value === '')
    {
        display.textContent = '\xa0';
        return;
    }
    display.textContent = display_value;
});


//operator functions
function add(x,y)
{
    return x+y;
}

function subtract(x,y) {
    return x-y;
}

function multiply(x,y)
{
    return x*y;
}

function divide(x,y){
    return x/y;
}

function operate(operator, x, y)
{
    switch(operator)
    {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case 'x':
            return multiply(x, y);
        case '/':
            return divide(x, y);
    }
}





