# Travel Q&A Website

## Overview

This project is a web application that provides personalized answers to a traveler's questions. It features a dynamic header, input fields for travel details (including airline), and an interactive Q&A section. The application provides destination-specific advice, embassy information, travel insurance links, airline-specific luggage restrictions, and a packing list with quantities based on trip duration.

## Project Outline

*   **`index.html`**: The main HTML file. It includes a new input field for the airline and new sections for Embassy Information and Travel Insurance.
*   **`main.js`**: The core JavaScript file containing the application's logic. It will be significantly updated to include:
    *   An `airlineLuggageData` object for storing airline-specific baggage rules.
    *   An `embassyData` object (or a function to generate search links) for embassy URLs.
    *   New functions (`getLuggageInfo`, `getEmbassyInfo`, `getTravelInsuranceInfo`) to handle the new features.
    *   An enhanced `generatePackingList` function that calculates trip duration and item quantities.
*   **`style.css`**: The CSS file for styling the application.

## Current Task: Major Feature Enhancement

*   **Modify `index.html`** to:
    *   Add a new `<input type="text" id="airline" placeholder="Enter your airline">`.
    *   Add new FAQ items for "Embassy Information" (`embassy-details`) and "Travel Insurance" (`insurance-details`).
    *   Update the placeholder text for the "Luggage Restrictions" section.
*   **Modify `main.js`** to:
    *   Create an `airlineLuggageData` object with baggage info for a few airlines.
    *   Create a `getLuggageInfo` function that displays airline-specific baggage rules.
    *   Create a `getEmbassyInfo` function that generates a link to find the relevant embassy.
    *   Create a `getTravelInsuranceInfo` function that provides links to insurance providers.
    *   Update `generatePackingList` to calculate the trip duration from the start and end dates and include quantities for clothing items.
    *   Integrate all new functions into the `getAdviceBtn` and `handleQuestion` flows.
