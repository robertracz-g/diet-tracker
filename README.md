# Diet Tracker

This is a simple diet tracker application built with vanilla JavaScript, HTML, and CSS. It allows you to track your daily food intake and view a list of the food items you've consumed.

## Getting Started

To run the application locally, you'll need to have Python 3 installed. Follow these steps:

1.  Clone this repository to your local machine.
2.  Navigate to the project directory in your terminal.
3.  Start a simple HTTP server using Python:

    ```bash
    python3 -m http.server 8000
    ```

4.  Open your web browser and go to `http://localhost:8000` to view the application.

## Features

*   **Add Food Items:** You can add food items to your daily log by providing the food name, calories, and category.
*   **View Food Items:** The application displays a list of the food items you've added.
*   **Local Storage:** Your food intake data is stored in your browser's local storage, so it persists between sessions.
*   **Calendar View:** A monthly calendar view serves as the landing page, showing your food intake at a glance.
*   **Calorie Counter and Food Icons:** Each day on the calendar displays the total calories consumed and icons representing the categories of food eaten.
*   **Daily Food List:** Clicking on a day in the calendar shows a detailed list of the food items recorded for that day.

## TODO

*   **Summaries:** Create weekly and monthly summaries of your food intake.
*   **Bulk Import:** Allow users to bulk import food items from a CSV file.
*   **Google Login:** Integrate with Google Login for user authentication.
*   **Improve Styling:** Enhance the user interface with better styling.
