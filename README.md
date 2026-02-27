# LLM Observability Platform

## Introduction

A full-stack real-time observability platform for Large Language Model (LLM) APIs that transforms raw API interaction data into actionable insights through thoughtful data storytelling and interactive visualization. Built with React, Node.js, and MongoDB, the system automatically captures and visualizes every API transaction across multiple AI providers including Google Gemini, Groq, and OpenRouter.

## Key Features

* **Real-time Dashboard** – Monitor LLM API performance through carefully designed statistics cards and visual indicators
* **Automatic Tracking** – Every API call is logged with response times, latency data, and color-coded performance metrics
* **Request History** – Maintain a complete audit trail with clickable rows and detailed modal views for deep dives
* **Multi-Provider Ready** – Seamlessly supports Gemini, Groq, and OpenRouter with automatic failover

## Dashboard Preview

<table>
  <tr>
    <th align="center">Light Mode</th>
    <th align="center">Dark Mode</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/003b72cb-f17c-40c8-88d1-b792f3643bb7" alt="Light Mode" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/2e6d0a2f-6b91-4aeb-a7f0-c2d69fadc545" alt="Dark Mode" width="100%"/></td>
  </tr>
</table>

## Technology Stack

* **Backend:** Node.js with Express.js
* **Frontend:** React with Material-UI and Recharts for data visualization
* **Database:** MongoDB
* **Version Control:** Git

I chose the MERN stack for its scalability and flexibility. It offers cross-platform code reusability and smooth compatibility among all four components through a full JavaScript development cycle from frontend to backend. React.js provides versatile features and rich UI libraries like Recharts that helped me build a clean and responsive interface with beautiful data visualizations within tight time constraints.

## Front-End Development (React + Material-UI + Recharts)

* **Component Architecture**: Modular React components with hooks-based state management (useState, useEffect) for clean separation of concerns
* **Interactive Dashboard**: Real-time display of request history and performance metrics with clickable table rows and smooth dialog transitions
* **Visual Feedback**: Loading states, hover effects, and disabled controls during API calls enhance user experience
* **Responsive Design**: Fluid grid layout that adapts seamlessly from desktop to mobile using Material-UI's responsive system
* **Custom Theming**: Consistent visual language with customized color palette and typography supporting both light and dark modes

## Data Storytelling & Visualization Design

* **Performance Indicators**: Color-coded latency display (red for >1000ms, green for optimal) transforms raw numbers into immediate visual understanding
* **Rich Visualizations**: Real-time charts built with Recharts showing latency trends, model distribution, token throughput, and error rates
* **Hierarchical Data Presentation**: Progressive disclosure from summary statistics cards to detailed table rows to full modal views
* **Interactive Exploration**: Clickable history rows encourage data discovery and pattern recognition across past requests
* **Real-time Updates**: Auto-refreshing statistics with visual feedback keep users informed of system activity
* **Detail Views**: Comprehensive modal displays show complete prompt-response pairs with timestamps and performance metadata

## Architecture & Design

### Frontend (React + Material-UI + Recharts)

* Single-Page Application built with React and Material-UI
* Statistics cards displaying total requests, average latency, error rate, and estimated cost
* Interactive table with sortable columns and color-coded latency
* Clickable rows that open detailed modal views
* Test interface for sending prompts with loading states
* Real-time charts for:
  - Latency & request volume over time
  - Model distribution pie chart
  - Token throughput monitoring
  - Error rate trends
  - Average latency by model
* HTTP polling for data refresh
* Light and dark mode support

### Backend (Node.js + Express)

* RESTful API Server with JSON and CORS middleware
* Multi-Provider Service Layer with automatic failover between Gemini, Groq, and OpenRouter
* Circuit Breaker pattern for resilience
* Request queue with priority system
* API Endpoints:
  * `POST /api/generate` – Send prompts with auto-failover
  * `GET /api/history` – Retrieve request history
  * `GET /api/stats` – Get aggregated statistics
  * `GET /api/providers` – Monitor provider health
  * `GET /api/health` – Health check

### Database (MongoDB)

* Stores requests in `llm_calls` collection with fields: `prompt`, `response`, `model`, `timestamp`, `latency`, `status`, `parameters`, `metadata`
* On-demand connection per operation

### Data Flow

1. User sends prompt via `POST /api/generate`
2. Express server forwards request to multi-provider service
3. Service calls available LLM API and tracks latency
4. Response saved to MongoDB with full metadata
5. Frontend refreshes dashboard metrics and request history

### Design Characteristics

* Modular service architecture with provider abstraction
* Built-in latency tracking and performance logging
* Extensible data model for future metrics
* Simple deployment with Docker support

## Step-by-Step Local Setup

### Prerequisites

* Node.js v16+
* MongoDB (local or Atlas)
* API Keys: Gemini, Groq, OpenRouter (optional)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your API keys and MongoDB URI
npm start
```

**backend/.env.example**

```env
MONGODB_URI=mongodb://localhost:27017/llm_observability
GEMINI_API_KEY=your_gemini_api_key_here
GROQ_API_KEY=your_groq_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=8888
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

**Access the dashboard:** [http://localhost:3000](http://localhost:3000)

The dashboard automatically respects your system's light/dark mode preference.

### Docker Setup (Optional)

```bash
docker compose up --build
# Access at http://localhost:3000
```

## Troubleshooting

### Port 8888 already in use
```bash
# Find and kill process using port 8888
lsof -ti:8888 | xargs kill -9
```

## API Documentation

### POST /api/generate

Send prompt to LLM with auto-failover between providers

```json
{
  "prompt": "Your question here"
}
```

### GET /api/history

Get all LLM request history with full metadata

### GET /api/providers

Get status and metrics for all connected providers

### GET /api/stats

Get aggregated statistics

```json
{
  "total": 150,
  "avgLatency": 1200
}
```

### GET /api/health

Check if server is running

```json
{
  "status": "ok"
}
```

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run unit tests only
npx jest tests/unit/

# Run integration tests only  
npx jest tests/integration/
```

### Test Coverage
- Multi-provider service unit tests
- Circuit breaker functionality
- API health check integration tests
- Frontend component tests

### Current Test Status
```bash
Test Suites: 2 passed, 2 total
Tests:       4 passed, 4 total
```

## System Evolution

To handle a high number of requests, I would use batch processing and smart queueing. This would keep the system smooth by grouping similar requests and handling important ones first.

In the future, I would add user profiles with personalized dashboards so users can save their favorite models or metrics. The platform could also include a plugin system that lets users add their own tools for analysis or monitoring. It could even provide personalized tips based on past data to help users write better prompts and choose the best models.

## Project Showcase

This project demonstrates:
* **Front-End Development**: Clean React component architecture with hooks, Material-UI implementation, Recharts visualizations, and responsive design with light/dark mode support
* **Data Storytelling**: Transforming raw API logs into visual narratives through color-coded indicators, real-time charts, and progressive disclosure
* **Visualization Design**: Hierarchical data presentation from summary cards to detailed modal views, with rich Recharts visualizations for trend analysis
* **Full-Stack Integration**: Seamless frontend-backend communication with multi-provider orchestration and Docker deployment
