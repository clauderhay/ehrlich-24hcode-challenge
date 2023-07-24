## Ehrlich 24-hour Code Challenge

I present to you my mini-project that I worked so hard for.

### Installation

1. Install mysql using homebrew: `brew install mysql`. Make sure you have installed `mysql@8.0.x`, exec `mysql --version` in terminal to verify.
2. Keep mysql running in the background: `brew services start mysql`
3. Connect to mysql, exec this command in terminal: `mysql -uroot`
4. Create database: `CREATE DATABASE code-challenge;`
5. Create user: `CREATE USER 'user01'@'%' IDENTIFIED WITH mysql_native_password BY 'ehrlichpass';`
6. Grant the new user access to your database: `GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, REFERENCES, CREATE TEMPORARY TABLES, LOCK TABLES ON code-challenge.* TO 'user01'@'%';` (this is to avoid using the root user of the database)
7. Never forget, `$ npm install`

### Initialize your local database

Run `$ npm run typeorm:migrate` to initialize local database.
Note: For future database changes, run the same command.

### Development

1. Start server: $ npm run start

### Migration Commands

1. `$ npm run typeorm:migrate` : migrates database or database changes
2. `$ npm run typeorm:generate` : generates migrations given that new `entity` is created or existing `entities` are changed. Then execute command `1` to apply changes to the database.
3. `$ npm run typeorm:revert` : reverts last database changes

Note: These commands are defined in `package.json` and can be changed according to your code

## OPEN API (SWAGGER)

Swagger has been setup for this challenge.
Once the server starts running, you can go to `http://localhost:3000/api` to see the available API's.

## .env File

Make sure you set up your own Environment Variabless with the correct values in your configuration especially in setting up your database.
Generate your own `Sendgrid API KEY`, `Cloudinary API KEY`, and `Pexels API KEY`.
I have attached a skeleton `.env.example` file for a headstart.
