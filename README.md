# Cocktail Application

A full-stack cocktail application with a Python-based API and a React-based frontend. The application provides cocktail recipes, ingredients, instructions, and history, all served through an intuitive interface and hosted on Firebase.

---

## Features

- **Frontend**: A React-based UI displaying cocktails with search and filter capabilities.
- **Backend**: A Flask API that fetches cocktail data from Google Sheets.
- **Hosting**: Firebase Hosting (for the frontend) and Firebase Functions (for the backend).
- **Data Source**: Cocktail data pulled from Google Sheets dynamically.

---

## Technologies Used

- **Frontend**: React, Firebase Hosting
- **Backend**: Flask, Firebase Cloud Functions
- **Data Source**: Google Sheets
- **Hosting**: Firebase
- **Languages**: Python, JavaScript (React)

---

## Project Structure

```bash
project-root/
├── frontend/                     # React frontend
│   ├── public/                   # Contains static files that are served directly by the web server
│   ├── src/                      # Contains the source code of your React application
│   ├── build/                    # Production-ready React build
│   └── package.json              # Frontend dependencies and scripts
├── functions/
│   ├── python/
│   │   ├── main.py               # Flask app and API logic
│   │   └── requirements.txt      # Python dependencies
│   ├── index.js                  # Node.js wrapper for Firebase Functions
│   └── package.json              # Backend dependencies
├── firebase.json                 # Firebase configuration
├── .firebaserc                   # Firebase project mapping
├── .gitignore                    # Ignore sensitive files (e.g., credentials)
└── README.md                     # Project documentation
```

---

## Frontend Deployment

The React frontend provides an interactive UI for viewing cocktail recipes.

### Prerequisites

- **Node.js** (version 14 or later)
- **npm** (comes with Node.js)
- **Firebase CLI** installed globally:
  ```bash
  npm install -g firebase-tools
  ```

---

## How to Run Locally (Frontend)

1. Clone the repository and navigate to the project directory:
  ```bash
  git clone https://github.com/<your-username>/<your-repo>.git
  ```
2. Navigate to the frontend folder:
  ```bash
  cd frontend
  ```
3. Install dependencies:
  ```bash
  npm install
  ```
4. Run the development server:
  ```bash
  npm start
  ```

The frontend will be available at: http://localhost:3000

---

## How to Build for Production (Frontend)

To build the React app for deployment on Firebase Hosting:

1. Build the frontend:
  ```bash
  npm run build
  ```
2. The build files will be available in the `frontend/build/` directory.

---

## How to Deploy to Firebase

### Frontend Deployment

1. Ensure the frontend is built:
  ```bash
  npm run build
  ```
2. Navigate to the root directory:
  ```bash
  cd ..
  ```
3. Deploy the frontend and backend to Firebase:
  ```bash
  firebase deploy
  ```

---

## How to Run Locally (Backend)

1. Navigate to the backend folder:
  ```bash
  cd functions/python
  ```
2. Install dependencies:
  ```bash
  pip install -r requirements.txt
  ```
3. Run the Flask app locally:
  ```bash
  python main.py
  ```

The API will be available at: http://127.0.0.1:5000/api/cocktails

---

## How to Deploy the Backend (Firebase Functions)

1. Ensure Firebase is initialized (if not already done):
  ```bash
  firebase init
  ```
2. Deploy the Firebase Functions:
  ```bash
  firebase deploy --only functions
  ```

The API will be live at: https://cocktail-website-a4f5d.web.app/api/cocktails

---

## Response Example

```json
[
  {
    "name": "Margarita",
    "base_spirit": "Tequila",
    "category": "Classic",
    "description": "A refreshing cocktail with lime and orange liqueur.",
    "instructions": "Shake all ingredients with ice and strain into a glass.",
    "recommendations": "Serve with a salted rim.",
    "history": "Originated in Mexico in the 1930s.",
    "ingredients": [
      {
        "ingredient": "Tequila",
        "amount": "2 oz"
      },
      {
        "ingredient": "Lime Juice",
        "amount": "1 oz"
      },
      {
        "ingredient": "Triple Sec",
        "amount": "0.5 oz"
      }
    ]
  }
]
```

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
  ```bash
  git checkout -b feature/new-feature
  ```
3. Commit your changes:
  ```bash
  git commit -m "Add new feature"
  ```
4. Push to the branch:
  ```bash
  git push origin feature/new-feature
  ```
5. Open a pull request.
