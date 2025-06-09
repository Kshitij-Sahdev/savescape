### 📝 — SaveScape MVP

---

#### 🧠 Project Overview

Build a **desktop GUI app** that lets users track and manage game save files using Git under the hood. Inspired by branching story games like *Sekiro*, the app allows users to create snapshots, restore timelines, and explore alternate paths — all without touching the terminal.

---

#### 🛠️ Tech Stack

* **Frontend:** Electron + React (UI)
* **Backend:** Node.js (for file ops & Git)
* **Git Integration:** `simple-git` Node.js library
* **Packaging:** `electron-builder` (cross-platform distribution)
* **UI Styling:** Tailwind CSS

---

#### 🔑 Core Features (MVP)

1. **Add Game Save Folder**

   * UI: Input field to select/save path
   * Function: Initialize Git repo at that folder (if not already)

2. **Quick Save**

   * UI: Button
   * Function: `git add . && git commit -m "Quick Save - <timestamp>"`

3. **Timeline View**

   * UI: Simple vertical list of commits (use `git log` under the hood)
   * Function: Show commit message + date

4. **Restore Point**

   * UI: Click a commit, confirm restore
   * Function: `git checkout <commit hash>`

5. **Create Branch**

   * UI: Input branch name, base it on current commit
   * Function: `git checkout -b <name>`

6. **Switch Between Branches**

   * UI: Dropdown menu or list of branches
   * Function: `git checkout <branch>`

---

#### ✨ Optional (if agent is smart & time permits)

* Detect game save size & warn if too large
* Save tagging (allow custom labels on commits)
* Auto-backup zip export feature
* Detect Steam games & common save paths

---

#### 🧪 Testing

* Include one fake “Game Save Folder” in `dev/` directory for testing Git ops
* Add logging (console or log file) for all Git commands executed

---

#### 📦 Deliverables

* Electron App (launchable from VS Code)
* `.exe` or `.app` (if building full binary)
* README with usage instructions

---

#### 🦼‍♂️ Agent Instructions

If using Claude or another AI agent:

* Set up project structure: Electron + React frontend, Node backend
* Install dependencies
* Build working MVP with Git integration
* Run in local dev mode
* Package if possible
