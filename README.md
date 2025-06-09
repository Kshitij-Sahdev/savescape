# SaveScape - Game Save Manager

A desktop GUI application that lets you track and manage game save files using Git version control. Create snapshots, restore timelines, and explore alternate save paths without touching the terminal.

## 🚀 Features

- **Add Game Save Folder**: Initialize Git tracking for any game save directory
- **Quick Save**: Create timestamped snapshots with one click
- **Timeline View**: Visual history of all your save points
- **Restore Points**: Go back to any previous save state
- **Branch Management**: Create alternate save paths for different playthroughs
- **Folder Size Detection**: Warns about large save folders
- **Modern UI**: Dark theme with intuitive controls

## 🛠️ Prerequisites

Before running SaveScape, you need to install:

1. **Node.js** (v16 or higher) - Download from [nodejs.org](https://nodejs.org/)
2. **Git** - Download from [git-scm.com](https://git-scm.com/)

## 📦 Installation & Setup

1. **Install dependencies**
   ```powershell
   npm install
   ```

2. **Run in development mode**
   ```powershell
   npm run electron-dev
   ```

## 🎮 Usage

### Getting Started
1. Launch SaveScape using `npm run electron-dev`
2. Click "Select Game Save Folder" and choose your game's save directory
3. The app will automatically initialize Git tracking for that folder

### Creating Save Points
- Click the "💾 Create Quick Save" button to create a timestamped snapshot
- All files in the folder will be committed to Git with a timestamp

### Managing Save History
- View all your save points in the Timeline panel
- Click "Restore" next to any save point to revert your files
- The current save is marked with a "CURRENT" badge

### Working with Branches
- Create new branches for alternate playthroughs
- Switch between branches to manage different save paths
- Perfect for games with multiple story routes

## 🧪 Testing

A test game save folder is included at `dev/TestGameSave/` with sample files:
- `save_game.json` - Mock game save data
- `progress_notes.md` - Player notes
- `config.ini` - Game settings

Use this folder to test SaveScape's functionality without risking real game saves.

## 📋 Build Commands

```powershell
# Development with hot reload
npm run electron-dev

# Build React app
npm run build

# Package for distribution
npm run electron-pack
```

## 🏗️ Project Structure

```
savescape/
├── public/
│   ├── electron.js          # Main Electron process
│   ├── preload.js          # IPC bridge
│   └── index.html          # HTML template
├── src/
│   ├── App.js              # Main React component
│   ├── index.js            # React entry point
│   ├── index.css           # Styles with Tailwind
│   └── components/         # React components
├── dev/
│   └── TestGameSave/       # Test data
└── package.json
```

## 🔧 Technology Stack

- **Frontend**: React + Tailwind CSS
- **Desktop**: Electron
- **Git Integration**: simple-git library
- **Build Tools**: Create React App, Electron Builder

## ⚠️ Important Notes

- **Backup First**: Always backup your game saves before using SaveScape
- **Large Folders**: The app warns about folders larger than 100MB
- **Git Repository**: SaveScape creates a `.git` folder in your save directory
- **File Changes**: Restoring save points will overwrite current save files

## 🐛 Troubleshooting

### "Node.js not found"
Install Node.js from [nodejs.org](https://nodejs.org/) and restart your terminal.

### "Git not found"
Install Git from [git-scm.com](https://git-scm.com/) and ensure it's in your PATH.

### "Permission denied"
Run your terminal as administrator if you encounter permission issues.

### "Large folder warning"
Consider excluding unnecessary files (logs, cache) from your save folder.

## 📝 Development

To modify SaveScape:

1. **React Components**: Edit files in `src/components/`
2. **Electron Main Process**: Modify `public/electron.js`
3. **Styling**: Update `src/index.css` (uses Tailwind CSS)
4. **Git Operations**: All Git commands are in `electron.js`

---

**Made with ❤️ for gamers who want to explore every story path**

