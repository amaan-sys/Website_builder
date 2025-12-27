import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useBuilder } from '../../contexts/BuilderContext';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import Canvas from './Canvas';
import PropertiesPanel from './PropertiesPanel';

const Builder = () => {
  const { editMode } = useBuilder();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen bg-gray-100">
        {/* Top Toolbar */}
        <Toolbar />

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Components */}
          <Sidebar />

          {/* Main Canvas */}
          <div className="flex-1 overflow-auto p-4">
            <Canvas />
          </div>

          {/* Right Sidebar - Properties */}
          <PropertiesPanel />
        </div>

        {/* Bottom Status Bar */}
        <div className="bg-gray-800 text-white text-sm p-2 flex justify-between items-center">
          <div>
            {editMode === 'content' ? 'Content Mode' : 'Layout Mode'}
          </div>
          <div className="space-x-4">
            <button className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700">
              Save
            </button>
            <button className="px-3 py-1 bg-green-600 rounded hover:bg-green-700">
              Preview
            </button>
            <button className="px-3 py-1 bg-purple-600 rounded hover:bg-purple-700">
              Publish
            </button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Builder;
