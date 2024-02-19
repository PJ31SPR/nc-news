# Northcoders News API

### Database Connection

To connect to the databases locally, follow these steps:

1. Create two environment variable files,`.env.test` and `.env.development`, in the root directory of the project.
2. In each .env file, add the corresponding line with the correct database name for that environment (which can be found in `/db/setup.sql`):
3. Replace `your_database_name` with the actual database name for the respective environment.

### Gitignore

Ensure that you have added `.env.*` to the `.gitignore` file to prevent those files beginning with `.env` from being tracked by Git.

### Install Dependencies

Before running the project locally, make sure to install any necessary dependencies by running: `npm install`

