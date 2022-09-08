/* This calculator is guided by WebDev Simplified Tutorial on YouTube
   The algorithm used is parallel.*/

// Object declaration and method assignment
class Calculator {
    constructor(previousOperandDisplay, currentOperandDisplay) {
        this.previousOperandDisplay = previousOperandDisplay
        this.currentOperandDisplay = currentOperandDisplay
        this.clear()
    }

    // appends number to appear on display
    concatNum(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // deals with display of decimal places when declared initailly, and no repetition of decimal places 
    getNumDisplay(number) {
        const stringNum = number.toString()
        const intNum = parseFloat(stringNum.split('.')[0])
        const deciNum = stringNum.split('.')[1]
        let intDisplay
        if (isNaN(intNum)) {
            intDisplay = ''
        } else {
            intDisplay = intNum.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(deciNum != null){
            return `${intDisplay}.${deciNum}`
        } else {
            return intDisplay
        }
    }

    // updates display every input, makes operation sign visible on display, clears previous display upon equals (when no operation is done) 
    updateDisplay() {
        this.currentOperandDisplay.innerText = this.getNumDisplay(this.currentOperand)
        if (this.operation != null){
            this.previousOperandDisplay.innerText = `${this.getNumDisplay(this.previousOperand)} ${this.operation}` 
        } else {
            this.previousOperandDisplay.innerText = ''
        }
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    // integrates operation and automates computation if there is a previous operand when selecting an operation
    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute() {
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation){
            case '+': 
                computation = previous + current
                break
            case '-': 
                computation = previous - current
                break
            case 'x': 
                computation = previous * current
                break
            case '/': 
                computation = previous / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
}

// HTML selectors
const numberBtns = document.querySelectorAll('[data-num]')
const operationBtns = document.querySelectorAll('[data-operation]')
const previousOperandDisplay = document.querySelector('[data-previous-display]')
const currentOperandDisplay = document.querySelector('[data-current-display]')
const allClearBtn = document.querySelector('[data-clear]')
const deleteBtn = document.querySelector('[data-del]')
const equalsBtn = document.querySelector('[data-equals]')

// creating instance of object Calculator and assigning methods on corresponding HTML element (buttons)
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

equalsBtn.addEventListener('click', button => {
        calculator.compute()
        calculator.updateDisplay()
    })

allClearBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})