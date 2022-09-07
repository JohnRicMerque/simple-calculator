class Calculator {
    constructor(previousOperandDisplay, currentOperandDisplay) {
        this.previousOperandDisplay = previousOperandDisplay
        this.currentOperandDisplay = currentOperandDisplay
        this.clear()
    }

    concatNum(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    updateDisplay() {
        this.currentOperandDisplay.innerText = this.currentOperand
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {

    }

    chooseOperation(operation){

    }

    compute() {

    }
}

// HTML selectors
const numberBtns = document.querySelectorAll('[data-num]')
const operationBtns = document.querySelectorAll('[data-operation]')
const previousOperandDisplay = document.querySelector('[data-previous-display]')
const currentOperandDisplay = document.querySelector('[data-current-display]')
const allClearBtn = document.querySelector('[data-clear]')
const deleteBtn = document.querySelector('[data-del]')
const EqualsBtn = document.querySelector('[data-equals]')

// Oject declaration and method assignment
const calculator = new Calculator(previousOperandDisplay, currentOperandDisplay)

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.concatNum(button.innerText)
        calculator.updateDisplay()
    })
})

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
