# LLM Observability Platform

## Introduction

A full-stack real-time observability platform for Large Language Model (LLM) APIs. It monitors and logs performance, usage, and cost metrics across multiple AI providers such as Google Gemini. Built with React, Node.js, and MongoDB, the system automatically records key details for every API transaction, including the model name (for example, gemini-1.5-flash), the input prompt, the model response, and the end-to-end latency. This platform provides clear insights into LLM performance, efficiency, and cost management.

## Key Features

* **Real-time Dashboard** – Monitor LLM API performance in a Tableau-like interface
* **Automatic Tracking** – Every API call is logged with response times and latency data
* **Request History** – Maintain a complete audit trail of all LLM interactions
* **Multi-Provider Ready** – Designed to support Google Gemini

## Technology Stack

* **Backend:** Node.js with Express.js
* **Frontend:** React
* **Database:** MongoDB
* **Version Control:** Git

I chose the MERN stack for its scalability and flexibility. It offers cross-platform code reusability and smooth compatibility among all four components through a full JavaScript development cycle from frontend to backend. React.js provides versatile features and rich UI libraries that helped me build a clean and responsive interface within tight time constraints. The stack supports fast development, real-time updates, and continuous user engagement.

## Architecture & Design

### Frontend (React + Material-UI)

* Single-Page Application built with React and Material-UI
* Real-time Dashboard displaying request history, performance metrics, and statistics
* Interactive Interface: test chat for sending prompts, clickable request history, auto-refreshing statistics
* HTTP Polling for data refresh

### Backend (Node.js + Express)

* RESTful API Server with JSON and CORS middleware
* API Endpoints:

  * `POST /api/generate` – Send prompts to Gemini API
  * `GET /api/history` – Retrieve request history
  * `GET /api/stats` – Get aggregated statistics
  * `GET /api/health` – Health check
* GeminiService handles LLM API communication with latency tracking and error handling

### Database (MongoDB)

* Stores requests in `llm_calls` collection with fields: `prompt`, `response`, `model`, `timestamp`, `latency`, `status`, `parameters`, `metadata`
* On-demand connection per operation

### Data Flow

1. User sends prompt via `POST /api/generate`
2. Express server forwards request to GeminiService
3. GeminiService calls Gemini API and tracks latency
4. Response saved to MongoDB
5. Frontend refreshes dashboard metrics and request history

### Design Characteristics

* Modular service architecture
* Built-in latency tracking
* Extensible data model
* Simple deployment

---

## Step-by-Step Local Setup

### Prerequisites

* Node.js v16+
* MongoDB (local or Atlas)
* Gemini API Key ([Google AI Studio](https://aistudio.google.com/))

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Gemini API key and MongoDB URI
npm start
```

**backend/.env.example**

```env
MONGODB_URI=mongodb://localhost:27017/llm_observability
GEMINI_API_KEY=your_gemini_api_key_here
PORT=8888
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

**Access the dashboard:** [http://localhost:3000](http://localhost:3000)

---

## API Documentation

### POST /api/generate

Send prompt to Gemini AI

```json
{
  "prompt": "Your question here"
}
```

### GET /api/history

Get all LLM request history

### GET /api/stats

Get total requests and average latency

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

---

### System Evolution

To handle a high number of requests, I would use batch processing and smart queueing. This would keep the system smooth by grouping similar requests and handling important ones first.
In the future, I would add user profiles with personalized dashboards so users can save their favorite models or metrics. The platform could also include a plugin system that lets users add their own tools for analysis or monitoring. It could even provide personalized tips based on past data to help users write better prompts and choose the best models.
