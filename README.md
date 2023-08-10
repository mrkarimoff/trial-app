# Trial Project Next.js 13

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Localization](#localization)
- [Styling](#styling)
- [Deployment](#deployment)
- [Contact](#contact)

## Introduction

This project is a trial application showcasing the use of Next.js and related technologies to implement various features and functionality.

## Features

- User system with roles: admin, user, and participant
- GitHub OAuth provider for account sign-up and login
- Ability to change user roles
- Admin-only page to upload JSON files to SQLite database using Prisma
- Page for logged-in users to view and download uploaded JSON files
- API routes for admin user list and public JSON data
- Language localization using Next Intl for multiple languages
- Styling using Tailwind CSS with Shadcn UI components
- Light and dark mode support with toggle functionality
- Integration of Redux Toolkit for state management
- Framer Motion for animations

## Technologies

- Next.js 13 App Router
- Prisma with PostgreSQL
- Next Auth for authentication
- Next Intl for internationalization (i18n)
- TypeScript for type-safe code
- Redux Toolkit for state management
- Tailwind CSS with Shadcn UI for styling
- Framer Motion for animations

## Installation

1. Clone this repository: `git clone`
2. Navigate to the project directory: `cd project-directory`
3. Install dependencies: `npm install`

## Usage

1. Set up environment variables as required (e.g., database configuration, GitHub OAuth credentials).
2. Start the development server: `npm run dev`
3. Open your browser and access the app at `http://localhost:3000`

## API Routes

- `/api/admin`: Returns a list of all users on the system (admin role required).
- `/api/public`: Returns the most recently uploaded JSON data (no authentication required).

## Localization

The application supports language localization using Next Intl. English and Russian languages are implemented.

## Styling

The app is styled using Tailwind CSS along with Shadcn UI components. Light and dark mode are available and can be toggled via the UI.

## Deployment

The app is deployed using Vercel's hobby tier. You can access the deployed app at [Deployment URL](https://trial-app-mk.vercel.app).
