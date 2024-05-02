<img src=".github/find-a-friend-banner.svg">

# Ignite NodeJS Challenge 03: Find a Friend REST API
Find a Friend is a REST API made to help you to find your new four-legged friend.

<br />

## Get started
To enjoy this application you will need to run the project on your computer. Start downloading the project and installing the dependencies:

> Is required to have [NodeJS](https://nodejs.org/en) installed on your machine.

```
npm install
```

Then, you'll need to setup your `.env`.

> You can see an example of how to setup your environment variables in [.env.example](https://github.com/feponiel/ignite-courses-vault/tree/main/ignite-nodejs/challenges/challenge-03/.env.example).

```
# Your .env file will look like this

NODE_ENV="development"
SECRET_KEY="RANDOM_TEXT"
DATABASE_URL="postgresql://docker:docker@localhost:5432/ignite-nodejs-challenge-03?schema=public"
```

<br />

Next, you will need to run the PostgreSQL container.

> Is required to have [Docker](https://www.docker.com/get-started/) installed on your machine.

```
docker-compose up
```

Now, you will need to run the migrations

```
npx prisma migrate dev
```

With the database container running, the last step is finally run the application:

```
npm run start:dev
```

<br />

## Technologies & Tools
NodeJS, Fastify, TypeScript, Prisma, Docker, Zod, JWT, Bcrypt, Vitest, Cookies.

<br />

## More about
<a href="https://github.com/feponiel/ignite-courses-vault/tree/main/ignite-nodejs/challenges/challenge-03/documentation.md">API Documentation</a> | <a href="https://opensource.org/license/mit">License</a>
