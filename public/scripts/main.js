document.addEventListener("DOMContentLoaded", () => {
    const citySelect = document.getElementById('city-select');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const submitButton = document.getElementById('submit-btn');
    const chartContainer = document.getElementById('chart-container');

    const loadData = async (city, startDate, endDate) => {
        const response = await fetch(`/data/${city}`);
        const data = await response.json();
    };

    submitButton.addEventListener('click', () => {
        const city = citySelect.value;
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        loadData(city, startDate, endDate);
    });
});
