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
├── frontend/
│   ├── public/
│   │   ├── index.html              # General HTML properties (title, images, etc.)
│   │   ├── manifest.json           # Image properties (src, type, size, etc.)
│   │   └── images.svg/png/ico      # Directory where all website images are stored
│   ├── src/
│   │   ├── components/
│   │   │   ├── CategoryBar.tsx     # Where the type of spirits are set
│   │   │   ├── CocktailCard.tsx    # How the cocktail cards are organized
│   │   │   ├── CocktailGrid.tsx    # The cocktail grid spacing component 
│   │   │   ├── SideBar.tsx         # Where the types of style of cocktails are set
│   │   │   └── TopBar.tsx          # The header component of the website
│   │   ├── pages/
│   │   │   └── cocktailDetails.tsx # Sets cocktail page information
│   │   ├── App.tsx                 # Application functional logic
│   │   ├── index.css               # Index CSS settings
│   │   ├── index.tsx               # Index functional logic
│   │   ├── RootApp.tsx             # Sets application routing
│   │   └── types.ts                # Sets Cocktail and Ingredient data types (str)
│   ├── build/
│   └── package.json                # Frontend dependencies and scripts
├── functions/
│   ├── python/
│   │   ├── start.sh                # Shell script to run startup command (python main.py)
│   │   ├── main.py                 # Flask app and API logic
│   │   └── requirements.txt        # Python dependencies
│   └── package.json                # Backend dependencies
├── firebase.json                   # Firebase configuration
├── .firebaserc                     # Firebase project mapping
├── .gitignore                      # Ignore sensitive files (e.g., credentials)
└── README.md                       # Project documentation
```

---

## Frontend Deployment

The React frontend provides an interactive UI for viewing cocktail recipes.

### Prerequisites

- **Homebrew**
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```
- **npm**
  ```bash
  brew install node
  ```
- **Firebase CLI** installed globally:
  ```bash
  npm install -g firebase-tools
  ```
- **GCloud CLI** installed globally:
  ```bash
  brew install --cask google-cloud-sdk

  gcloud init
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

### Frontend Deployment (Preferred)

1. Commit it to Github, it will be auto committed to Firebase.

### Frontend Deployment (Alternative)

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

The API will be available at either: http://127.0.0.1:8080/api/cocktails OR http://127.0.0.1:5000/api/cocktails

---

## How to Deploy the Backend (GCloud Functions)

1. Ensure GCloud is initialized (if not already done):
  ```bash
  gcloud init
  ```
2. Navigate to the backend folder:
  ```bash
  cd functions/python
  ```
3. Deploy the GCloud Functions:
  ```bash
  gcloud functions deploy cocktailapi \
  --runtime python310 \
  --entry-point app_entry \
  --trigger-http \
  --allow-unauthenticated \
  --region us-central1
  ```
4. Ensure that the API is live at: https://us-central1-cocktail-website-a4f5d.cloudfunctions.net/cocktailapi/api/cocktails
5. Commit it to Github, it will be auto committed to Firebase.

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
  git commit -m "Description Of Change"
  ```
4. Push to the branch:
  ```bash
  git push -f origin main
  ```
5. Open a pull request.
  ```bash
  git pull origin main
  ```
