# Madeline Blogging Application

A modern blogging platform with user authentication that allows logged-in users to create, edit, or delete blogs. All users can browse, search, and filter blogs. Additionally, there's an AI-powered "Generate Summary" feature using an API to provide concise summaries for each blog post.

## Features

- **User Authentication**: Secure sign-up and login for managing blog posts.
- **Create, Edit, and Delete Blogs**: Logged-in users can manage their blogs.
- **Browse, Search, and Filter**: All users can explore blogs, with search and filtering options.
- **AI-Powered Summaries**: Generate concise blog summaries using AI through the Gemini API.

## Technologies Used

### Frontend

- **Next.js 15**
- **Tailwind CSS**
- **Bun** (JavaScript package manager)

### Backend

- **FastAPI** (Python-based web framework)
- **Pydantic** (Data validation and settings management)
- **PostgreSQL** (Database)
- **SQLAlchemy** (Database ORM)
- **LangChain** (AI integration)
- **Gemini API** (API for generating AI-powered summaries)
- **Poetry** (Python dependency management)

## 📦 Installation

### Prerequisites

- [Node.js](https://nodejs.org/) or [Bun](https://bun.sh/)
- [Python](https://www.python.org/) and [Poetry](https://python-poetry.org/)
- PostgreSQL Database
- Gemini API Key

### Environment Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/soorya-u/Madeline-Blog.git
   cd Madeline-Blog
   ```

2. **Add the required Environment variables for both Client and Server.**

   ```
   cd client
   cp .env.example .env
   ```

   **The required Variables are**

   - NEXT_PUBLIC_BACKEND_URL - Your Backend URL

   ```
   cd server
   cp .env.example .env
   ```

   **The required Variables are**

   - DATABASE_URL - Your Database URL
   - JWT_SECRET_KEY - A Secret Phase
   - FRONTEND_URL - Your Client URL
   - GEMINI_API_KEY - API key of Google Gemini

3. **Run the Server**

   ```
   poetry install
   poetry shell
   fastapi dev
   ```

4. **Run the Client**

   ```
   bun add (or) npm install
   bun dev (or) npm run dev
   ```

## Limitations

- Currently, the server is deployed on free tier and hence the first request is always slow.
- The User Interface is way too simpler.
- The Access Token is stored in Local Storage for easier login. This might not be the ideal case for enterprise level application.