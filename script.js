const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let resetNext = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('number')) {
      if (resetNext) {
        currentInput = '';
        resetNext = false;
      }
      if (value === '.' && currentInput.endsWith('.')) return;
      currentInput += value;
    }

    if (button.classList.contains('operator')) {
      if (/[+\-×÷]$/.test(currentInput)) {
        currentInput = currentInput.slice(0, -1) + value;
      } else {
        currentInput += value;
      }
    }

    if (button.classList.contains('clear')) {
      currentInput = '';
    }

    if (button.classList.contains('del')) {
      currentInput = currentInput.slice(0, -1);
    }

    if (button.classList.contains('equal')) {
      try {
        const expression = currentInput
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/−/g, '-');

        currentInput = eval(expression).toString();
        resetNext = true;
      } catch (e) {
        currentInput = 'Error';
        resetNext = true;
      }
    }

    display.textContent = currentInput || '0';
  });
});