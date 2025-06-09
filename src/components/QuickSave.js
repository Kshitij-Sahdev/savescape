import React from 'react';

const QuickSave = ({ onQuickSave, folderSize }) => {
  const getSizeWarning = () => {
    if (!folderSize) return null;
    
    const sizeMB = parseFloat(folderSize.sizeMB);
    if (sizeMB > 100) {
      return (
        <div className="bg-yellow-900 border border-yellow-600 rounded p-2 text-sm">
          ⚠️ Large folder ({folderSize.sizeMB} MB) - saves may take longer
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        💾 Quick Save
      </h2>
      
      <div className="space-y-4">
        {folderSize && (
          <div className="text-sm text-gray-400">
            Folder size: {folderSize.sizeMB} MB
          </div>
        )}
        
        {getSizeWarning()}
        
        <button 
          onClick={onQuickSave}
          className="btn-primary w-full text-lg py-3"
        >
          💾 Create Quick Save
        </button>
        
        <p className="text-gray-400 text-xs">
          Creates a snapshot of all files in the folder with a timestamp
        </p>
      </div>
    </div>
  );
};

export default QuickSave;
