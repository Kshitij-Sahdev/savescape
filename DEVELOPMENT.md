# SaveScape Development Notes

## Architecture Overview

### Electron Main Process (public/electron.js)
- Handles window creation and management
- Provides IPC handlers for Git operations
- Manages file system access and folder selection
- All Git operations are performed here using simple-git

### React Frontend (src/)
- Modern React with hooks
- Tailwind CSS for styling
- Component-based architecture
- Communicates with Electron via IPC

### IPC Communication
- Uses contextBridge for secure communication
- All Git operations are async and return success/error objects
- preload.js exposes electronAPI to renderer process

## Key Components

### App.js
- Main application state management
- Coordinates between all child components
- Handles data refresh after operations

### FolderSelector
- File dialog integration
- Git repository initialization
- Folder path display and management

### QuickSave
- One-click save creation
- Folder size warnings
- Progress feedback

### Timeline
- Commit history visualization
- Restore point selection
- Commit metadata display

### BranchManager
- Branch creation and switching
- Branch listing and current branch display
- Form handling for new branch names

### StatusBar
- Global status message display
- Color-coded status types (error/success/info)
- Fixed positioning for visibility

## Git Integration

All Git operations are performed in the main process using simple-git:

- `git init` - Initialize repository
- `git add .` - Stage all changes
- `git commit` - Create save points
- `git log` - Get commit history
- `git checkout` - Restore to commits or switch branches
- `git branch` - List and manage branches

## File Structure

```
savescape/
├── public/
│   ├── electron.js      # Main Electron process
│   ├── preload.js       # IPC bridge
│   ├── index.html       # HTML template
│   └── manifest.json    # PWA manifest
├── src/
│   ├── App.js           # Main React component
│   ├── index.js         # React entry point
│   ├── index.css        # Tailwind styles
│   └── components/      # All React components
├── dev/
│   └── TestGameSave/    # Test data folder
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── setup.bat           # Setup script
└── start-dev.bat       # Development launcher
```

## Development Workflow

1. **Setup**: Run setup.bat to install dependencies
2. **Development**: Use npm run electron-dev or start-dev.bat
3. **Testing**: Use dev/TestGameSave/ folder for safe testing
4. **Building**: Use npm run build && npm run electron-pack

## Future Enhancements

### Planned Features
- [ ] Auto-detection of common game save locations
- [ ] Steam integration for automatic game detection
- [ ] Export/import of save archives
- [ ] Save tagging and custom labels
- [ ] Scheduled auto-saves
- [ ] Save file diff visualization
- [ ] Multi-folder project support

### Technical Improvements
- [ ] Add TypeScript support
- [ ] Implement proper error boundaries
- [ ] Add unit tests for components
- [ ] Optimize Git operations for large folders
- [ ] Add progress indicators for long operations
- [ ] Implement save file encryption
- [ ] Add keyboard shortcuts

## Common Issues

### Large Save Folders
- Monitor folder sizes > 100MB
- Consider .gitignore for cache/log files
- Implement progress bars for large operations

### Git Conflicts
- Handle merge conflicts gracefully
- Provide user-friendly conflict resolution
- Backup before destructive operations

### Cross-Platform Compatibility
- Test path handling on different OS
- Handle different line endings
- Account for filesystem differences

## Testing

### Manual Testing Checklist
- [ ] Folder selection works
- [ ] Git initialization succeeds
- [ ] Quick save creates commits
- [ ] Timeline displays correctly
- [ ] Restore functionality works
- [ ] Branch creation/switching works
- [ ] Large folder warning appears
- [ ] Status messages display properly

### Test Data
Use dev/TestGameSave/ with various file types:
- JSON save data
- Configuration files
- Progress notes
- Different file sizes

## Security Considerations

- Uses contextBridge for secure IPC
- No nodeIntegration in renderer
- All file operations in main process
- Validates file paths before operations
- No direct shell command execution in renderer

## Performance Notes

- Git operations are async to prevent UI blocking
- Commit history is limited to prevent memory issues
- File watching could be added for real-time updates
- Consider pagination for large commit histories

## Distribution

### Building Executables
```bash
npm run build          # Build React app
npm run electron-pack  # Package with Electron Builder
```

### Output
- Windows: .exe installer in dist/
- macOS: .dmg file in dist/
- Linux: .AppImage in dist/

### Code Signing
- Add certificates for Windows/macOS distribution
- Configure signing in package.json build section
- Test installers on clean systems
