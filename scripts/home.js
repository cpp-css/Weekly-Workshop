document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.all-stocks-container');
    for (let i = 0; i < 10; i++) {
        const demoStock = createDemoStock('Vanguard');
        container.appendChild(demoStock);
    }
})

function createDemoStock(name) {
    const demoStockDiv = document.createElement('div');
    demoStockDiv.className = 'demo-stock';
    demoStockDiv.innerHTML = `
        <h2>${name}</h2>
    `;
    return demoStockDiv;
}