<img src=".github/ignite-call-banner.svg">

# Ignite ReactJS Project 06: Ignite Call
Ignite Call is a scheduling application integrated with Google Calendar, where you can make easy the process of scheduling meetings.

<br />

## Get started
To enjoy this application you will need to run the project on your computer. Start downloading the project and installing the dependencies:

> Is required to have [NodeJS](https://nodejs.org/en) installed on your machine.

```
npm install
```

Then, you'll need to set your [Google oAuth API Credentials](https://console.cloud.google.com/projectselector2/apis/credentials/oauthclient) inside a .env file.

> You can read more about in: [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2)
 
<br />

### It's good to remember:
When creating your oAuth Client ID Credential, it's very important to set `http://localhost:3000/api/auth/callback/google"` as an Authorized Redirect URI

> You shouldn't forget to [active the Google Calendar API](https://console.cloud.google.com/apis/library/calendar-json.googleapis.com) in your project

> You can see an example of how to setup your environment variables in [.env.example](https://github.com/feponiel/ignite-courses-vault/tree/main/ignite-reactjs/projects/project-06/.env.example)

```
# Your .env file will look like this

DATABASE_URL="postgresql://postgres:docker@localhost:5432/ignitecall"
DATABASE_DIRECT_URL="postgresql://postgres:docker@localhost:5432/ignitecall"

GOOGLE_CLIENT_ID="YOUR_GOOGLE_OAUTH_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_OAUTH_CLIENT_SECRET"

# The Next auth secret can be any text

NEXTAUTH_SECRET="RANDOM_TEXT"
```

<br />

Next, you will need to run the PostgreSQL container.

> Is required to have [Docker](https://www.docker.com/get-started/) installed on your machine.

```
docker-compose up
```

After these steps, you will need to run the migrations

```
npx prisma migrate dev
```

Now, the last step is finally run the application:

```
npm run dev
```

<br />

## Technologies & Tools
ReactJS, NextJS, Stitches, TypeScript, Prisma, Docker, React Query, Next API Routes, oAuth, Google Calendar API, Axios.

<br />

## More about
<a href="https://www.figma.com/file/AguHzZrqcMUVta7MEJTQP9/Ignite-Call-(Community)">Figma Layout</a> | <a href="https://opensource.org/license/mit">License</a>
