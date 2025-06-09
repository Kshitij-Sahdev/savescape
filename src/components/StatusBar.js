import React from 'react';

const StatusBar = ({ status }) => {
  if (!status) return null;

  const getStatusColor = () => {
    if (status.toLowerCase().includes('error')) return 'bg-red-900 border-red-600 text-red-100';
    if (status.toLowerCase().includes('success')) return 'bg-green-900 border-green-600 text-green-100';
    return 'bg-blue-900 border-blue-600 text-blue-100';
  };

  return (
    <div className={`fixed bottom-4 left-4 right-4 p-3 rounded border ${getStatusColor()} z-50`}>
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">{status}</span>
      </div>
    </div>
  );
};

export default StatusBar;
