# Contributing to WorldsxMap 🌍

Thank you for considering contributing to this project! This web app is divided into two repositories: frontend and backend. Please follow these guidelines to get started.

## 🛠 Project Setup

### Fork the repositories

Before cloning, fork both repositories on GitHub by clicking the Fork button on the repository pages.

### Clone the repositories

After forking, clone your forked repositories:

#### Clone FronEnd
 `git clone git@github.com:AngRodSt/World-Map-Frontend.git`

#### Clone BackEnd
 `git clone git@github.com:AngRodSt/World-Map-Backend.git`

### Install dependencies

#### Frontend
`npm install`

#### Backend
`npm install`

### Set up environment variables

Create a .env file in both repositories and add the necessary variables.

#### Frontend (.env example)
- VITE_BACKEND_URL = http://localhost:3000 [example]

### Backend (.env example)
- MONGO_URL = your_database_url (database used in the project MongoDB)
- JWT_SECRET = your_secret_key
- FRONTEND_URL = http://localhost:5173 [example]
- EMAIL_USER = your_user
- EMAIL_PASS = your_password
- EMAIL_HOST = sandbox.smtp.mailtrap.io [example]
- EMAIL_PORT = 2525 [example]

#### 🚨 Do not commit .env files to the repository. Use .gitignore to exclude them.

### Run the project

#### Start the backend 
`npm run dev`

#### Start the frontend
`npm run dev`

### 🚀 How to Contribute

#### Create a new branch for your feature or fix:
`git checkout -b feature-new`

#### Make your changes and commit them:
`git commit -m "Added a new feature"`

#### Push your changes to your forked repository:
`git push origin feature-new`

#### Open a Pull Request (PR) to the original repository explaining your changes.

📌 Contribution Guidelines

- 👉 Keep your code clean and well-documented.
- 👉 Follow the project's coding style.
- 👉 Check for open issues before starting a new feature.
- 👉 Be respectful and collaborative when discussing ideas.

Thank you for your help! 💙🌍
