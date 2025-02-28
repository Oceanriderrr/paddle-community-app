# Paddle Community App

A full-stack Next.js application connecting Hawaii’s canoe paddling community—paddlers and escort boats—rooted in traditional Hawaiian culture with a modern, polished design.

## Overview
This app aims to unite paddlers and boat owners in Hawaii, facilitating connections, event planning, and boat requests. It features a sleek UI inspired by koa wood, taro green, and ocean turquoise, with mock authentication in place and MongoDB Atlas connected.

## Current Features
- **UI Design**: Traditional Hawaiian style (gradient background, wave accents, vignette) across all pages:
  - Homepage (`/`): Community board and navigation.
  - Paddlers (`/paddlers`): List of paddlers with Connect buttons.
  - Boats (`/boats`): List of escort boats with Book buttons.
  - Login (`/login`) & Signup (`/signup`): Forms with role selection (Paddler or Boat).
- **Authentication**: Mock setup using NextAuth.js with email/password and role-based accounts (Paddler/Boat).
- **Database**: MongoDB Atlas connected (mock data only so far).

## Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, Google Fonts (Poppins).
- **Backend**: NextAuth.js (Pages Router for API), MongoDB Atlas.
- **Tools**: Git, GitHub for version control.

## Setup Instructions
1. **Clone the Repo**:
   ```bash
   git clone https://github.com/your-username/paddle-community-app.git
   cd paddle-community-app