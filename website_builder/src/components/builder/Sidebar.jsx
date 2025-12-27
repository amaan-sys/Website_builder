import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants/dragTypes';

const components = [
  {
    type: 'hero',
    name: 'Hero Section',
    icon: '🏆',
    category: 'Sections',
    defaultSettings: {
      background: 'bg-gradient-to-r from-blue-500 to-purple-600',
      padding: 'py-20',
      textColor: 'text-white',
    },
  },
  {
    type: 'features',
    name: 'Features',
    icon: '✨',
    category: 'Sections',
    defaultSettings: {
      columns: 3,
      padding: 'py-16',
      background: 'bg-white',
    },
  },
  {
    type: 'cta',
    name: 'Call to Action',
    icon: '📢',
    category: 'Sections',
    defaultSettings: {
      background: 'bg-blue-50',
      padding: 'py-16',
      buttonVariant: 'primary',
    },
  },
  {
    type: 'testimonials',
    name: 'Testimonials',
    icon: '💬',
    category: 'Sections',
    defaultSettings: {
      background: 'bg-gray-50',
      padding: 'py-16',
      layout: 'grid',
    },
  },
  {
    type: 'pricing',
    name: 'Pricing Plans',
    icon: '💰',
    category: 'Sections',
    defaultSettings: {
      background: 'bg-white',
      padding: 'py-16',
      plans: 3,
    },
  },
];

const DraggableComponent = ({ type, name, icon, defaultSettings }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { type, defaultSettings },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 mb-2 border rounded-lg cursor-move flex items-center space-x-2 bg-white hover:bg-gray-50 transition-colors ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span>{name}</span>
    </div>
  );
};

const Sidebar = () => {
  const groupedComponents = components.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {});

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Components</h2>
        <div className="space-y-2">
          {Object.entries(groupedComponents).map(([category, items]) => (
            <div key={category} className="mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {category}
              </h3>
              <div className="space-y-2">
                {items.map((component) => (
                  <DraggableComponent key={component.type} {...component} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Pages</h2>
        <div className="space-y-2">
          <button className="w-full text-left p-2 rounded hover:bg-gray-100 text-blue-600 font-medium">
            + Add New Page
          </button>
          <div className="p-2 text-sm text-gray-600">Home</div>
          <div className="p-2 text-sm text-gray-600">About</div>
          <div className="p-2 text-sm text-gray-600">Contact</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
