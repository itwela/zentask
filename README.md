## Setup

Download
---

To download the repository, follow these steps:

Click on the green "Code" button located towards the top right.

In the dropdown, select your preferred method of download:

Download ZIP: This will download the repository as a compressed ZIP file to your local machine. Extract the contents to your desired location.

Clone Repository: If you have Git installed, you can clone the repository using the provided URL. Open a terminal or command prompt, navigate to your desired directory using: 

```bash
cd your-desired-location 
```

and use the following command:

```bash
git clone https://github.com/itwela/zentask.git
```

## Getting Started

Make sure you are in your desired folder location before continuing.

Then, install dependencies:

```bash
cd npm i
```
Next, create a " .env.local " file in the root directory and paste this in the .env.local file:

```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cHJldHR5LW11bGUtMzYuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_4zEpeubK9E9usLX4Vwv5u7pDNgIXVDFcdY3tH7wngb
```

After, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Tip: WHen you are signing in, if you get stuck, click the Stuck button it should help if any issues arise there.**

## Features:

🌐 nextjs App Router

🔐 Clerk Authentication

💿 supabase Database

💨 prisma Orm

🎨 Styling with tailwindcss and Chakra UI

Pending States

Cache Revalidation

Server side implementation

Home

Projects

Thoughts

Calendar/Today and Upcoming Tasks

User account management


# Resources Used

- Next.js: https://nextjs.org
- Clerk Auth: https://clerk.com
- Mterial Ui: https://mui.com/material-ui/
- Chakra Ui: https://chakra-ui.com
- Tailwind.css: https://tailwindcss.com
- Stripe: https://stripe.com
- Prisma: https://prisma.io
- Supabase: https://supabase.com
<!-- Shadcn/UI: https://ui.shadcn.com -->

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`]


