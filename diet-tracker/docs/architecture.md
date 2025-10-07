# Architecture

This document provides a more detailed overview of the application's architecture.

## Frontend

The frontend is a single-page application (SPA) built with React and TypeScript. The UI is divided into several components, each responsible for a specific part of the user interface.

*   **`App.tsx`:** The main component that serves as the entry point for the application. It is responsible for rendering the main layout and routing between different views.
*   **`CalendarView`:** This component displays a calendar and allows the user to select a date. It also shows a summary of the food intake for each day.
*   **`DailyView`:** This component shows a detailed list of the food items that have been recorded for a specific day. It also allows the user to add, edit, and delete food items.
*   **`SummaryView`:** This component provides weekly and monthly summaries of the user's calorie intake.

## Services

The application uses a service-based architecture to separate the business logic from the UI components. This makes the application more modular and easier to maintain.

### `StorageService`

The `StorageService` is responsible for all data persistence. It provides a simple asynchronous API for CRUD (Create, Read, Update, Delete) operations. The current implementation uses the browser's local storage, but it is designed to be easily swappable with other storage mechanisms, such as a REST API or a local database.

The decision to use an asynchronous API, even for local storage, is a key architectural choice. It ensures that the rest of the application is not tightly coupled to the specific storage implementation. If we were to switch to a REST API in the future, we would only need to update the `StorageService`; the UI components and the `FoodService` would not need to be changed.

### `FoodService`

The `FoodService` contains the business logic for managing food items. It uses the `StorageService` to persist the data. The responsibilities of the `FoodService` include:

*   Adding new food items.
*   Retrieving food items for a specific date.
*   Calculating the total calorie intake for a given day.
*   Importing food data from a CSV file.

By encapsulating the business logic in a separate service, we keep the UI components clean and focused on their primary responsibility, which is rendering the UI.

## Data Model

The primary data model in the application is the `FoodItem` interface, which is defined in `src/types/FoodItem.ts`.

```typescript
export type FoodCategory = 'fish' | 'meat' | 'veggies' | 'sugar' | 'alcohol' | 'other';

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  category: FoodCategory;
  date: Date;
}
```

## State Management

Currently, the application uses React's built-in state management (`useState` and `useEffect`) to manage the state of the UI components. For a larger application, we might consider using a more sophisticated state management library, such as Redux or MobX.

## Future Improvements

*   **API Layer:** Introduce a dedicated API layer to handle communication with a backend server. This would involve creating a new service that makes HTTP requests to a REST API. The `StorageService` would then be updated to use this new API layer instead of local storage.
*   **Dependency Injection:** Use a dependency injection container to manage the lifecycle of the services. This would make it easier to swap out different implementations of the services and would improve the testability of the application.
*   **Component Library:** Use a component library, such as Material-UI or Ant Design, to create a more polished and consistent UI.
