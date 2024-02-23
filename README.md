# Northcoders News API

Welcome to NC News! NC News is a full-stack web application built using Node.js, Express.js, PostgreSQL, and React. It provides a platform for users to engage with news articles on various topics, interact with other users through comments and votes, and contribute their own content.
The project is hosted here: https://nc-news-m4pj.onrender.com

### Set up

To get started with NC News locally, follow these steps:

Clone the repository:
git clone https://github.com/your-username/nc-news.git

Navigate to the project directory:
cd nc-news

Install dependencies:
npm install

Seed the local database:
npm run seed

### Database Connection

To connect to the databases locally, follow these steps:

1. Create two environment variable files,`.env.test` and `.env.development`, in the root directory of the project.
2. In each .env file, add the corresponding line with the correct database name for that environment (which can be found in `/db/setup.sql`):

### Gitignore

Ensure that you have added `.env.*` to the `.gitignore` file to prevent those files beginning with `.env` from being tracked by Git.

### Install Dependencies

Before running the project locally, make sure to install any necessary dependencies by running: `npm install`

### Requirements
Node.js version 14.0.0 or higher
PostgreSQL version 12 or higher