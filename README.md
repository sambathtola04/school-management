<<<<<<< HEAD
# Academix — School Management System

A full-featured React school management system with 6 modules.

## Quick Start

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000)

## Modules

| Module     | Features |
|------------|----------|
| Dashboard  | Stats, enrollment chart, course capacity, recent students, events |
| Students   | Full CRUD, search, GPA bars, attendance tracker |
| Teachers   | Faculty management, subjects, class assignments |
| Courses    | Course catalog, teacher assignment, enrollment capacity |
| Grades     | Grade report with color-coded A/B/C/D scoring |
| Events     | School calendar with typed events (exam/meeting/holiday) |

## Project Structure

```
src/
├── App.jsx                  # Root component + routing
├── styles.js                # All CSS (injected as <style>)
├── index.js                 # React entry point
├── data/
│   └── mockData.js          # Seed data for all modules
└── components/
    ├── Icon.jsx             # SVG icon set
    ├── Modal.jsx            # Reusable modal wrapper
    ├── Dashboard.jsx        # Overview page
    ├── Students.jsx         # Students CRUD
    ├── Teachers.jsx         # Teachers CRUD
    ├── Courses.jsx          # Courses CRUD
    ├── Grades.jsx           # Grade report
    └── Events.jsx           # Events CRUD
```

## Tech Stack

- React 18 (hooks only, no external state libraries)
- No UI component library — all custom CSS
- Google Fonts: Fraunces (display) + DM Sans (body)
- Zero runtime dependencies beyond React
=======
# school-management
>>>>>>> 67add80d57c73167c734757cc2097c3e7e8f50ba
