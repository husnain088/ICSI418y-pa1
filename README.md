# My Task List

**Name:** Muhammad Husnain
**Course:** ICSI 418Y – Software Engineering
**Assignment:** Programming Assignment 1 – Interactive Web Page

## Description

My Task List is a small client-side web application that lets a user manage a simple to-do list for a browsing session. A user can type in a task name, choose a priority (Low, Medium, or High), and add it to the list. Each task in the list can be marked as completed (and undone again) or deleted. The app is built with plain HTML, CSS, and JavaScript — no frameworks or libraries. The visual style takes some inspiration from Apple's Reminders app (light background, rounded card, colored priority dots), kept simple on purpose.

## Features

- Add a task with a name and a priority level
- Empty task names are rejected with an on-page error message
- Mark a task as completed — completed tasks show a strikethrough and a colored checkmark circle
- Undo a completed task back to incomplete
- Delete a task without affecting the others
- Live task counter showing how many tasks are remaining
- Color-coded priority dots (green = Low, orange = Medium, red = High)

## Files

```
pa1-task-list/
│
├── index.html   # Page structure: form + task display area
├── style.css    # Styling, layout, and completed/priority visual states
├── script.js    # Task storage and all interactive behavior
└── README.md    # This file
```


## How It Works (brief)

- **HTML (`index.html`)** provides a heading, a form with a text input for the task name and a `<select>` for priority, an Add button, and an empty `<div id="task-list">` where tasks are rendered.
- **CSS (`style.css`)** styles the form and task rows with plain properties (background-color, border, border-radius, padding, margin — no advanced effects), and gives completed tasks (`.completed`) a distinct look: strikethrough text and a filled checkmark circle.
- **JavaScript (`script.js`)** stores tasks in an in-memory array of objects (`{ id, name, priority, completed }`). A `submit` event listener on the form validates the input, pushes a new task object onto the array, and calls `displayTasks()` to redraw the list from scratch with a simple `for` loop and `document.createElement`. Each rendered task gets its own checkbox and Delete button, wired to `toggleComplete(id)` and `deleteTask(id)`, which update the array and re-render.

