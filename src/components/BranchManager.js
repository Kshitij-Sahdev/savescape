import React, { useState } from 'react';

const BranchManager = ({ branches, currentBranch, onCreateBranch, onSwitchBranch }) => {
  const [newBranchName, setNewBranchName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateBranch = (e) => {
    e.preventDefault();
    if (newBranchName.trim()) {
      onCreateBranch(newBranchName.trim());
      setNewBranchName('');
      setShowCreateForm(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        🌿 Branches
      </h2>
      
      <div className="space-y-4">
        {/* Current Branch */}
        {currentBranch && (
          <div className="p-3 bg-primary-900 border border-primary-600 rounded">
            <p className="text-sm text-primary-300">Current branch:</p>
            <p className="font-semibold text-primary-100">{currentBranch}</p>
          </div>
        )}

        {/* Branch List */}
        {branches.length > 1 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Switch to branch:</p>
            {branches.filter(branch => branch !== currentBranch).map(branch => (
              <button
                key={branch}
                onClick={() => onSwitchBranch(branch)}
                className="w-full text-left p-2 bg-dark-900 hover:bg-gray-700 rounded border text-sm transition-colors"
              >
                {branch}
              </button>
            ))}
          </div>
        )}

        {/* Create New Branch */}
        <div className="border-t border-gray-700 pt-4">
          {!showCreateForm ? (
            <button 
              onClick={() => setShowCreateForm(true)}
              className="btn-secondary w-full"
            >
              + Create New Branch
            </button>
          ) : (
            <form onSubmit={handleCreateBranch} className="space-y-3">
              <input
                type="text"
                value={newBranchName}
                onChange={(e) => setNewBranchName(e.target.value)}
                placeholder="Enter branch name..."
                className="input-field w-full"
                autoFocus
              />
              <div className="flex space-x-2">
                <button type="submit" className="btn-primary flex-1">
                  Create
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewBranchName('');
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          <p className="text-gray-400 text-xs mt-2">
            Create alternate save paths for different playthroughs
          </p>
        </div>
      </div>
    </div>
  );
};

export default BranchManager;
