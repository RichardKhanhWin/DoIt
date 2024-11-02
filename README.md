This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run the app locally, you must use a 64-bit system to be able to run the app, as Next.js is only compatible with 64-bit systems. You also need to have Node.js and PostgreSQL installed. I used Node.js 20.10.0 and PostgreSQL 14.3, though later versions of Node.js and PostgreSQL might still work.

First, make sure you have created a PostgreSQL database for the application.

Install the packages:

```bash
npm install
```

Create an `.env` file in the DoIt folder and paste the content of the `.env.example` file. Then update the `.env` file accordingly by adding your PostgreSQL username, password, and database name.

Generate a prisma client and migrate by running the following commands:

```bash
npx prisma generate
npx prisma migrate dev
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to access the app.
