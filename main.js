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
    const airlineLuggageData = { "default": "Check with airline." };
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
        getLuggageInfo(airline);

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

    function handleQuestion(question) { /* ... existing handleQuestion logic ... */ }
    function isDateTooFarInFuture(dateString) { /* ... existing date logic ... */ }
    function getFlightsInfo(destination, fromAsk = false) { /* ... */ }
    function getHotelsInfo(destination, fromAsk = false) { /* ... */ }
    function getLuggageInfo(airline, fromAsk = false) { /* ... */ }
    function getEmbassyInfo(destination, nationality, fromAsk = false) { /* ... */ }
    function getVisaInfo(destination, nationality, fromAsk = false) { /* ... */ }
    function getDosAndDonts(destination, fromAsk = false) { /* ... */ }
    function getCountryInfo(destination, fromAsk = false) { /* ... */ }
    function getEmergencyNumbers(destination, fromAsk = false) { /* ... */ }
    function generateClothingAdvice(dailyWeather) { /* ... */ }
    function generatePackingList(dailyWeather, startDate, endDate) { /* ... */ }
    function mostCommon(arr) { /* ... */ }
    function getWeatherDescription(code) { /* ... */ }

    function getImages(destination) {
        const apiKey = 'ZgonpcSFd8s5CogZvcPvgr7TwCRAj1mBEsYcF5KezR78F2cBiDq2FpYM';
        const url = `https://api.pexels.com/v1/search?query=${destination}&per_page=1&orientation=landscape`;
        fetch(url, { headers: { Authorization: apiKey } }).then(response => response.json()).then(data => {
            if (data.photos.length > 0) {
                header.style.backgroundImage = `url(${data.photos[0].src.large2x})`;
            } else {
                header.style.backgroundImage = 'linear-gradient(to right, #6a11cb, #2575fc)';
            }
        }).catch(error => console.error('Error fetching images:', error));
    }

    function getSectionImages(destination) {
        const apiKey = 'ZgonpcSFd8s5CogZvcPvgr7TwCRAj1mBEsYcF5KezR78F2cBiDq2FpYM';
        const sections = {
            'flights-details': 'plane', 'hotels-details': 'hotel', 'clothing-details': 'clothes', 
            'visa-details': 'passport', 'luggage-details': 'luggage', 'cash-details': 'money', 
            'packing-list-details': 'suitcase', 'restrictions-details': 'sign', 'dos-donts-details': 'culture', 
            'embassy-details': 'embassy', 'insurance-details': 'insurance', 'dress-code-details': 'fashion', 
            'alcohol-details': 'cocktail', 'currency-details': 'currency', 'emergency-details': 'emergency', 
            'transport-details': 'train', 'safety-details': 'safe', 'places-details': 'map'
        };

        for (const [sectionId, query] of Object.entries(sections)) {
            const url = `https://api.pexels.com/v1/search?query=${destination} ${query}&per_page=1`;
            const imgElement = document.querySelector(`#${sectionId} img`);

            if (imgElement) {
                fetch(url, { headers: { Authorization: apiKey } }).then(response => response.json()).then(data => {
                    if (data.photos.length > 0) {
                        imgElement.src = data.photos[0].src.medium;
                    } else {
                        // Fallback image if no specific image is found
                        imgElement.src = `https://via.placeholder.com/300x150?text=${query.replace(' ', '+')}`;
                    }
                }).catch(error => console.error(`Error fetching section image for ${sectionId}:`, error));
            }
        }
    }
    
    function getWeather(destination, startDate, endDate, fromAsk = false) {
        const geocodingUrl = `https://nominatim.openstreetmap.org/search?q=${destination}&format=json&limit=1`;
        fetch(geocodingUrl).then(response => response.json()).then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];
                const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&start_date=${startDate}&end_date=${endDate}`;
                fetch(weatherUrl).then(response => response.json()).then(weatherData => {
                    if (weatherData.daily && weatherData.daily.time.length > 0) {
                        const advice = generateClothingAdvice(weatherData.daily);
                        if (fromAsk) {
                            displayAnswer(advice);
                        } else {
                            clothingAdvice.innerHTML = advice;
                            generatePackingList(weatherData.daily, startDate, endDate);
                        }
                    } else {
                        const errorMsg = 'Could not fetch weather forecast. Check dates and try again.';
                        if (fromAsk) displayAnswer(errorMsg); else clothingAdvice.textContent = errorMsg;
                    }
                }).catch(error => console.error('Error fetching weather data:', error));
            } else {
                const errorMsg = 'Could not find location for weather forecast.';
                if (fromAsk) displayAnswer(errorMsg); else clothingAdvice.textContent = errorMsg;
            }
        }).catch(error => console.error('Error fetching geocoding data:', error));
    }
});