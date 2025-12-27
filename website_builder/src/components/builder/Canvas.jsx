import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useBuilder } from '../../contexts/BuilderContext';
import Section from '../sections/Section';
import { ItemTypes } from '../../constants/dragTypes';

const Canvas = () => {
  const { pages, currentPage, addSection, reorderSections } = useBuilder();
  const { sections = [] } = pages[currentPage] || {};

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;

      // Add new section when a component is dropped on the canvas
      const newSection = {
        id: `section-${Date.now()}`,
        type: item.type,
        settings: {
          ...item.defaultSettings,
        },
        components: [],
      };
      addSection(newSection);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  }));

  const moveSection = useCallback(
    (dragIndex, hoverIndex) => {
      const dragSection = sections[dragIndex];
      const newSections = [...sections];
      newSections.splice(dragIndex, 1);
      newSections.splice(hoverIndex, 0, dragSection);
      reorderSections(newSections);
    },
    [sections, reorderSections]
  );

  return (
    <div
      ref={drop}
      className={`min-h-full p-4 transition-all duration-200 ${
        isOver ? 'bg-blue-50 border-2 border-dashed border-blue-400' : 'bg-white'
      }`}
    >
      {sections.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <svg
            className="w-16 h-16 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <p className="text-lg">Drag components here to start building</p>
          <p className="text-sm">or choose from the sidebar</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Section
              key={section.id}
              id={section.id}
              index={index}
              section={section}
              moveSection={moveSection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Canvas;
