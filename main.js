document.addEventListener('DOMContentLoaded', () => {
    const getAdviceBtn = document.getElementById('get-advice-btn');
    const askBtn = document.getElementById('ask-btn');
    const destinationInput = document.getElementById('destination');
    const nationalityInput = document.getElementById('nationality');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const airlineInput = document.getElementById('airline');
    const questionInput = document.getElementById('question-input');
    const header = document.querySelector('header');
    const themeToggle = document.getElementById('checkbox');

    const clothingAdvice = document.getElementById('clothing-advice');
    const currencyInfo = document.getElementById('currency-info');
    const emergencyNumbers = document.getElementById('emergency-numbers');
    const flightsInfo = document.getElementById('flights-info');
    const hotelsInfo = document.getElementById('hotels-info');
    const visaInfo = document.getElementById('visa-info');
    const packingList = document.getElementById('packing-list');
    const dosDontsInfo = document.getElementById('dos-donts-info');
    const embassyInfo = document.getElementById('embassy-info');
    const luggageInfo = document.getElementById('luggage-info');
    const askAnswerContainer = document.getElementById('ask-answer-container');

    const emergencyNumbersData = { "USA": "911", "default": "112" };
    const nationalityMapping = { "us": "USA", "american": "USA" };
    const visaFreeData = { "USA": ["Canada", "Mexico"] };
    const dosAndDontsData = { "default": { "dos": [], "donts": [] } };
    const knowledgeBase = {};

    getAdviceBtn.addEventListener('click', () => {
        const destination = destinationInput.value.trim();
        const nationality = nationalityInput.value.trim();
        const startDate = startDateInput.value.trim();
        const endDate = endDateInput.value.trim();
        const airline = airlineInput.value.trim();

        if (!destination || !nationality) {
            alert('Please enter destination and nationality.');
            return;
        }

        getCountryInfo(destination);
        getEmergencyNumbers(destination);
        getFlightsInfo(destination);
        getHotelsInfo(destination);
        getVisaInfo(destination, nationality);
        getImages(destination);
        getSectionImages(destination);
        getDosAndDonts(destination);
        getEmbassyInfo(destination, nationality);
        if (airline) getLuggageInfo(airline);

        if (startDate && endDate) {
            if (isDateTooFarInFuture(startDate)) {
                alert('Weather forecast is only for the next 16 days.');
            } else {
                getWeather(destination, startDate, endDate);
            }
        } 
    });

    askBtn.addEventListener('click', () => {
        const question = questionInput.value.toLowerCase().trim();
        if (question) handleQuestion(question);
    });

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    });

    function displayAnswer(answer) {
        askAnswerContainer.innerHTML = answer;
        askAnswerContainer.style.display = 'block';
    }

    function handleQuestion(question) { 
        const airline = airlineInput.value.trim();
        if(question.includes("luggage") || question.includes("baggage")){
            if(airline) getLuggageInfo(airline, true);
            else alert("Please enter an airline first.");
        }        
    }
    
    function isDateTooFarInFuture(dateString) {
        const today = new Date();
        const selectedDate = new Date(dateString);
        const diffTime = selectedDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 16;
    }

    function getFlightsInfo(destination, fromAsk = false) { /* ... */ }
    function getHotelsInfo(destination, fromAsk = false) { /* ... */ }

    function getLuggageInfo(airline, fromAsk = false) {
        const query = `${airline} baggage allowance`;
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        const info = `Airline baggage policies change frequently. <a href="${url}" target="_blank">Click here to find the most up-to-date baggage information for ${airline}.</a>`;
        if (fromAsk) {
            displayAnswer(info);
        } else {
            luggageInfo.innerHTML = info;
        }
    }

    function getEmbassyInfo(destination, nationality, fromAsk = false) { /* ... */ }
    function getVisaInfo(destination, nationality, fromAsk = false) { /* ... */ }
    function getDosAndDonts(destination, fromAsk = false) { /* ... */ }
    function getCountryInfo(destination, fromAsk = false) { /* ... */ }
    function getEmergencyNumbers(destination, fromAsk = false) { /* ... */ }
    function generateClothingAdvice(dailyWeather) { /* ... */ }
    function generatePackingList(dailyWeather, startDate, endDate) { /* ... */ }
    function mostCommon(arr) { /* ... */ }
    function getWeatherDescription(code) { /* ... */ }
    function getImages(destination) { /* ... */ }
    function getSectionImages(destination) { /* ... */ }
    function getWeather(destination, startDate, endDate, fromAsk = false) { /* ... */ }
});