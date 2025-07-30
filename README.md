# Game Recommendation System

## Project Summary

This full-stack web application uses a content-based video game recommendation system that helps users discover new games based on their preferences. This application features a data pipeline that extracts game data from the IGDB API and loads it into a relational database. It alsp has an interactive, mobile-friendly frontend that allows users to explore games, apply filters, and learn about similar titles.

---

## Features

### Backend

- **Data Pipeline**: collects IGDB data, cleans it, and stores it in a PostgreSQL database.

- **Python Modules**: queries the database with raw SQL.

- **REST API**: Flask-based API that provides endpoints to fetch game data.

### Frontend

- **Main Page**: lists popular and recent games, with filters and search bar.

- **Game Search & Filters**: users can enter a game they like and apply filters (genre and platform) to discover similar titles.

- **Game Details Page**: each game links to a detail view with expanded information (developer, cover art, rating, release date, etc.).

---

## Tech Stack

| Category            | Tools / Frameworks                                 |
|---------------------|----------------------------------------------------|
| **Frontend**        | React (Vite), TypeScript, TailwindCSS              |
| **Backend**         | Python, Flask, PostgreSQL                          |
| **Version Control** | Git + GitHub                                       |

---

## Design Notes

- **Color Palette**:
  - Primary: #1e3a8a (Navy Blue)
  - Accent Colors: #f3f4f6 (Light Gray), #60a5fa (Sky Blue)

- **Mobile Friendliness**:
  - Fully responsive layout
  - Touch-friendly navigation and image scaling

---

## Future Additions

- **ML Review Summarizer**: Integrate a machine learning model to summarize user/game reviews and display them on each game page.

- **Interactive Dashboard**: Visualize trends such as genre popularity, platform growth, and rating distributions.

---

## Status

**Actively in development**
- First release targeted: October 1st, 2025
- Check back for live demo and updates!