import React from 'react';

const Timeline = ({ commits, onRestore, currentBranch }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getCommitIcon = (message) => {
    if (message.includes('Quick Save')) return '💾';
    if (message.includes('Merge')) return '🔀';
    if (message.includes('Initial')) return '🚀';
    return '📝';
  };

  if (commits.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="text-6xl mb-4">📈</div>
        <h3 className="text-xl font-semibold mb-2">No saves yet</h3>
        <p className="text-gray-400">Create your first quick save to see the timeline</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">📈 Save Timeline</h2>
        {currentBranch && (
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
            Branch: {currentBranch}
          </span>
        )}
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {commits.map((commit, index) => (
          <div 
            key={commit.hash}
            className="flex items-center space-x-4 p-3 bg-dark-900 rounded border hover:bg-gray-800 transition-colors"
          >
            <div className="text-2xl">
              {getCommitIcon(commit.message)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <p className="font-semibold truncate">{commit.message}</p>
                {index === 0 && (
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs">
                    CURRENT
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>{formatDate(commit.date)}</span>
                <span>by {commit.author}</span>
                <span className="font-mono text-xs">{commit.hash.substring(0, 7)}</span>
              </div>
            </div>
            
            {index !== 0 && (
              <button 
                onClick={() => onRestore(commit.hash)}
                className="btn-secondary text-sm px-3 py-1"
              >
                Restore
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
