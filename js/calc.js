/**
 * NeoCalc - Advanced Calculator
 * Enhanced version of Rohan Shah's original calculator
 */

// Initialize variables
let screenValue = "";
let lastScreenValue = "";
let isSign = true;
let flag = 0;
let isScientificMode = false;
let angleMode = "deg"; // deg, rad, grad
let memoryValue = 0;
let isSecondFunction = false;

// DOM elements
const screen = document.getElementById("answer");
const prevOperationDisplay = document.getElementById("prevOperation");
const buttons = document.querySelectorAll(".btn");
const historyButton = document.getElementById("historyButton");
const historyPanel = document.getElementById("historyPanel");
const closeHistoryBtn = document.getElementById("closeHistoryBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");
const historyContent = document.getElementById("historyContent");
const themeToggle = document.getElementById("toggle-mode");
const scientificToggle = document.getElementById("scientificToggle");
const scientificKeypad = document.getElementById("scientificKeypad");
const calculatorContainer = document.querySelector(".calculator-container");

// Make sure the screen is read-only
screen.readOnly = true;

// Initialize the calculator
function initCalculator() {
    loadThemePreference();
    loadScientificPreference();
    attachEventListeners();
    screen.value = "";
}

// Check if input is a number
function isNumber(char) {
    return /^\d$/.test(char);
}

// Attach event listeners to calculator buttons
function attachEventListeners() {
    // Button click events
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            handleButtonClick(e.target);
            
            // Add button press animation
            button.classList.add("btn-pressed");
            setTimeout(() => {
                button.classList.remove("btn-pressed");
            }, 100);
        });
    });

    // Theme toggle
    themeToggle.addEventListener("change", toggleTheme);

    // Scientific mode toggle
    scientificToggle.addEventListener("click", toggleScientificMode);

    // History panel controls
    historyButton.addEventListener("click", toggleHistoryPanel);
    closeHistoryBtn.addEventListener("click", toggleHistoryPanel);
    clearHistoryBtn.addEventListener("click", clearHistory);

    // Keyboard support
    document.addEventListener("keydown", handleKeyPress);

    // Error handling
    window.onerror = handleError;
}

// Toggle scientific mode
function toggleScientificMode() {
    isScientificMode = !isScientificMode;
    
    if (isScientificMode) {
        scientificToggle.classList.add("active");
        scientificKeypad.classList.add("active");
        calculatorContainer.classList.add("scientific-mode");
        
        // Add memory indicator if needed
        if (memoryValue !== 0) {
            showMemoryIndicator();
        }
    } else {
        scientificToggle.classList.remove("active");
        scientificKeypad.classList.remove("active");
        calculatorContainer.classList.remove("scientific-mode");
        hideMemoryIndicator();
    }
    
    // Save preference
    localStorage.setItem("neocalc-scientific-mode", isScientificMode);
}

// Handle button clicks
function handleButtonClick(button) {
    const buttonAction = button.dataset.action;
    
    if (!buttonAction) return;
    
    // Scientific functions
    if (isScientificMode && handleScientificFunction(buttonAction)) {
        screen.value = screenValue;
        return;
    }
    
    // Numbers
    if (isNumber(buttonAction)) {
        handleNumberInput(buttonAction);
    } 
    // Decimal point
    else if (buttonAction === ".") {
        handleDecimalInput();
    } 
    // Operators
    else if (["+", "-", "*", "/"].includes(buttonAction)) {
        handleOperatorInput(buttonAction);
    } 
    // Parentheses
    else if (buttonAction === "(" || buttonAction === ")") {
        handleParenthesisInput(buttonAction);
    } 
    // Clear
    else if (buttonAction === "clear") {
        clearScreen();
    } 
    // Backspace
    else if (buttonAction === "backspace") {
        handleBackspace();
    } 
    // Equals
    else if (buttonAction === "=") {
        calculateResult();
    }
    
    // Update the display
    screen.value = screenValue;
}

// Handle number input
function handleNumberInput(num) {
    if (flag === 1) {
        screenValue = num;
        flag = 0;
    } else {
        screenValue += num;
    }
    isSign = false;
    screen.classList.remove("negative");
}

// Handle decimal input
function handleDecimalInput() {
    // Check if the last number already has a decimal point
    const parts = screenValue.split(/[\+\-\*\/]/);
    const lastPart = parts[parts.length - 1];
    
    if (lastPart.includes(".")) return;
    
    if (flag === 1) {
        screenValue = "0.";
        flag = 0;
    } else if (isSign || screenValue === "") {
        screenValue += "0.";
    } else {
        screenValue += ".";
    }
    isSign = false;
}

// Handle operator input
function handleOperatorInput(operator) {
    if (flag === 1) {
        flag = 0;
    }
    
    if (screenValue === "" && operator === "-") {
        screenValue = operator;
        isSign = true;
        return;
    }
    
    if (screenValue !== "" && !isSign) {
        screenValue += operator;
        isSign = true;
    } else if (screenValue !== "" && isSign && operator === "-") {
        // Allow negative numbers after operators
        const lastChar = screenValue.slice(-1);
        if (["+", "*", "/"].includes(lastChar)) {
            screenValue += operator;
        }
    }
}

// Handle parenthesis input
function handleParenthesisInput(parenthesis) {
    if (flag === 1) {
        flag = 0;
    }
    screenValue += parenthesis;
}

// Clear screen
function clearScreen() {
    screenValue = "";
    prevOperationDisplay.textContent = "";
    screen.classList.remove("negative");
    flag = 0;
    isSign = true;
}

// Handle backspace
function handleBackspace() {
    if (flag === 1) {
        clearScreen();
    } else {
        screenValue = screenValue.slice(0, -1);
        if (screenValue === "") {
            isSign = true;
        } else {
            const lastChar = screenValue.slice(-1);
            isSign = ["+", "-", "*", "/"].includes(lastChar);
        }
    }
}

// Handle scientific functions
function handleScientificFunction(action) {
    const currentValue = parseFloat(screenValue) || 0;
    
    switch (action) {
        // Memory functions
        case "mc":
            memoryValue = 0;
            hideMemoryIndicator();
            return true;
        case "mr":
            screenValue = memoryValue.toString();
            flag = 1;
            return true;
        case "m+":
            memoryValue += currentValue;
            showMemoryIndicator();
            return true;
        case "m-":
            memoryValue -= currentValue;
            showMemoryIndicator();
            return true;
        case "ms":
            memoryValue = currentValue;
            showMemoryIndicator();
            return true;
            
        // Angle mode
        case "deg":
            toggleAngleMode();
            return true;
            
        // Constants
        case "pi":
            if (flag === 1 || screenValue === "") {
                screenValue = Math.PI.toString();
            } else {
                screenValue += "*" + Math.PI.toString();
            }
            flag = 0;
            isSign = false;
            return true;
        case "e":
            if (flag === 1 || screenValue === "") {
                screenValue = Math.E.toString();
            } else {
                screenValue += "*" + Math.E.toString();
            }
            flag = 0;
            isSign = false;
            return true;
            
        // Power functions
        case "x2":
            screenValue = Math.pow(currentValue, 2).toString();
            flag = 1;
            return true;
        case "x3":
            screenValue = Math.pow(currentValue, 3).toString();
            flag = 1;
            return true;
        case "xy":
            screenValue += "^";
            isSign = true;
            return true;
        case "sqrt":
            screenValue = Math.sqrt(currentValue).toString();
            flag = 1;
            return true;
        case "cbrt":
            screenValue = Math.cbrt(currentValue).toString();
            flag = 1;
            return true;
            
        // Trigonometric functions
        case "sin":
            screenValue = Math.sin(toRadians(currentValue)).toString();
            flag = 1;
            return true;
        case "cos":
            screenValue = Math.cos(toRadians(currentValue)).toString();
            flag = 1;
            return true;
        case "tan":
            screenValue = Math.tan(toRadians(currentValue)).toString();
            flag = 1;
            return true;
        case "csc":
            screenValue = (1 / Math.sin(toRadians(currentValue))).toString();
            flag = 1;
            return true;
        case "sec":
            screenValue = (1 / Math.cos(toRadians(currentValue))).toString();
            flag = 1;
            return true;
        case "cot":
            screenValue = (1 / Math.tan(toRadians(currentValue))).toString();
            flag = 1;
            return true;
            
        // Logarithmic functions
        case "ln":
            screenValue = Math.log(currentValue).toString();
            flag = 1;
            return true;
        case "log":
            screenValue = Math.log10(currentValue).toString();
            flag = 1;
            return true;
        case "exp":
            screenValue = Math.exp(currentValue).toString();
            flag = 1;
            return true;
        case "10x":
            screenValue = Math.pow(10, currentValue).toString();
            flag = 1;
            return true;
            
        // Other functions
        case "factorial":
            screenValue = factorial(currentValue).toString();
            flag = 1;
            return true;
        case "frac":
            screenValue = (1 / currentValue).toString();
            flag = 1;
            return true;
        case "abs":
            screenValue = Math.abs(currentValue).toString();
            flag = 1;
            return true;
        case "mod":
            screenValue += "%";
            isSign = true;
            return true;
        case "rand":
            screenValue = Math.random().toString();
            flag = 1;
            return true;
        case "2nd":
            toggleSecondFunction();
            return true;
            
        default:
            return false;
    }
}

// Convert degrees to radians if needed
function toRadians(degrees) {
    if (angleMode === "deg") {
        return degrees * (Math.PI / 180);
    } else if (angleMode === "grad") {
        return degrees * (Math.PI / 200);
    }
    return degrees; // already in radians
}

// Calculate factorial
function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    if (n > 170) return Infinity; // Prevent overflow
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Toggle angle mode
function toggleAngleMode() {
    const angleBtn = document.querySelector('[data-action="deg"]');
    
    if (angleMode === "deg") {
        angleMode = "rad";
        angleBtn.textContent = "RAD";
    } else if (angleMode === "rad") {
        angleMode = "grad";
        angleBtn.textContent = "GRAD";
    } else {
        angleMode = "deg";
        angleBtn.textContent = "DEG";
    }
    
    angleBtn.classList.add("active");
    setTimeout(() => angleBtn.classList.remove("active"), 200);
}

// Toggle second function mode
function toggleSecondFunction() {
    isSecondFunction = !isSecondFunction;
    const secondBtn = document.querySelector('[data-action="2nd"]');
    
    if (isSecondFunction) {
        secondBtn.classList.add("active");
        // Update button labels for inverse functions
        updateSecondFunctionLabels(true);
    } else {
        secondBtn.classList.remove("active");
        updateSecondFunctionLabels(false);
    }
}

// Update button labels for second functions
function updateSecondFunctionLabels(isSecond) {
    const updates = {
        'sin': isSecond ? 'sin⁻¹' : 'sin',
        'cos': isSecond ? 'cos⁻¹' : 'cos',
        'tan': isSecond ? 'tan⁻¹' : 'tan',
        'ln': isSecond ? 'eˣ' : 'ln',
        'log': isSecond ? '10ˣ' : 'log',
        'x2': isSecond ? '√x' : 'x²',
        'xy': isSecond ? 'ⁿ√x' : 'x^y'
    };
    
    Object.keys(updates).forEach(action => {
        const btn = document.querySelector(`[data-action="${action}"]`);
        if (btn) {
            btn.textContent = updates[action];
        }
    });
}

// Show memory indicator
function showMemoryIndicator() {
    let indicator = document.querySelector('.memory-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'memory-indicator';
        indicator.textContent = 'M';
        calculatorContainer.appendChild(indicator);
    }
    indicator.classList.add('active');
}

// Hide memory indicator
function hideMemoryIndicator() {
    const indicator = document.querySelector('.memory-indicator');
    if (indicator) {
        indicator.classList.remove('active');
    }
}

// Enhanced calculate result to handle scientific operations
function calculateResult() {
    if (screenValue === "") return;
    
    try {
        // Replace ^ with ** for JavaScript exponentiation
        let expression = screenValue.replace(/\^/g, '**');
        
        // Replace % with modulo operator
        expression = expression.replace(/(\d+(?:\.\d+)?)\s*%\s*(\d+(?:\.\d+)?)/g, '($1 % $2)');
        
        // Check for multiplication implied by parentheses: 5(3+2) → 5*(3+2)
        expression = addImplicitMultiplication(expression);
        
        // Store the expression for history
        lastScreenValue = screenValue;
        prevOperationDisplay.textContent = screenValue;
        
        // Evaluate the expression
        const result = eval(expression);
        
        // Format the result to prevent floating point issues
        const formattedResult = formatResult(result);
        
        // Update display
        screenValue = formattedResult;
        screen.value = formattedResult;
        
        // Add negative class if result is negative
        if (parseFloat(formattedResult) < 0) {
            screen.classList.add("negative");
        } else {
            screen.classList.remove("negative");
        }
        
        // Add to history
        addToHistory(lastScreenValue, formattedResult);
        
        flag = 1;
    } catch (error) {
        handleError(error);
    }
}

// Add implicit multiplication
function addImplicitMultiplication(expression) {
    // Add * before ( if preceded by number or )
    expression = expression.replace(/(\d|\))\(/g, '$1*(');
    // Add * after ) if followed by number or (
    expression = expression.replace(/\)(\d|\()/g, ')*$1');
    return expression;
}

// Get history from localStorage
function getHistoryFromStorage() {
    try {
        const history = localStorage.getItem("neocalc-history");
        return history ? JSON.parse(history) : [];
    } catch (error) {
        console.error("Error loading history:", error);
        return [];
    }
}

// Save history to localStorage
function saveHistoryToStorage(history) {
    try {
        localStorage.setItem("neocalc-history", JSON.stringify(history));
    } catch (error) {
        console.error("Error saving history:", error);
    }
}

// Toggle history panel
function toggleHistoryPanel() {
    historyPanel.classList.toggle("active");
    
    if (historyPanel.classList.contains("active")) {
        displayHistory();
    }
}

// Display history in panel
function displayHistory() {
    const calcHistory = getHistoryFromStorage();
    historyContent.innerHTML = '';
    
    if (calcHistory.length === 0) {
        displayEmptyHistory();
        return;
    }
    
    // Display history items in reverse chronological order
    for (let i = calcHistory.length - 1; i >= 0; i--) {
        const historyItem = calcHistory[i];
        const resultClass = parseFloat(historyItem.result) < 0 ? 'negative' : 'positive';
        const formattedDate = formatDate(new Date(historyItem.timestamp));
        
        const historyItemElement = document.createElement('div');
        historyItemElement.className = 'history-item';
        historyItemElement.innerHTML = `
            <div class="history-expression">${historyItem.expression}</div>
            <div class="history-result ${resultClass}">${historyItem.result}</div>
            <div class="history-date">${formattedDate}</div>
        `;
        
        // Add click event to use this calculation
        historyItemElement.addEventListener('click', () => {
            screenValue = historyItem.result;
            screen.value = screenValue;
            prevOperationDisplay.textContent = historyItem.expression;
            flag = 1;
            
            if (parseFloat(historyItem.result) < 0) {
                screen.classList.add("negative");
            } else {
                screen.classList.remove("negative");
            }
            
            toggleHistoryPanel();
        });
        
        historyContent.appendChild(historyItemElement);
    }
}

// Display empty history message
function displayEmptyHistory() {
    historyContent.innerHTML = `
        <div class="empty-history">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>Your calculation history will appear here</p>
        </div>
    `;
}

// Format date for history display
function formatDate(date) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date >= today) {
        return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date >= yesterday) {
        return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
        return date.toLocaleDateString([], { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Clear all history
function clearHistory() {
    if (confirm("Are you sure you want to clear all calculation history?")) {
        localStorage.removeItem("neocalc-history");
        displayHistory();
    }
}

// Load theme preference from localStorage
function loadThemePreference() {
    const darkMode = localStorage.getItem("neocalc-dark-mode") === "true";
    themeToggle.checked = darkMode;
    if (darkMode) {
        document.body.classList.add("dark-mode");
    }
}

// Toggle between light and dark themes
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("neocalc-dark-mode", themeToggle.checked);
}

// Load scientific mode preference
function loadScientificPreference() {
    const scientificMode = localStorage.getItem("neocalc-scientific-mode") === "true";
    if (scientificMode) {
        toggleScientificMode();
    }
}

// Format result to prevent floating point issues
function formatResult(result) {
    // Handle exact integers
    if (Number.isInteger(result)) {
        return result.toString();
    }
    
    // Handle floating point precision issues
    if (typeof result === 'number') {
        // Display up to 10 decimal places, removing trailing zeros
        return parseFloat(result.toFixed(10)).toString();
    }
    
    return result.toString();
}

// Check for implicit multiplication with brackets: 5(3+2) → 5*(3+2)
function checkForBracketMulti() {
    const len = screenValue.length;
    
    for (let i = 0; i < len; i++) {
        if (screenValue[i] === '(' && i > 0) {
            if (isNumber(screenValue[i-1]) || screenValue[i-1] === ')') {
                screenValue = screenValue.slice(0, i) + '*' + screenValue.slice(i);
                i++; // Skip the newly inserted '*'
            }
        }
    }
}

// Handle keyboard input
function handleKeyPress(event) {
    event.preventDefault();
    const key = event.key;
    
    // Numbers
    if (/^[0-9]$/.test(key)) {
        handleNumberInput(key);
    }
    // Operators
    else if (['+', '-', '*', '/'].includes(key)) {
        handleOperatorInput(key);
    }
    // Parentheses
    else if (['(', ')'].includes(key)) {
        handleParenthesisInput(key);
    }
    // Decimal
    else if (key === '.') {
        handleDecimalInput();
    }
    // Equals or Enter
    else if (key === '=' || key === 'Enter') {
        calculateResult();
    }
    // Clear (Escape)
    else if (key === 'Escape') {
        clearScreen();
    }
    // Backspace
    else if (key === 'Backspace') {
        handleBackspace();
    }
    
    // Update the display
    screen.value = screenValue;
}

// Handle errors
function handleError(e) {
    if (e) e.preventDefault();
    alert("Invalid Expression. Please check your input.");
    screenValue = "";
    screen.value = screenValue;
    screen.classList.remove("negative");
    console.clear();
}

// Add calculation to history
function addToHistory(expression, result) {
    // Get current history from localStorage
    let calcHistory = getHistoryFromStorage();
    
    // Create a new history item
    const newHistoryItem = {
        expression: expression,
        result: result,
        timestamp: new Date().toISOString()
    };
    
    // Add new item to history
    calcHistory.push(newHistoryItem);
    
    // Limit history to 50 items
    if (calcHistory.length > 50) {
        calcHistory = calcHistory.slice(-50);
    }
    
    // Save to localStorage
    saveHistoryToStorage(calcHistory);
}

// Initialize the calculator when the page loads
document.addEventListener("DOMContentLoaded", initCalculator);
