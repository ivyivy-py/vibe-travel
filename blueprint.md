# Travel Q&A Website

## Overview

This project is a web application that provides personalized answers to a traveler's questions. It features a dynamic header, a night mode toggle, input fields for travel details, and an interactive Q&A section. The application is beautified with relevant, dynamic images for the header and each information section, providing an engaging and visually appealing user experience.

## Project Outline

*   **`index.html`**: The main HTML file. It now includes `<img>` tags within each information card to display dynamic images and a toggle switch for the new night mode feature.
*   **`main.js`**: The core JavaScript file. It will be updated to:
    *   Modify the header image function to specifically fetch landscape-oriented photos.
    *   Implement a new `getSectionImages` function that fetches and populates images for each information card based on the destination.
    *   Add functionality for the night mode toggle.
*   **`style.css`**: The CSS file. It will be updated to include:
    *   Styling for the new images within the information cards.
    *   CSS variables to implement a smooth light/dark mode transition.

## Current Task: Beautify the Webpage

*   **Modify `index.html`** to:
    *   Add `<img>` tags to each `faq-item`.
    *   Add a night mode toggle switch to the header.
*   **Modify `style.css`** to:
    *   Add styles for the new images.
    *   Implement light and dark mode themes using CSS variables.
*   **Modify `main.js`** to:
    *   Update the `getImages` function to fetch landscape images for the header.
    *   Create a `getSectionImages` function to fetch images for each information card.
    *   Add an event listener and logic for the night mode toggle.
