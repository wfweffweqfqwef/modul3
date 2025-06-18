# Olympics Medal Tracker

This project is a web application for tracking Olympic medals by country and discipline.

## Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Navigate to the project directory:
```bash
cd moduleB-01
```

3. Install dependencies:
```bash
npm install
```

## Running the Application

The application requires two processes to run simultaneously:

1. Start the JSON Server (API):
```bash
npm run server
```
This will start the JSON server on port 3001.

2. In a new terminal, start the development server:
```bash
npm run dev
```
This will start the development server on port 5173.

3. Open your browser and navigate to:
```
http://localhost:5173
```

## Features

- View all participating countries and their medal counts
- Detailed view of each country's performance
- Filter countries by disciplines
- View medal distribution across different sports
- Responsive design for all devices

## Technology Stack

- React
- TypeScript
- Vite
- Styled Components
- JSON Server for mock API
- React Router for navigation
