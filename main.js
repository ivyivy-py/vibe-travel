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

    const emergencyNumbersData = {
        "USA": "911", "United Kingdom": "999", "Canada": "911", "Australia": "000",
        "New Zealand": "111", "India": "112", "default": "112 or 911"
    };

    const nationalityMapping = {
        "us": "USA", "usa": "USA", "united states": "USA", "american": "USA",
        "uk": "United Kingdom", "united kingdom": "United Kingdom", "british": "United Kingdom",
        "can": "Canada", "canada": "Canada", "canadian": "Canada",
        "de": "Germany", "germany": "Germany", "german": "Germany",
        "fr": "France", "france": "France", "french": "France"
    };

    const visaFreeData = {
        "USA": ["Canada", "Mexico", "Japan", "United Kingdom"],
        "United Kingdom": ["USA", "Canada", "France", "Germany", "Spain", "Italy"],
        "Canada": ["USA", "United Kingdom", "France", "Mexico"],
        "Germany": ["France", "United Kingdom", "Italy", "Spain"],
        "France": ["Germany", "United Kingdom", "Italy", "Spain"]
    };

    const airlineLuggageData = {
        "american airlines": "1 carry-on bag and 1 personal item. Checked bags: 23kg weight limit.",
        "delta": "1 carry-on bag and 1 personal item. Checked bags: 23kg weight limit.",
        "united": "1 carry-on bag and 1 personal item. Basic Economy may have different rules. Checked bags: 23kg weight limit.",
        "ryanair": "1 small personal bag. Larger carry-on and checked bags must be paid for.",
        "easyjet": "1 small cabin bag. Larger cabin bag and checked bags must be paid for.",
        "default": "Most airlines allow 1 carry-on and 1 personal item. Check with your airline for specific weight and size limits."
    };

    const dosAndDontsData = {
        "japan": {
            "dos": ["Bow when greeting someone.", "Slurp your noodles."],
            "donts": ["Don't tip.", "Don't wear shoes inside homes."]
        },
        "italy": {
            "dos": ["Greet people with 'buongiorno'.", "Embrace 'aperitivo' culture."],
            "donts": ["Don't order a cappuccino after 11 AM.", "Don't put cheese on seafood pasta."]
        },
        "default": {
            "dos": ["Learn basic local phrases.", "Try local cuisine."],
            "donts": ["Don't assume everyone speaks English.", "Don't disrespect local customs."]
        }
    };

    const knowledgeBase = {
        "cash": "Most countries regulate the amount of cash you can carry. Check the customs website of your destination.",
        "restrictions": "Stay updated on travel advisories by checking official government websites.",
        "dress code": "Dress modestly, especially when visiting religious sites.",
        "alcohol": "Be aware of local laws regarding alcohol consumption.",
        "transport": "Most destinations offer public transit, taxis, and ride-sharing.",
        "safety": "Be aware of your surroundings and have travel insurance.",
        "places": "Research popular and off-the-beaten-path attractions.",
        "date format": "Use YYYY-MM-DD. Our weather forecast is limited to the next 16 days.",
        "insurance": "It is highly recommended to have travel insurance. Popular options include World Nomads, IMG, and Allianz."
    };

    getAdviceBtn.addEventListener('click', () => {
        const destination = destinationInput.value.trim();
        const nationality = nationalityInput.value.trim();
        const startDate = startDateInput.value.trim();
        const endDate = endDateInput.value.trim();
        const airline = airlineInput.value.trim();

        if (!destination || !nationality) {
            alert('Please enter both a destination and your nationality.');
            return;
        }

        getCountryInfo(destination);
        getEmergencyNumbers(destination);
        getFlightsInfo(destination);
        getHotelsInfo(destination);
        getVisaInfo(destination, nationality);
        getImages(destination);
        getDosAndDonts(destination);
        getEmbassyInfo(destination, nationality);
        getLuggageInfo(airline);

        if (startDate && endDate) {
            if (isDateTooFarInFuture(startDate)) {
                alert('The weather forecast is only available for the next 16 days. Please choose a closer date.');
            } else {
                getWeather(destination, startDate, endDate);
            }
        } 
    });

    askBtn.addEventListener('click', () => {
        const question = questionInput.value.toLowerCase().trim();
        if (question) handleQuestion(question);
    });

    function displayAnswer(answer) {
        askAnswerContainer.innerHTML = answer;
        askAnswerContainer.style.display = 'block';
    }

    function handleQuestion(question) {
        const destination = destinationInput.value.trim();
        const nationality = nationalityInput.value.trim();
        const startDate = startDateInput.value.trim();
        const endDate = endDateInput.value.trim();
        const airline = airlineInput.value.trim();

        const keywords = {
            "flight": getFlightsInfo, "hotel": getHotelsInfo,
            "wear": getWeather, "clothe": getWeather, "pack": getWeather,
            "visa": getVisaInfo, "currency": getCountryInfo, "money": getCountryInfo,
            "emergency": getEmergencyNumbers, "help": getEmergencyNumbers,
            "dos": getDosAndDonts, "don'ts": getDosAndDonts, "etiquette": getDosAndDonts,
            "embassy": getEmbassyInfo, "consulate": getEmbassyInfo,
            "luggage": getLuggageInfo, "baggage": getLuggageInfo,
            // Knowledge Base
            "cash": () => displayAnswer(knowledgeBase.cash),
            "restriction": () => displayAnswer(knowledgeBase.restrictions),
            "dress code": () => displayAnswer(knowledgeBase["dress code"]),
            "alcohol": () => displayAnswer(knowledgeBase.alcohol),
            "transport": () => displayAnswer(knowledgeBase.transport),
            "safety": () => displayAnswer(knowledgeBase.safety),
            "place": () => displayAnswer(knowledgeBase.places),
            "date": () => displayAnswer(knowledgeBase["date format"]),
            "insurance": () => displayAnswer(knowledgeBase.insurance)
        };

        let action = null;
        for (const keyword in keywords) {
            if (question.includes(keyword)) { action = keywords[keyword]; break; }
        }

        if (!action) {
            displayAnswer("Sorry, I don't have information on that topic.");
            return;
        }

        if (action === getWeather) {
            if (!destination || !startDate || !endDate) alert('Please provide destination, start date, and end date for weather advice.');
            else if (isDateTooFarInFuture(startDate)) alert('Weather forecast is only for the next 16 days.');
            else getWeather(destination, startDate, endDate, true);
        } else if (action === getVisaInfo) {
            if (!destination || !nationality) alert('Please provide destination and nationality for visa advice.');
            else getVisaInfo(destination, nationality, true);
        } else if (action === getCountryInfo) {
            if (!destination) alert('Please provide a destination for currency information.');
            else getCountryInfo(destination, true);
        } else if (action === getEmergencyNumbers) {
            if (!destination) alert('Please provide a destination for emergency numbers.');
            else getEmergencyNumbers(destination, true);
        } else if (action === getFlightsInfo) {
            if (!destination) alert('Please provide a destination for flight information.');
            else getFlightsInfo(destination, true);
        } else if (action === getHotelsInfo) {
            if (!destination) alert('Please provide a destination for hotel information.');
            else getHotelsInfo(destination, true);
        } else if (action === getDosAndDonts) {
            if (!destination) alert('Please provide a destination for cultural advice.');
            else getDosAndDonts(destination, true);
        } else if (action === getEmbassyInfo) {
            if (!destination || !nationality) alert('Please provide destination and nationality for embassy information.');
            else getEmbassyInfo(destination, nationality, true);
        } else if (action === getLuggageInfo) {
            if (!airline) alert('Please provide an airline for luggage information.');
            else getLuggageInfo(airline, true);
        } else {
            action();
        }
    }

    function isDateTooFarInFuture(dateString) {
        const today = new Date();
        const selectedDate = new Date(dateString);
        const diffTime = selectedDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 16;
    }

    function getFlightsInfo(destination, fromAsk = false) {
        const info = `Find flights to ${destination} on <a href="https://www.google.com/flights" target="_blank">Google Flights</a>, <a href="https://www.skyscanner.com" target="_blank">Skyscanner</a>, and <a href="https://www.kayak.com" target="_blank">Kayak</a>.`;
        if (fromAsk) displayAnswer(info); else flightsInfo.innerHTML = info;
    }

    function getHotelsInfo(destination, fromAsk = false) {
        const info = `Find hotels in ${destination} on <a href="https://www.booking.com" target="_blank">Booking.com</a>, <a href="https://www.airbnb.com" target="_blank">Airbnb</a>, and <a href="https://www.expedia.com" target="_blank">Expedia</a>.`;
        if (fromAsk) displayAnswer(info); else hotelsInfo.innerHTML = info;
    }

    function getLuggageInfo(airline, fromAsk = false) {
        const lowerAirline = airline.toLowerCase();
        let info = airlineLuggageData.default;
        for (const name in airlineLuggageData) {
            if (lowerAirline.includes(name)) {
                info = airlineLuggageData[name];
                break;
            }
        }
        if (fromAsk) displayAnswer(info); else luggageInfo.innerHTML = info;
    }

    function getEmbassyInfo(destination, nationality, fromAsk = false) {
        const mappedNationality = nationalityMapping[nationality.toLowerCase()] || nationality;
        const query = `${mappedNationality} embassy in ${destination}`;
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        const info = `You can find the ${mappedNationality} embassy in ${destination} by searching online. <a href="${url}" target="_blank">Click here to search.</a>`;
        if (fromAsk) displayAnswer(info); else embassyInfo.innerHTML = info;
    }

    function getVisaInfo(destination, nationality, fromAsk = false) {
        const mappedNationality = nationalityMapping[nationality.toLowerCase()] || nationality;
        const requiresVisa = !(visaFreeData[mappedNationality] && visaFreeData[mappedNationality].some(d => destination.toLowerCase().includes(d.toLowerCase())));
        let info = requiresVisa ? `As a citizen of <strong>${mappedNationality}</strong>, you will likely need a visa for <strong>${destination}</strong>.` : `As a citizen of <strong>${mappedNationality}</strong>, you likely do not need a visa for short trips to <strong>${destination}</strong>.`;
        info += " Please check the official embassy website for the most up-to-date information.";
        if (fromAsk) displayAnswer(info); else visaInfo.innerHTML = info;
    }

    function getDosAndDonts(destination, fromAsk = false) {
        const lowerDestination = destination.toLowerCase();
        let advice = dosAndDontsData.default;
        for (const country in dosAndDontsData) {
            if (lowerDestination.includes(country)) { advice = dosAndDontsData[country]; break; }
        }
        let info = '<strong>Dos:</strong><ul>';
        advice.dos.forEach(item => { info += `<li>${item}</li>`; });
        info += '</ul><strong>Don\'ts:</strong><ul>';
        advice.donts.forEach(item => { info += `<li>${item}</li>`; });
        info += '</ul>';
        if (fromAsk) displayAnswer(info); else dosDontsInfo.innerHTML = info;
    }

    function getImages(destination) {
        const apiKey = 'ZgonpcSFd8s5CogZvcPvgr7TwCRAj1mBEsYcF5KezR78F2cBiDq2FpYM';
        const url = `https://api.pexels.com/v1/search?query=${destination}&per_page=1`;
        fetch(url, { headers: { Authorization: apiKey } }).then(response => response.json()).then(data => {
            if (data.photos.length > 0) {
                header.style.backgroundImage = `url(${data.photos[0].src.large2x})`;
            } else {
                header.style.backgroundImage = 'linear-gradient(to right, #6a11cb, #2575fc)';
            }
        }).catch(error => console.error('Error fetching images:', error));
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

    function generateClothingAdvice(dailyWeather) {
        const avgMaxTemp = dailyWeather.temperature_2m_max.reduce((a, b) => a + b) / dailyWeather.temperature_2m_max.length;
        let advice = '<strong>Clothing Recommendations:</strong><ul>';
        if (avgMaxTemp > 25) advice += '<li>Pack light clothing: shorts, t-shirts, and sandals.</li>';
        else if (avgMaxTemp > 15) advice += '<li>Pack layers: t-shirts, long-sleeved shirts, and a light jacket.</li>';
        else advice += '<li>Pack warm clothing: sweaters, jackets, and trousers.</li>';
        const mostCommonWeatherCode = mostCommon(dailyWeather.weathercode);
        const weatherDescription = getWeatherDescription(mostCommonWeatherCode);
        if (weatherDescription.includes('Rain')) advice += '<li>A waterproof jacket and umbrella are recommended.</li>';
        else if (weatherDescription.includes('Snow')) advice += '<li>Pack a heavy coat, gloves, and a hat.</li>';
        advice += '</ul>';
        return advice;
    }

    function generatePackingList(dailyWeather, startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        
        let packingListHTML = `<h4>Recommended Packing for ${duration} days:</h4><ul>`;
        const baseItems = ['Passport', 'Tickets', 'Hotel Confirmation', 'Toothbrush', 'Toothpaste', 'Phone Charger'];
        baseItems.forEach(item => packingListHTML += `<li><input type="checkbox"> ${item}</li>`);

        const avgMaxTemp = dailyWeather.temperature_2m_max.reduce((a, b) => a + b) / dailyWeather.temperature_2m_max.length;
        let clothingItems = [];
        if (avgMaxTemp > 25) {
            clothingItems = [ {item: 'T-shirt', qty: duration}, {item: 'Shorts', qty: Math.ceil(duration/2)}, {item: 'Sandals', qty: 1}, {item: 'Sunscreen', qty: 1}, {item: 'Sunglasses', qty: 1}, {item: 'Hat', qty: 1} ];
        } else if (avgMaxTemp > 15) {
            clothingItems = [ {item: 'T-shirt', qty: duration}, {item: 'Long-sleeved shirt', qty: duration}, {item: 'Light jacket', qty: 1}, {item: 'Jeans', qty: Math.ceil(duration/2)} ];
        } else {
            clothingItems = [ {item: 'Sweater', qty: duration}, {item: 'Jacket', qty: 1}, {item: 'Trousers', qty: duration}, {item: 'Scarf', qty: 1}, {item: 'Gloves', qty: 1} ];
        }

        const weatherDescription = getWeatherDescription(mostCommon(dailyWeather.weathercode));
        if (weatherDescription.includes('Rain')) clothingItems.push({item: 'Waterproof jacket', qty: 1}, {item: 'Umbrella', qty: 1});
        if (weatherDescription.includes('Snow')) clothingItems.push({item: 'Winter coat', qty: 1}, {item: 'Boots', qty: 1});

        clothingItems.forEach(item => packingListHTML += `<li><input type="checkbox"> ${item.item} (x${item.qty})</li>`);
        packingListHTML += '</ul>';
        packingList.innerHTML = packingListHTML;
    }

    function getCountryInfo(destination, fromAsk = false) {
        const url = `https://restcountries.com/v3.1/name/${destination}`;
        fetch(url).then(response => response.json()).then(data => {
            if (data.length > 0) {
                const country = data[0];
                const currencyCode = Object.keys(country.currencies)[0];
                const currency = country.currencies[currencyCode];
                const info = `The local currency is the <strong>${currency.name} (${currencyCode})</strong>.`;
                if (fromAsk) displayAnswer(info); else currencyInfo.innerHTML = info;
            } else {
                const errorMsg = 'Could not find currency information.';
                if (fromAsk) displayAnswer(errorMsg); else currencyInfo.textContent = errorMsg;
            }
        }).catch(error => console.error('Error fetching country data:', error));
    }

    function getEmergencyNumbers(destination, fromAsk = false) {
        let number = emergencyNumbersData.default;
        for (const country in emergencyNumbersData) {
            if (destination.toLowerCase().includes(country.toLowerCase())) { number = emergencyNumbersData[country]; break; }
        }
        const info = `The primary emergency number is <strong>${number}</strong>.`;
        if (fromAsk) displayAnswer(info); else emergencyNumbers.innerHTML = info;
    }

    function mostCommon(arr) {
        return arr.sort((a,b) => arr.filter(v => v===a).length - arr.filter(v => v===b).length).pop();
    }

    function getWeatherDescription(code) {
        const descriptions = {
            0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast', 45: 'Fog', 48: 'Depositing rime fog',
            51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle', 56: 'Light freezing drizzle', 57: 'Dense freezing drizzle',
            61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain', 66: 'Light freezing rain', 67: 'Heavy freezing rain',
            71: 'Slight snow fall', 73: 'Moderate snow fall', 75: 'Heavy snow fall', 77: 'Snow grains',
            80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
            85: 'Slight snow showers', 86: 'Heavy snow showers', 95: 'Thunderstorm', 
            96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail'
        };
        return descriptions[code] || 'Unknown weather';
    }
});