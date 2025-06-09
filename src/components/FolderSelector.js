import React from 'react';

const FolderSelector = ({ onFolderSelected, currentFolder }) => {
  const handleSelectFolder = async () => {
    const folderPath = await window.electronAPI.selectFolder();
    if (folderPath) {
      onFolderSelected(folderPath);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        📁 Game Save Folder
      </h2>
      
      {currentFolder ? (
        <div className="space-y-3">
          <div className="p-3 bg-dark-900 rounded border">
            <p className="text-sm text-gray-400">Current folder:</p>
            <p className="text-sm font-mono break-all">{currentFolder}</p>
          </div>
          <button 
            onClick={handleSelectFolder}
            className="btn-secondary w-full"
          >
            Change Folder
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-400 text-sm">
            Select a folder containing your game save files to begin tracking versions.
          </p>
          <button 
            onClick={handleSelectFolder}
            className="btn-primary w-full"
          >
            Select Game Save Folder
          </button>
        </div>
      )}
    </div>
  );
};

export default FolderSelector;
