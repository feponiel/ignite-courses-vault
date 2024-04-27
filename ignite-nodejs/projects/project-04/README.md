<img src=".github/forum-banner.svg">

# Ignite NodeJS Project 04: Forum REST API
Forum is a complete forum REST API with Q&A and attachments system made using the Domain-Driven Design approach.

<br />

## Get started
To enjoy this application you will need to run the project on your computer. Start downloading the project and installing the dependencies:

> Is required to have [NodeJS](https://nodejs.org/en) installed on your machine.

```
npm install
```

Then, you'll need to set your JWT RSA-256 Keys and [Amazon S3 Keys (Cloudflare)](https://dash.cloudflare.com/?to=/:account/r2/api-tokens) inside a .env file:

### It's good to remember:
1. After creating your JWT RSA-256 Keys, you will need to convert both to BASE64 before setting them in your .env file.

2. You will need to create two [Cloudflare R2 Buckets](https://dash.cloudflare.com/?to=/:account/r2/new), one for development (or production) and other for testing before creating your Amazon S3 token as mentioned above.

3. Your Amazon S3 keys will be available after you create the [token](https://dash.cloudflare.com/?to=/:account/r2/api-tokens), but it's very important to set the `Object Read & Write` permission, specify your two buckets, and define the TTL as `Forever` on creating your token.

4. Your Cloudflare Account ID will be available in the account details on [overview](https://dash.cloudflare.com/?to=/:account/r2/overview) page.

<br />

> You can see an example of how to setup your environment variables in [.env.example](https://github.com/feponiel/ignite-courses-vault/tree/main/ignite-nodejs/projects/project-04/.env.example) and [.env.test.example](https://github.com/feponiel/ignite-courses-vault/tree/main/ignite-nodejs/projects/project-04/.env.test.example)

```
# Your .env file will look like this

DATABASE_URL="postgresql://postgres:docker@localhost:5432/project-04-db?schema=public"

JWT_PRIVATE_KEY="YOUR_RSA256_PRIVATE_KEY_CONVERTED_TO_BASE64"
JWT_PUBLIC_KEY="YOUR_RSA256_PUBLIC_KEY_CONVERTED_TO_BASE64"

CLOUDFLARE_ACCOUNT_ID="YOUR_CLOUDFLARE_ACCOUNT_ID"
AWS_BUCKET_NAME="YOUR_AWS_BUCKET_NAME"
AWS_ACCESS_KEY_ID="YOUR_AWS_ACCESS_KEY_ID"
AWS_SECRET_ACCESS_KEY="YOUR_AWS_SECRET_ACCESS_KEY"
```
```
# Your .env.test file will look like this

AWS_BUCKET_NAME="YOUR_AWS_TESTING_BUCKET_NAME"
REDIS_DB=1 # The default value is "0" (used in development). By using "1", we are creating other Redis DB only for testing.
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
NodeJS, NestJS, TypeScript, Prisma, Docker, Cloudflare R2, Redis, Zod, JWT, Bcrypt, Vitest, Cookies.

<br />

## More about
<a href="https://github.com/feponiel/ignite-courses-vault/tree/main/ignite-nodejs/projects/project-04/documentation.md">API Documentation</a> | <a href="https://opensource.org/license/mit">License</a>
