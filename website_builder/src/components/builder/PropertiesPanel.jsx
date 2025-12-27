import React from 'react';
import { useBuilder } from '../../contexts/BuilderContext';

const PropertiesPanel = () => {
  const { activeComponent } = useBuilder();

  if (!activeComponent) {
    return (
      <div className="w-72 bg-white border-l border-gray-200 p-4 overflow-y-auto">
        <div className="text-center text-gray-500 py-8">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No component selected</h3>
          <p className="mt-1 text-sm text-gray-500">
            Select a component to edit its properties.
          </p>
        </div>
      </div>
    );
  }

  const renderPropertyInput = (key, value) => {
    const inputId = `prop-${key}`;
    
    // Handle different types of properties
    if (typeof value === 'boolean') {
      return (
        <div key={key} className="flex items-center justify-between py-2">
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {key}
          </label>
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input
              type="checkbox"
              id={inputId}
              checked={value}
              onChange={() => {}}
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              htmlFor={inputId}
              className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                value ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            ></label>
          </div>
        </div>
      );
    }

    if (typeof value === 'number') {
      return (
        <div key={key} className="py-2">
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {key}
          </label>
          <input
            type="number"
            id={inputId}
            value={value}
            onChange={() => {}}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      );
    }

    // Default to text input
    return (
      <div key={key} className="py-2">
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {key}
        </label>
        <input
          type="text"
          id={inputId}
          value={value}
          onChange={() => {}}
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    );
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          {activeComponent.type} Properties
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Customize the selected component
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(activeComponent.settings || {}).map(([key, value]) =>
          renderPropertyInput(key, value)
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          type="button"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Remove Component
        </button>
      </div>
    </div>
  );
};

export default PropertiesPanel;
