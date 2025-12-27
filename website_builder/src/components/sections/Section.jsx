import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants/dragTypes';
import { useBuilder } from '../../contexts/BuilderContext';

const Section = ({ id, index, section, moveSection, children }) => {
  const ref = useRef(null);
  const { setActiveComponent, removeSection } = useBuilder();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SECTION,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: ItemTypes.SECTION,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveSection(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  // Initialize drag and drop functionality
  drag(drop(ref));

  const renderSectionContent = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="text-center p-12 rounded-lg">
            <h1 className="text-4xl font-bold mb-4">Hero Section</h1>
            <p className="text-xl mb-6">This is a hero section. You can edit this text.</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Get Started
            </button>
          </div>
        );
      case 'features':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 text-xl">✨</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Feature {i}</h3>
                <p className="text-gray-600">
                  This is a sample feature description. You can edit this content.
                </p>
              </div>
            ))}
          </div>
        );
      case 'cta':
        return (
          <div className="bg-blue-600 text-white p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-xl mb-6">Sign up today and start building your dream website.</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Sign Up Now
            </button>
          </div>
        );
      default:
        return (
          <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <p className="text-gray-500">Unsupported section type: {section.type}</p>
          </div>
        );
    }
  };

  return (
    <div
      ref={ref}
      className={`relative group rounded-lg overflow-hidden transition-all duration-200 mb-6 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      onClick={() => setActiveComponent({ ...section, sectionId: id })}
    >
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-lg pointer-events-none transition-all duration-200"></div>
      
      {/* Section Controls */}
      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          className="bg-white p-1 rounded-full shadow-md text-gray-600 hover:text-blue-600"
          onClick={(e) => {
            e.stopPropagation();
            removeSection(id);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button className="bg-white p-1 rounded-full shadow-md text-gray-600 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
          </svg>
        </button>
      </div>
      
      {/* Section Content */}
      <div className={`${section.settings?.background || 'bg-white'} ${section.settings?.padding || 'p-8'} rounded-lg`}>
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default Section;
