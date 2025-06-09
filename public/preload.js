const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  initGitRepo: (folderPath) => ipcRenderer.invoke('init-git-repo', folderPath),
  quickSave: (folderPath) => ipcRenderer.invoke('quick-save', folderPath),
  getCommits: (folderPath) => ipcRenderer.invoke('get-commits', folderPath),
  restoreToCommit: (folderPath, commitHash) => ipcRenderer.invoke('restore-to-commit', folderPath, commitHash),
  createBranch: (folderPath, branchName) => ipcRenderer.invoke('create-branch', folderPath, branchName),
  getBranches: (folderPath) => ipcRenderer.invoke('get-branches', folderPath),
  switchBranch: (folderPath, branchName) => ipcRenderer.invoke('switch-branch', folderPath, branchName),
  getFolderSize: (folderPath) => ipcRenderer.invoke('get-folder-size', folderPath)
});
