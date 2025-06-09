const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const simpleGit = require('simple-git');
const fs = require('fs').promises;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../build/icon.png'),
    show: false
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC handlers for Git operations
ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    title: 'Select Game Save Folder'
  });
  
  if (result.canceled) {
    return null;
  }
  
  return result.filePaths[0];
});

ipcMain.handle('init-git-repo', async (event, folderPath) => {
  try {
    const git = simpleGit(folderPath);
    
    // Check if already a git repo
    const isRepo = await git.checkIsRepo();
    if (!isRepo) {
      await git.init();
      console.log(`Git repository initialized at: ${folderPath}`);
    }
    
    return { success: true, message: 'Git repository ready' };
  } catch (error) {
    console.error('Error initializing Git repo:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('quick-save', async (event, folderPath) => {
  try {
    const git = simpleGit(folderPath);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const message = `Quick Save - ${timestamp}`;
    
    await git.add('.');
    await git.commit(message);
    
    console.log(`Quick save created: ${message}`);
    return { success: true, message: 'Quick save created successfully' };
  } catch (error) {
    console.error('Error creating quick save:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-commits', async (event, folderPath) => {
  try {
    const git = simpleGit(folderPath);
    const log = await git.log(['--oneline', '--graph', '--all', '--decorate']);
    
    const commits = log.all.map(commit => ({
      hash: commit.hash,
      message: commit.message,
      date: commit.date,
      author: commit.author_name
    }));
    
    return { success: true, commits };
  } catch (error) {
    console.error('Error getting commits:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('restore-to-commit', async (event, folderPath, commitHash) => {
  try {
    const git = simpleGit(folderPath);
    await git.checkout(commitHash);
    
    console.log(`Restored to commit: ${commitHash}`);
    return { success: true, message: 'Successfully restored to selected point' };
  } catch (error) {
    console.error('Error restoring to commit:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('create-branch', async (event, folderPath, branchName) => {
  try {
    const git = simpleGit(folderPath);
    await git.checkoutLocalBranch(branchName);
    
    console.log(`Created and switched to branch: ${branchName}`);
    return { success: true, message: `Branch '${branchName}' created successfully` };
  } catch (error) {
    console.error('Error creating branch:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-branches', async (event, folderPath) => {
  try {
    const git = simpleGit(folderPath);
    const branches = await git.branchLocal();
    
    return { 
      success: true, 
      branches: branches.all,
      current: branches.current
    };
  } catch (error) {
    console.error('Error getting branches:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('switch-branch', async (event, folderPath, branchName) => {
  try {
    const git = simpleGit(folderPath);
    await git.checkout(branchName);
    
    console.log(`Switched to branch: ${branchName}`);
    return { success: true, message: `Switched to branch '${branchName}'` };
  } catch (error) {
    console.error('Error switching branch:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('get-folder-size', async (event, folderPath) => {
  try {
    const getDirectorySize = async (dirPath) => {
      let size = 0;
      const files = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const file of files) {
        const filePath = path.join(dirPath, file.name);
        if (file.isDirectory()) {
          size += await getDirectorySize(filePath);
        } else {
          const stats = await fs.stat(filePath);
          size += stats.size;
        }
      }
      return size;
    };
    
    const size = await getDirectorySize(folderPath);
    const sizeMB = (size / (1024 * 1024)).toFixed(2);
    
    return { success: true, size, sizeMB };
  } catch (error) {
    console.error('Error getting folder size:', error);
    return { success: false, error: error.message };
  }
});
