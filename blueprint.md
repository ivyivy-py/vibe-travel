# Travel Q&A Website

## Overview

This project is a web application that provides answers to potential travelers' questions about a destination. It features a dynamic header, input fields for travel details, and an interactive Q&A section. When a user asks a question, the answer is displayed directly below the input field, with the system intelligently fetching information from APIs or an internal knowledge base as needed.

## Project Outline

*   **`index.html`**: The main HTML file. It includes a dedicated `div` to display answers from the "Ask a question" feature.
*   **`main.js`**: The main JavaScript file. It handles all interactivity, including a completely redesigned `handleQuestion` function. This function now acts as a Q&A engine, parsing questions, fetching data from APIs or a new internal `knowledgeBase`, and displaying the formatted answer in a dedicated container. It also includes date validation to prevent requests for forecasts too far in the future.
*   **`style.css`**: The CSS file, which will include new styles for the answer container to ensure it is visually distinct and easy to read.

## Current Task: Redesign the "Ask" Feature

*   **Modify `index.html`** to:
    *   Add a new `<div id="ask-answer-container"></div>` below the question input field to display the answers.
*   **Modify `style.css`** to:
    *   Add styling for the new `#ask-answer-container` to make it visually appealing.
*   **Modify `main.js`** to:
    *   Implement date validation to alert the user if they select a date too far in the future for the weather forecast.
    *   Completely refactor the `handleQuestion` function.
    *   Create a `knowledgeBase` object that maps keywords to detailed, pre-written answers for general questions.
    *   For API-dependent questions (like weather, visa, currency), the function will now check for the required inputs, call the necessary API function, and then format and display the result in the `#ask-answer-container` instead of scrolling.
