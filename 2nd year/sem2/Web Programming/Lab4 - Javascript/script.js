document.addEventListener('DOMContentLoaded', () => {
    const appDiv = document.getElementById('app');

    const inputElement = document.createElement('textarea');
    inputElement.setAttribute('rows', '15');
    inputElement.setAttribute('cols', '50');
    inputElement.setAttribute('placeholder', 'Enter numbers separated by spaces');

    // Create button
    const buttonElement = document.createElement('button');
    buttonElement.textContent = 'Sort';

    // Create table element
    const tableElement = document.createElement('table');
    tableElement.setAttribute('border', '1');
    tableElement.style.borderCollapse = 'collapse';

    // Add elements to the appDiv
    appDiv.appendChild(inputElement);
    appDiv.appendChild(buttonElement);
    appDiv.appendChild(tableElement);

    buttonElement.addEventListener('click', () => {
        const inputValues = inputElement.value.replace(/\s+/g, " ").trim().split(" ");
        const sortedValues = inputValues.filter(Number).sort((a, b) => Number(a) - Number(b));
        console.log(sortedValues);
        const otherValues = inputValues.filter(value => !sortedValues.includes(value));
        console.log(otherValues);
        const finalValues = sortedValues.concat(otherValues);

        tableElement.innerHTML = '';

        for (let i = 0; i < finalValues.length; i += 5) {
            const row = tableElement.insertRow();
            for (let j = 0; j < 5; j++) {
                const cell = row.insertCell();
                const index = i + j;
                if (index < finalValues.length) {
                    cell.textContent = finalValues[index];
                }
            }
        }
    });
});