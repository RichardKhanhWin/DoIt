This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run the app locally, you must use a 64-bit system to be able to run the app, as Next.js i sonly compatible with 64-bit systems. You also need to have Node.js and PostgreSQL installed. I used Node.js 20.10.0 and PostgreSQL 14.3, though later versions of Node.js and PostgreSQL might still work.

Create an `.env.local` file in the DoIt folder and paste the content of the `.env` file. Then update the `.env.local` file accordingly by adding your postgres username, password, and database name.

Install the packages:

```bash
npm install
```

Generate a prisma client by running the following command:

```bash
npx prisma generate
```

Before running the application, make sure that PostgreSQL is running.

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to access the app.
