# Travel Q&A Website

## Overview

This project is a web application that provides answers to potential travelers' questions about a destination. It features a dynamic header, input fields for travel details, and an interactive Q&A section. When a user asks a question, the answer is displayed directly below the input field, with the system intelligently fetching information from APIs or an internal knowledge base as needed.

## Project Outline

*   **`index.html`**: The main HTML file. It includes a dedicated `div` to display answers from the "Ask a question" feature and a placeholder for the dynamic "Dos and Don'ts" section.
*   **`main.js`**: The main JavaScript file. It handles all interactivity and includes a new `dosAndDontsData` object to provide destination-specific cultural advice. The `handleQuestion` function is updated to use this data, making the "Dos and Don'ts" section dynamic.
*   **`style.css`**: The CSS file for styling the application.

## Current Task: Improve the "Dos and Don'ts" Feature

*   **Modify `index.html`** to:
    *   Update the placeholder text in the "Dos and Don'ts" section to be more generic.
*   **Modify `main.js`** to:
    *   Create a `dosAndDontsData` object containing specific cultural tips for various countries (and a default).
    *   Implement a new `getDosAndDonts` function that retrieves and displays advice based on the user's destination.
    *   Integrate this new function into both the main "Get Advice" button flow and the `handleQuestion` logic for the "Ask" feature.
    *   Remove the static "Dos and Don'ts" advice from the `knowledgeBase`.
