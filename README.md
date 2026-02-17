# Movie Explorer

A "Movie Explorer" web app where users can search movies, view details, and save favorites with a personal rating/comment.

## Setup Instructions

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Create a `.env.local` file in the root directory and add your TMDB API Key:
    ```bash
    TMDB_API_KEY=your_tmdb_api_key_here
    ```

3.  **Run the Development Server**
    ```bash
    npm run dev
    ```

4.  **Open the App**
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## Features

-   **Search**: Search movies by title. Displays results with poster, title, year, and short description.
-   **Details**: View detailed information including overview, release year, runtime, and rating.
-   **Favorites**: Add movies to your favorites list. All data is persisted in LocalStorage.
-   **Personalization**: Rate favorites (1-5 stars) and add personal notes.
-   **API Integration**: Uses TMDB API via a secure Next.js API proxy to keep credentials safe.

## Technical Decisions & Tradeoffs

-   **Framework**: Built with **Next.js 12** and **React 18** to ensure compatibility with Node.js 14 environments while leveraging React's modern features.
-   **Styling**: Used **Vanilla CSS (styled-jsx)** for scoped component styling, offering full control without external CSS framework dependencies.
-   **State Management**: Used React `useState` and `useContext` (via hooks) for local state properly scoped to components.
-   **Persistence**: Implemented **LocalStorage** for favorites persistence implementation as a lightweight client-side solution.
-   **API Proxy**: Server-side API routes (`/api/movies/*`) are used to proxy requests to TMDB, ensuring the API key is never exposed to the client.

## Known Limitations & Future Improvements

-   **Pagination**: Currently only fetches the first page of search results. Implementing pagination would allow users to browse more results.
-   **Server-Side Persistence**: Favorites are only saved on the device. Adding a lightweight database (e.g., SQLite, Supabase) would allow syncing across devices.
-   **Testing**: No automated tests included due to time constraints. Adding Unit and E2E tests would be the next step.
-   **Authentication**: No user accounts; data is tied to the browser.

## Deployment

This app is ready to be deployed on [Vercel](https://movie-explorer-theta-nine.vercel.app/).

1.  Push the code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the `TMDB_API_KEY` environment variable in the Vercel dashboard.
4.  Deploy.
