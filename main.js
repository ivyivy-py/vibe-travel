document.getElementById("generate-btn").addEventListener("click", () => {
    const numbersContainer = document.getElementById("numbers-container");
    numbersContainer.innerHTML = "";
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 49) + 1);
    }
    for (const number of numbers) {
        const numberEl = document.createElement("div");
        numberEl.classList.add("number");
        numberEl.textContent = number;
        numbersContainer.appendChild(numberEl);
    }
});