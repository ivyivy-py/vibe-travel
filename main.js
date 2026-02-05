document.addEventListener('DOMContentLoaded', () => {
    const getAdviceBtn = document.getElementById('get-advice-btn');
    const askBtn = document.getElementById('ask-btn');
    const destinationInput = document.getElementById('destination');
    const nationalityInput = document.getElementById('nationality');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const questionInput = document.getElementById('question-input');
    const header = document.querySelector('header');

    // Night/Day Mode Implementation
    const modeToggleBtn = document.getElementById('mode-toggle');
    const body = document.body;

    const applyTheme = (isNight) => {
        if (isNight) {
            body.classList.add('night-mode');
            modeToggleBtn.textContent = 'Day Mode';
        } else {
            body.classList.remove('night-mode');
            modeToggleBtn.textContent = 'Night Mode';
        }
    };

    // Load saved theme from localStorage or default to day mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'night') {
        applyTheme(true);
    } else {
        applyTheme(false); // Default to day mode if no preference or 'day'
    }

    modeToggleBtn.addEventListener('click', () => {
        const isNight = body.classList.toggle('night-mode');
        localStorage.setItem('theme', isNight ? 'night' : 'day');
        modeToggleBtn.textContent = isNight ? 'Day Mode' : 'Night Mode';
    });
    // End Night/Day Mode Implementation

    const clothingAdvice = document.getElementById('clothing-advice');
    const currencyInfo = document.getElementById('currency-info');
    const emergencyNumbers = document.getElementById('emergency-numbers');
    const flightsInfo = document.getElementById('flights-info');
    const hotelsInfo = document.getElementById('hotels-info');
    const visaInfo = document.getElementById('visa-info');
    const packingList = document.getElementById('packing-list');
    const dosDontsInfo = document.getElementById('dos-donts-info');
    const askAnswerContainer = document.getElementById('ask-answer-container');

    const emergencyNumbersData = {
        "USA": "911",
        "United Kingdom": "999",
        "Canada": "911",
        "Australia": "000",
        "New Zealand": "111",
        "India": "112",
        "default": "112 or 911"
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
    
    const dosAndDontsData = {
        "japan": {
            "dos": [
                "Bow when greeting someone.",
                "Slurp your noodles; it shows appreciation.",
                "Use the provided wet towel to clean your hands before eating.",
                "Carry your trash with you as public bins are rare."
            ],
            "donts": [
                "Don't tip. It can be considered rude.",
                "Don't wear shoes inside homes or traditional establishments.",
                "Don't talk loudly on public transportation.",
                "Don't stick your chopsticks upright in your rice."
            ]
        },
        "italy": {
            "dos": [
                "Greet people with 'buongiorno' (good morning) or 'buonasera' (good evening).",
                "Expect to pay a 'coperto' (cover charge) at many restaurants.",
                "Embrace the 'aperitivo' culture in the early evening.",
                "Dress smartly, especially when visiting churches."
            ],
            "donts": [
                "Don't order a cappuccino after 11 AM.",
                "Don't expect a large breakfast; a coffee and pastry is typical.",
                "Don't put cheese on a seafood pasta dish.",
                "Don't rush your meals; enjoy the experience."
            ]
        },
        "default": {
            "dos": [
                "Learn a few basic phrases in the local language.",
                "Be mindful of your attire, especially when visiting religious sites.",
                "Try the local cuisine.",
                "Be open to new experiences and cultures."
            ],
            "donts": [
                "Don't assume everyone speaks English.",
                "Don't engage in public displays of affection in conservative areas.",
                "Don't be afraid to ask for directions.",
                "Don't disrespect local customs or traditions."
            ]
        }
    };

    const knowledgeBase = {
        "luggage": "Luggage allowances are set by airlines. Check with your airline for specific rules on weight, dimensions, and prohibited items. Generally, liquids in carry-on luggage should be in containers of 100ml or less.",
        "cash": "Most countries regulate the amount of cash you can carry across their borders without declaring it. This is typically around $10,000 USD, but can vary. Check the customs website of your destination for specifics.",
        "restrictions": "Stay updated on the latest travel advisories and entry requirements by checking the official government websites of your destination country.",
        "dress code": "Dress modestly, especially when visiting religious sites. Casual and comfortable clothing is usually acceptable for tourist areas. For upscale restaurants, smart casual is often expected.",
        "alcohol": "Laws and social norms regarding alcohol vary widely. In some countries, it is readily available, while in others, it is restricted or prohibited. Be aware of local laws.",
        "transport": "Most destinations offer public transit (buses, trains), taxis, and ride-sharing services. For more flexibility, consider renting a car.",
        "safety": "Stay aware of your surroundings and protect your belongings. Avoid walking alone at night in unfamiliar areas. It's a good idea to have travel insurance.",
        "places": "Explore a mix of popular tourist attractions and off-the-beaten-path gems. Research in advance to create an itinerary that matches your interests.",
        "date format": "The correct format is YYYY-MM-DD. For example, April 1st, 2026 would be written as 2026-04-01. Note that our weather forecast is limited to the next 16 days."
    };

    getAdviceBtn.addEventListener('click', () => {
        const destination = destinationInput.value.trim();
        const nationality = nationalityInput.value.trim();
        const startDate = startDateInput.value.trim();
        const endDate = endDateInput.value.trim();

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
        if (question) {
            handleQuestion(question);
        }
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

        const keywords = {
            "flights": getFlightsInfo,
            "hotel": getHotelsInfo,
            "wear": getWeather,
            "clothe": getWeather,
            "pack": getWeather,
            "visa": getVisaInfo,
            "currency": getCountryInfo,
            "money": getCountryInfo,
            "emergency": getEmergencyNumbers,
            "help": getEmergencyNumbers,
            "dos": getDosAndDonts,
            "don'ts": getDosAndDonts,
            "etiquette": getDosAndDonts,
            // Knowledge Base keywords
            "luggage": () => displayAnswer(knowledgeBase.luggage),
            "baggage": () => displayAnswer(knowledgeBase.luggage),
            "cash": () => displayAnswer(knowledgeBase.cash),
            "restriction": () => displayAnswer(knowledgeBase.restrictions),
            "dress code": () => displayAnswer(knowledgeBase["dress code"]),
            "alcohol": () => displayAnswer(knowledgeBase.alcohol),
            "drink": () => displayAnswer(knowledgeBase.alcohol),
            "transport": () => displayAnswer(knowledgeBase.transport),
            "car": () => displayAnswer(knowledgeBase.transport),
            "bus": () => displayAnswer(knowledgeBase.transport),
            "train": () => displayAnswer(knowledgeBase.transport),
            "safe": () => displayAnswer(knowledgeBase.safety),
            "safety": () => displayAnswer(knowledgeBase.safety),
            "place": () => displayAnswer(knowledgeBase.places),
            "see": () => displayAnswer(knowledgeBase.places),
            "do": () => displayAnswer(knowledgeBase.places),
            "attraction": () => displayAnswer(knowledgeBase.places),
            "date": () => displayAnswer(knowledgeBase["date format"])
        };

        let action = null;
        for (const keyword in keywords) {
            if (question.includes(keyword)) {
                action = keywords[keyword];
                break;
            }
        }

        if (!action) {
            displayAnswer("Sorry, I don't have information on that topic. Please try asking a different question.");
            return;
        }

        // Execute the action
        if (action === getWeather) {
            if (!destination || !startDate || !endDate) {
                alert('To get weather-related advice, please enter a destination, start date, and end date first.');
            } else if (isDateTooFarInFuture(startDate)){
                 alert('The weather forecast is only available for the next 16 days. Please choose a closer date.');
            }else {
                getWeather(destination, startDate, endDate, true);
            }
        } else if (action === getVisaInfo) {
            if (!destination || !nationality) {
                alert('To get visa advice, please enter a destination and your nationality first.');
            } else {
                getVisaInfo(destination, nationality, true);
            }
        } else if (action === getCountryInfo) {
            if (!destination) {
                alert('To get currency information, please enter a destination first.');
            } else {
                getCountryInfo(destination, true);
            }
        } else if (action === getEmergencyNumbers) {
            if (!destination) {
                alert('To get emergency numbers, please enter a destination first.');
            } else {
                getEmergencyNumbers(destination, true);
            }
        } else if (action === getFlightsInfo) {
            if (!destination) {
                alert('To get flight information, please enter a destination first.');
            } else {
                getFlightsInfo(destination, true);
            }
        } else if (action === getHotelsInfo) {
            if (!destination) {
                alert('To get hotel information, please enter a destination first.');
            } else {
                getHotelsInfo(destination, true);
            }
        } else if (action === getDosAndDonts) {
            if (!destination) {
                alert('To get cultural advice, please enter a destination first.');
            } else {
                getDosAndDonts(destination, true);
            }
        } else {
            action(); // For knowledge base entries
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
        const info = `You can find flights to ${destination} on websites like <a href="https://www.google.com/flights" target="_blank">Google Flights</a>, <a href="https://www.skyscanner.com" target="_blank">Skyscanner</a>, and <a href="https://www.kayak.com" target="_blank">Kayak</a>.`;
        if (fromAsk) {
            displayAnswer(info);
        } else {
            flightsInfo.innerHTML = info;
        }
    }

    function getHotelsInfo(destination, fromAsk = false) {
        const info = `You can find hotels in ${destination} on websites like <a href="https://www.booking.com" target="_blank">Booking.com</a>, <a href="https://www.airbnb.com" target="_blank">Airbnb</a>, and <a href="https://www.expedia.com" target="_blank">Expedia</a>.`;
        if (fromAsk) {
            displayAnswer(info);
        } else {
            hotelsInfo.innerHTML = info;
        }
    }

    function getVisaInfo(destination, nationality, fromAsk = false) {
        const lowerNationality = nationality.toLowerCase();
        const mappedNationality = nationalityMapping[lowerNationality] || nationality;
        const requiresVisa = !(visaFreeData[mappedNationality] && visaFreeData[mappedNationality].some(d => destination.toLowerCase().includes(d.toLowerCase())));
        let info;
        if (requiresVisa) {
            info = `As a citizen of <strong>${mappedNationality}</strong>, you will likely need a visa for <strong>${destination}</strong>. Please check the official embassy or consulate website of your destination country for the most up-to-date information.`;
        } else {
            info = `As a citizen of <strong>${mappedNationality}</strong>, you likely do not need a visa for short trips to <strong>${destination}</strong>. However, it is crucial to verify this with the official embassy.`;
        }
        if (fromAsk) {
            displayAnswer(info);
        } else {
            visaInfo.innerHTML = info;
        }
    }

    function getDosAndDonts(destination, fromAsk = false) {
        const lowerDestination = destination.toLowerCase();
        let advice = dosAndDontsData.default;

        for (const country in dosAndDontsData) {
            if (lowerDestination.includes(country)) {
                advice = dosAndDontsData[country];
                break;
            }
        }
        
        let info = '<strong>Dos:</strong><ul>';
        advice.dos.forEach(item => { info += `<li>${item}</li>`; });
        info += '</ul><strong>Don\'ts:</strong><ul>';
        advice.donts.forEach(item => { info += `<li>${item}</li>`; });
        info += '</ul>';

        if (fromAsk) {
            displayAnswer(info);
        } else {
            dosDontsInfo.innerHTML = info;
        }
    }

    function getImages(destination) {
        const apiKey = 'ZgonpcSFd8s5CogZvcPvgr7TwCRAj1mBEsYcF5KezR78F2cBiDq2FpYM';
        const url = `https://api.pexels.com/v1/search?query=${destination}&per_page=1`;
        fetch(url, { headers: { Authorization: apiKey } })
            .then(response => response.json())
            .then(data => {
                if (data.photos.length > 0) {
                    header.style.backgroundImage = `url(${data.photos[0].src.large2x})`;
                } else {
                    header.style.backgroundImage = 'linear-gradient(to right, #6a11cb, #2575fc)';
                }
            }).catch(error => {
                console.error('Error fetching images:', error);
                header.style.backgroundImage = 'linear-gradient(to right, #6a11cb, #2575fc)';
            });
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
                            generatePackingList(weatherData.daily);
                        }
                    } else {
                        const errorMsg = 'Could not fetch a specific weather forecast for your dates. Please check the date format (YYYY-MM-DD) and try again.';
                        if (fromAsk) displayAnswer(errorMsg); else clothingAdvice.textContent = errorMsg;
                    }
                }).catch(error => {
                    console.error('Error fetching weather data:', error);
                    const errorMsg = 'Could not fetch weather forecast. Please try again.';
                    if (fromAsk) displayAnswer(errorMsg); else clothingAdvice.textContent = errorMsg;
                });
            } else {
                const errorMsg = 'Could not find the location for the weather forecast. Please check the destination spelling.';
                if (fromAsk) displayAnswer(errorMsg); else clothingAdvice.textContent = errorMsg;
            }
        }).catch(error => {
            console.error('Error fetching geocoding data:', error);
            const errorMsg = 'Could not fetch location data for the weather forecast. Please try again.';
            if (fromAsk) displayAnswer(errorMsg); else clothingAdvice.textContent = errorMsg;
        });
    }

    function generateClothingAdvice(dailyWeather) {
        const avgMaxTemp = dailyWeather.temperature_2m_max.reduce((a, b) => a + b) / dailyWeather.temperature_2m_max.length;
        const avgMinTemp = dailyWeather.temperature_2m_min.reduce((a, b) => a + b) / dailyWeather.temperature_2m_min.length;
        const mostCommonWeatherCode = mostCommon(dailyWeather.weathercode);
        const weatherDescription = getWeatherDescription(mostCommonWeatherCode);
        let advice = '<strong>Clothing Recommendations:</strong><ul>';
        advice += `<li>Expect temperatures between ${avgMinTemp.toFixed(1)}°C and ${avgMaxTemp.toFixed(1)}°C.</li>`;
        advice += `<li>The weather will be mostly ${weatherDescription}.</li>`;
        if (avgMaxTemp > 25) {
            advice += '<li>Pack light clothing: shorts, t-shirts, and sandals.</li>';
        } else if (avgMaxTemp > 15) {
            advice += '<li>Pack layers: t-shirts, long-sleeved shirts, and a light jacket.</li>';
        } else {
            advice += '<li>Pack warm clothing: sweaters, jackets, and trousers.</li>';
        }
        if (weatherDescription.includes('Rain') || weatherDescription.includes('Drizzle')) {
            advice += '<li>A waterproof jacket and umbrella are recommended.</li>';
        } else if (weatherDescription.includes('Snow')) {
            advice += '<li>Pack a heavy coat, gloves, and a hat.</li>';
        }
        advice += '</ul>';
        return advice;
    }

    function generatePackingList(dailyWeather) {
        let packingListHTML = '<ul>';
        const baseItems = ['Passport', 'Tickets', 'Hotel Confirmation', 'Toothbrush', 'Toothpaste', 'Phone Charger'];
        baseItems.forEach(item => {
            packingListHTML += `<li><input type="checkbox"> ${item}</li>`;
        });
        const avgMaxTemp = dailyWeather.temperature_2m_max.reduce((a, b) => a + b) / dailyWeather.temperature_2m_max.length;
        const mostCommonWeatherCode = mostCommon(dailyWeather.weathercode);
        const weatherDescription = getWeatherDescription(mostCommonWeatherCode);
        if (avgMaxTemp > 25) {
            ['Shorts', 'T-shirts', 'Sandals', 'Sunscreen', 'Sunglasses', 'Hat'].forEach(item => {
                packingListHTML += `<li><input type="checkbox"> ${item}</li>`;
            });
        } else if (avgMaxTemp > 15) {
            ['T-shirts', 'Long-sleeved shirts', 'Light jacket', 'Jeans'].forEach(item => {
                packingListHTML += `<li><input type="checkbox"> ${item}</li>`;
            });
        } else {
            ['Sweaters', 'Jackets', 'Trousers', 'Scarf', 'Gloves'].forEach(item => {
                packingListHTML += `<li><input type="checkbox"> ${item}</li>`;
            });
        }
        if (weatherDescription.includes('Rain') || weatherDescription.includes('Drizzle')) {
            ['Waterproof jacket', 'Umbrella'].forEach(item => {
                packingListHTML += `<li><input type="checkbox"> ${item}</li>`;
            });
        } else if (weatherDescription.includes('Snow')) {
            ['Winter coat', 'Boots', 'Gloves', 'Hat'].forEach(item => {
                packingListHTML += `<li><input type="checkbox"> ${item}</li>`;
            });
        }
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
                if (fromAsk) {
                    displayAnswer(info);
                } else {
                    currencyInfo.innerHTML = info;
                }
            } else {
                const errorMsg = 'Could not find currency information for this destination.';
                if (fromAsk) displayAnswer(errorMsg); else currencyInfo.textContent = errorMsg;
            }
        }).catch(error => {
            console.error('Error fetching country data:', error);
            const errorMsg = 'Could not fetch currency data. Please try again.';
            if (fromAsk) displayAnswer(errorMsg); else currencyInfo.textContent = errorMsg;
        });
    }

    function getEmergencyNumbers(destination, fromAsk = false) {
        let number = emergencyNumbersData['default'];
        for (const country in emergencyNumbersData) {
            if (destination.toLowerCase().includes(country.toLowerCase())) {
                number = emergencyNumbersData[country];
                break;
            }
        }
        const info = `The primary emergency number is <strong>${number}</strong>.`;
        if (fromAsk) {
            displayAnswer(info);
        } else {
            emergencyNumbers.innerHTML = info;
        }
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