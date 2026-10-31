# AgriConnect – Frontend Setup Guide (Windows)

AgriConnect is an agricultural marketplace and farmer community platform built with **React JS**, **React Router DOM**, and **Standard CSS**.

## Color Scheme
- **Primary Agriculture Greens**: `#2e7d32`, `#1b5e20`, `#4caf50`, `#e8f5e9`
- **Light Harvest Creams**: `#fbfaf5`, `#f5f2e8`, `#e5dec9`
- **Clean White**: `#ffffff`

## Windows Installation & Execution

### 1. Open PowerShell or Command Prompt
Navigate into the frontend project folder:
```powershell
cd c:\Users\srini\Desktop\agricon\frontend
```

### 2. Install Dependencies
```powershell
npm install
```

### 3. Run the Development Server
```powershell
npm run dev
```

The application will start on:
👉 **`http://localhost:3000`**

---

## User Roles & Testing
The application includes a **Quick View Mode Switcher** in the top bar and role selector tabs on the login screen with one-click demo credentials:

1. **Farmer:**
   - Email: `ramesh@kisan.com`
   - Password: `kisan123`
   - Access: 1-B Land verification status, Add/Manage organic & conventional produce, customer orders fulfillment.

2. **Customer:**
   - Email: `pooja@gmail.com`
   - Password: `pooja123`
   - Access: Browse marketplace with organic/conventional filters, add produce to cart, checkout, live order tracking, write reviews.

3. **Admin:**
   - Email: `admin@agriconnect.gov.in`
   - Password: `admin123`
   - Access: Sanction/Reject 1-B land records and Aadhaar cards, manage platform users, moderate marketplace listings and community discussions.

