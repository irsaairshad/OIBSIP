/* ============================================
   CALCULATOR JAVASCRIPT
   OASIS INFOBYTE - Web Development L2
   ============================================ */

class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.shouldResetDisplay = false;
        
        this.initializeEventListeners();
    }

    /**
     * Initialize all event listeners for buttons and keyboard
     */
    initializeEventListeners() {
        // Number buttons
        document.querySelectorAll('.btn-number').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleNumber(e.target.dataset.number));
        });

        // Operator buttons
        document.querySelectorAll('.btn-operator').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleOperator(e.target.dataset.operator));
        });

        // Equals button
        document.getElementById('equals').addEventListener('click', () => this.calculate());

        // Clear button
        document.getElementById('clear').addEventListener('click', () => this.clear());

        // Backspace button
        document.getElementById('backspace').addEventListener('click', () => this.backspace());

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    /**
     * Handle number and decimal point input
     */
    handleNumber(num) {
        // Prevent multiple decimal points
        if (num === '.' && this.currentInput.includes('.')) {
            return;
        }

        // Replace '0' with new number (unless adding decimal)
        if (this.currentInput === '0' && num !== '.') {
            this.currentInput = num;
        } else {
            this.currentInput += num;
        }

        this.shouldResetDisplay = false;
        this.updateDisplay();
    }

    /**
     * Handle operator input with operator chaining support
     */
    handleOperator(op) {
        // If there's already an operation pending, calculate first
        if (this.operation !== null && !this.shouldResetDisplay) {
            this.calculate();
        }

        this.previousInput = this.currentInput;
        this.operation = op;
        this.shouldResetDisplay = true;
    }

    /**
     * Perform calculation using stored values
     * Does NOT use eval() for security
     */
    calculate() {
        if (this.operation === null || this.shouldResetDisplay) {
            return;
        }

        let result;
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);

        // Perform operation based on operator
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                // Division by zero check
                if (current === 0) {
                    alert('⚠️ Cannot divide by zero!');
                    this.clear();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        // Round to avoid floating-point errors (e.g., 0.1 + 0.2 = 0.3)
        this.currentInput = (Math.round(result * 100000) / 100000).toString();
        this.operation = null;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    /**
     * Clear all values and reset calculator
     */
    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
    }

    /**
     * Delete last character from current input
     */
    backspace() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }

    /**
     * Update display with formatted current input
     */
    updateDisplay() {
        // Format large numbers with commas (optional, for readability)
        const displayValue = this.formatNumber(this.currentInput);
        this.display.value = displayValue;
    }

    /**
     * Format number for display (add thousand separators)
     */
    formatNumber(num) {
        const parts = num.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }

    /**
     * Handle keyboard input
     */
    handleKeyboard(e) {
        const key = e.key;

        // Number and decimal keys
        if ((key >= '0' && key <= '9') || key === '.') {
            e.preventDefault();
            this.handleNumber(key);
        }

        // Operator keys
        if (key === '+') {
            e.preventDefault();
            this.handleOperator('+');
        }
        if (key === '-') {
            e.preventDefault();
            this.handleOperator('-');
        }
        if (key === '*') {
            e.preventDefault();
            this.handleOperator('*');
        }
        if (key === '/') {
            e.preventDefault();
            this.handleOperator('/');
        }

        // Equals
        if (key === 'Enter' || key === '=') {
            e.preventDefault();
            this.calculate();
        }

        // Clear
        if (key === 'Escape') {
            e.preventDefault();
            this.clear();
        }

        // Backspace
        if (key === 'Backspace') {
            e.preventDefault();
            this.backspace();
        }
    }
}

// Initialize calculator when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
    console.log('✅ Calculator initialized successfully');
});
