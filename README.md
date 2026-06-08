# ⚖️ LexCounsel AI

LexCounsel AI is an AI-powered Legal Document Assistant that enables users to upload legal documents, perform semantic search, and ask natural language questions to receive context-aware answers from the uploaded documents.

The system combines FastAPI, PostgreSQL, ChromaDB, Sentence Transformers, and Llama 3 (via Ollama) to provide an intelligent legal document analysis platform.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Secure Password Hashing

### Document Management

* Upload PDF Documents
* Store Document Metadata
* Automatic Text Extraction
* Automatic Document Chunking

### AI-Powered Legal Assistant

* Semantic Search using ChromaDB
* Vector Embeddings using Sentence Transformers
* Question Answering using Llama 3 (Ollama)
* Context-Aware Responses
* Source Document Attribution

### User Interface

* Modern React + TypeScript Frontend
* Professional Dashboard
* Legal-Themed UI
* Chat-Based Interaction
* Document Sidebar

---

## Technology Stack

### Frontend

* React
* TypeScript
* Axios
* React Router

### Backend

* FastAPI
* SQLAlchemy
* JWT Authentication

### Database

* PostgreSQL

### AI & Vector Search

* Ollama
* Llama 3
* Sentence Transformers
* ChromaDB

### PDF Processing

* PyPDF2

---

## Project Structure

```text
LexCounselAI
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── core
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   └── main.py
│   │
│   ├── uploads
│   ├── chroma_db
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── services
│   │   └── assets
│   │
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

## System Architecture

```text
User
 │
 ▼
React Frontend
 │
 ▼
FastAPI Backend
 │
 ├── PostgreSQL
 │
 ├── PDF Extraction
 │
 ├── ChromaDB
 │
 └── Ollama (Llama 3)
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/LexCounselAI.git

cd LexCounselAI
```

---

## Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Create Virtual Environment:

```bash
python -m venv venv
```

Activate Environment:

### Windows

```bash
venv\Scripts\activate
```

Install Dependencies:

```bash
pip install -r requirements.txt
```

Run Backend:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install Packages:

```bash
npm install
```

Run Frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## Ollama Setup

Install Ollama:

https://ollama.com

Pull Llama 3 Model:

```bash
ollama pull llama3
```

Start Ollama:

```bash
ollama serve
```

Verify:

```bash
ollama list
```

---

## Usage

### Step 1

Register a new account.

### Step 2

Login using registered credentials.

### Step 3

Upload a legal PDF document.

### Step 4

Wait for document indexing.

### Step 5

Ask legal questions such as:

```text
What is the termination clause?

What is the salary mentioned in the contract?

What are the employee responsibilities?
```

### Step 6

Receive AI-generated answers based on document content.

---

## Sample Output

Question:

```text
What is the termination clause in the employment contract?
```

Answer:

```text
According to the provided context, the employee or employer may terminate employment by giving 90 days notice.
```

Source:

```text
employment_contract.pdf
```

---

## Screenshots

### Login Page

(Add Screenshot)

### Registration Page

(Add Screenshot)

### Dashboard

(Add Screenshot)

### Document Upload

(Add Screenshot)

### Question Answering

(Add Screenshot)

---

## Future Enhancements

* Chat History Storage
* Multi-Document Search
* PDF Preview
* Role-Based Access Control
* Cloud Deployment
* Advanced Legal Clause Extraction

---

## Author

Ramesh K N

Final Year Engineering Student

AI & Full Stack Development Enthusiast

---

## License

This project is submitted as part of the Lawyers Guild Internship Assignment.
