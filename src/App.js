import React, { useState, useEffect } from 'react';
import './index.css';
import FolderSelector from './components/FolderSelector';
import QuickSave from './components/QuickSave';
import Timeline from './components/Timeline';
import BranchManager from './components/BranchManager';
import StatusBar from './components/StatusBar';

function App() {
  const [currentFolder, setCurrentFolder] = useState('');
  const [commits, setCommits] = useState([]);
  const [branches, setBranches] = useState([]);
  const [currentBranch, setCurrentBranch] = useState('');
  const [status, setStatus] = useState('');
  const [folderSize, setFolderSize] = useState(null);

  const refreshData = async () => {
    if (!currentFolder) return;

    try {
      // Get commits
      const commitsResult = await window.electronAPI.getCommits(currentFolder);
      if (commitsResult.success) {
        setCommits(commitsResult.commits);
      }

      // Get branches
      const branchesResult = await window.electronAPI.getBranches(currentFolder);
      if (branchesResult.success) {
        setBranches(branchesResult.branches);
        setCurrentBranch(branchesResult.current);
      }

      // Get folder size
      const sizeResult = await window.electronAPI.getFolderSize(currentFolder);
      if (sizeResult.success) {
        setFolderSize(sizeResult);
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
      setStatus('Error refreshing data');
    }
  };

  useEffect(() => {
    refreshData();
  }, [currentFolder]);

  const handleFolderSelected = async (folderPath) => {
    setCurrentFolder(folderPath);
    setStatus(`Selected folder: ${folderPath}`);
    
    // Initialize Git repo
    const result = await window.electronAPI.initGitRepo(folderPath);
    if (result.success) {
      setStatus(result.message);
      await refreshData();
    } else {
      setStatus(`Error: ${result.error}`);
    }
  };

  const handleQuickSave = async () => {
    if (!currentFolder) return;
    
    const result = await window.electronAPI.quickSave(currentFolder);
    if (result.success) {
      setStatus(result.message);
      await refreshData();
    } else {
      setStatus(`Error: ${result.error}`);
    }
  };

  const handleRestore = async (commitHash) => {
    if (!currentFolder) return;
    
    const confirmed = window.confirm('Are you sure you want to restore to this point? This will change your save files.');
    if (!confirmed) return;
    
    const result = await window.electronAPI.restoreToCommit(currentFolder, commitHash);
    if (result.success) {
      setStatus(result.message);
      await refreshData();
    } else {
      setStatus(`Error: ${result.error}`);
    }
  };

  const handleCreateBranch = async (branchName) => {
    if (!currentFolder) return;
    
    const result = await window.electronAPI.createBranch(currentFolder, branchName);
    if (result.success) {
      setStatus(result.message);
      await refreshData();
    } else {
      setStatus(`Error: ${result.error}`);
    }
  };

  const handleSwitchBranch = async (branchName) => {
    if (!currentFolder) return;
    
    const result = await window.electronAPI.switchBranch(currentFolder, branchName);
    if (result.success) {
      setStatus(result.message);
      await refreshData();
    } else {
      setStatus(`Error: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-500 mb-2">SaveScape</h1>
          <p className="text-gray-400">Manage your game saves with Git-powered version control</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Setup & Controls */}
          <div className="space-y-6">
            <FolderSelector onFolderSelected={handleFolderSelected} currentFolder={currentFolder} />
            
            {currentFolder && (
              <>
                <QuickSave onQuickSave={handleQuickSave} folderSize={folderSize} />
                <BranchManager 
                  branches={branches}
                  currentBranch={currentBranch}
                  onCreateBranch={handleCreateBranch}
                  onSwitchBranch={handleSwitchBranch}
                />
              </>
            )}
          </div>

          {/* Center Panel - Timeline */}
          <div className="lg:col-span-2">
            {currentFolder ? (
              <Timeline 
                commits={commits} 
                onRestore={handleRestore}
                currentBranch={currentBranch}
              />
            ) : (
              <div className="card text-center py-12">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-2xl font-semibold mb-2">Welcome to SaveScape</h3>
                <p className="text-gray-400">Select a game save folder to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <StatusBar status={status} />
      </div>
    </div>
  );
}

export default App;
