# Diet Tracker

A simple application to track your daily food intake.

## Features

*   **Calendar View:** See a monthly overview of your food consumption.
*   **Daily View:** Log the food you've eaten for a specific day.
*   **Summaries:** Get weekly and monthly summaries of your calorie intake.
*   **CSV Import:** Bulk import your food data from a CSV file.

## Tech Stack

*   **Frontend:** React with TypeScript
*   **Styling:** CSS
*   **Data Storage:** Local Storage
*   **Testing:** Jest and React Testing Library

## Getting Started

### Prerequisites

*   Node.js and npm (or yarn)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd diet-tracker
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server, run:

```bash
npm start
```

This will open the application in your default browser at `http://localhost:3000`.

### Running Tests

To run the unit tests, use the following command:

```bash
npm test
```
**Note:** There is a known issue with the test runner and the Playwright test execution in the current environment. See the "Known Issues" section for more details.

## Project Structure

```
diet-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── CalendarView/
│   │   ├── DailyView/
│   │   └── SummaryView/
│   ├── services/
│   │   ├── FoodService.ts
│   │   └── StorageService.ts
│   ├── styles/
│   └── types/
│       └── FoodItem.ts
├── package.json
└── README.md
```

## Architecture

The application is a single-page application (SPA) built with React. It uses a service-based architecture to separate the business logic from the UI components.

*   **`StorageService`:** This service is responsible for all data persistence. It currently uses local storage, but it can be easily swapped out with a different implementation (e.g., a REST API) without affecting the rest of the application.
*   **`FoodService`:** This service contains the business logic for managing food items, such as calculating total calories and importing data from a CSV file.

## TODOs and Future Work

*   Implement a proper login flow with Google Login.
*   Create a more appealing UI design.
*   Add routing to switch between different views.
*   Implement a more robust CSV parsing solution.
*   Integrate with a nutrition API to get more accurate calorie information.
*   Implement more complex business logic, such as calculating macronutrient information.
*   Add end-to-end tests with a tool like Cypress or Playwright.
*   Implement a proper singleton pattern for the services.
*   Use a dependency injection container to manage the lifecycle of the services.
*   Add more specific food categories.

## Known Issues

### `react-scripts` not found

There is a persistent issue in the development environment where the `react-scripts` command is not found, even after a clean installation of the dependencies. This prevents the unit tests from running.

**Steps Taken to Resolve:**

*   Multiple attempts to reinstall dependencies (`npm install`).
*   Clean installation by removing `node_modules` and `package-lock.json`.
*   Verified that `react-scripts` is listed as a dependency in `package.json`.
*   Attempted to run the `react-scripts` command directly from the `node_modules` directory.

Unfortunately, none of these steps have resolved the issue. It is likely an environment-specific problem. The unit test files are present in the codebase (`src/services/*.test.ts`).
