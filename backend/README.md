# AgriConnect – Backend API (Node.js & Express.js)

Pure **Node.js** and **Express.js** REST API backend for AgriConnect.

## Features
- **JWT & Role-Based Access Control:** Role guards for Farmer, Customer, and Admin.
- **Document Verification:** Form 1-B land records and Aadhaar upload handling via Multer.
- **Producer Approval Gate:** Prevents unapproved farmers from publishing produce.
- **Produce & Order Engine:** Inventory tracking, atomic order processing.
- **Crop Disease Advisory:** Photo diagnosis, agronomist remedies.

## Running on Windows

### 1. Install Dependencies
```powershell
cd c:\Users\srini\Desktop\agricon\backend
npm install
```

### 2. Start the Server
```powershell
npm start
```
Server runs on: **`http://localhost:5000`**  
API Base: **`http://localhost:5000/api/v1`**
