import React, { createContext, useContext, useState, useCallback } from 'react';
import { CustomAlert } from './custom-alert'; // Assuming CustomAlert is written in JS or correctly typed

const AlertContext = createContext(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

const getPositionStyles = (position) => {
  switch (position) {
    case 'top-left':
      return 'top-4 left-4';
    case 'top-right':
      return 'top-4 right-4';
    case 'top-center':
      return 'top-4 left-1/2 transform -translate-x-1/2';
    case 'bottom-left':
      return 'bottom-4 left-4';
    case 'bottom-right':
      return 'bottom-4 right-4';
    case 'bottom-center':
      return 'bottom-4 left-1/2 transform -translate-x-1/2';
    default:
      return 'top-4 right-4';
  }
};

export const AlertProvider = ({ children, maxAlerts = 5, position = 'top-right' }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback((alertData) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newAlert = { ...alertData, id };

    setAlerts((prev) => {
      const updated = [newAlert, ...prev];
      return updated.slice(0, maxAlerts);
    });
  }, [maxAlerts]);

  const hideAlert = useCallback((id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, clearAllAlerts }}>
      {children}

      {/* Alert Container */}
      <div className={`fixed z-[100] ${getPositionStyles(position)} max-w-sm w-full space-y-3 pointer-events-none`}>
        {alerts.map((alert) => (
          <div key={alert.id} className="pointer-events-auto">
            <CustomAlert
              {...alert}
              onClose={() => hideAlert(alert.id)}
            />
          </div>
        ))}
      </div>
    </AlertContext.Provider>
  );
};
