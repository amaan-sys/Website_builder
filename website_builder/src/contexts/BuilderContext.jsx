import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Action Types
const ADD_SECTION = 'ADD_SECTION';
const UPDATE_SECTION = 'UPDATE_SECTION';
const REMOVE_SECTION = 'REMOVE_SECTION';
const REORDER_SECTIONS = 'REORDER_SECTIONS';
const SET_EDIT_MODE = 'SET_EDIT_MODE';
const SET_ACTIVE_COMPONENT = 'SET_ACTIVE_COMPONENT';
const UPDATE_COMPONENT = 'UPDATE_COMPONENT';

// Initial State
const initialState = {
  pages: {
    home: {
      id: 'home',
      title: 'Home',
      path: '/',
      sections: [],
      metadata: {
        title: 'My Awesome Website',
        description: 'Built with Website Builder',
      },
    },
  },
  currentPage: 'home',
  editMode: 'content', // 'content' or 'layout'
  activeComponent: null,
  selectedComponent: null,
};

// Reducer
function builderReducer(state, action) {
  switch (action.type) {
    case ADD_SECTION:
      return {
        ...state,
        pages: {
          ...state.pages,
          [state.currentPage]: {
            ...state.pages[state.currentPage],
            sections: [...state.pages[state.currentPage].sections, action.payload],
          },
        },
      };
    
    case UPDATE_SECTION:
      return {
        ...state,
        pages: {
          ...state.pages,
          [state.currentPage]: {
            ...state.pages[state.currentPage],
            sections: state.pages[state.currentPage].sections.map(section =>
              section.id === action.payload.id ? { ...section, ...action.payload.updates } : section
            ),
          },
        },
      };
    
    case REMOVE_SECTION:
      return {
        ...state,
        pages: {
          ...state.pages,
          [state.currentPage]: {
            ...state.pages[state.currentPage],
            sections: state.pages[state.currentPage].sections.filter(
              section => section.id !== action.payload
            ),
          },
        },
      };
    
    case REORDER_SECTIONS:
      return {
        ...state,
        pages: {
          ...state.pages,
          [state.currentPage]: {
            ...state.pages[state.currentPage],
            sections: action.payload,
          },
        },
      };
    
    case SET_EDIT_MODE:
      return {
        ...state,
        editMode: action.payload,
      };
    
    case SET_ACTIVE_COMPONENT:
      return {
        ...state,
        activeComponent: action.payload,
      };
    
    case UPDATE_COMPONENT:
      return {
        ...state,
        pages: {
          ...state.pages,
          [state.currentPage]: {
            ...state.pages[state.currentPage],
            sections: state.pages[state.currentPage].sections.map(section => {
              if (section.id === action.payload.sectionId) {
                return {
                  ...section,
                  components: section.components.map(component =>
                    component.id === action.payload.componentId
                      ? { ...component, ...action.payload.updates }
                      : component
                  ),
                };
              }
              return section;
            }),
          },
        },
      };
    
    default:
      return state;
  }
}

// Context
const BuilderContext = createContext();

// Provider Component
export function BuilderProvider({ children }) {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  // Action Creators
  const addSection = useCallback((section) => {
    dispatch({ type: ADD_SECTION, payload: section });
  }, []);

  const updateSection = useCallback((sectionId, updates) => {
    dispatch({
      type: UPDATE_SECTION,
      payload: { id: sectionId, updates },
    });
  }, []);

  const removeSection = useCallback((sectionId) => {
    dispatch({ type: REMOVE_SECTION, payload: sectionId });
  }, []);

  const reorderSections = useCallback((sections) => {
    dispatch({ type: REORDER_SECTIONS, payload: sections });
  }, []);

  const setEditMode = useCallback((mode) => {
    dispatch({ type: SET_EDIT_MODE, payload: mode });
  }, []);

  const setActiveComponent = useCallback((component) => {
    dispatch({ type: SET_ACTIVE_COMPONENT, payload: component });
  }, []);

  const updateComponent = useCallback((sectionId, componentId, updates) => {
    dispatch({
      type: UPDATE_COMPONENT,
      payload: { sectionId, componentId, updates },
    });
  }, []);

  const value = {
    ...state,
    addSection,
    updateSection,
    removeSection,
    reorderSections,
    setEditMode,
    setActiveComponent,
    updateComponent,
  };

  return <BuilderContext.Provider value={value}>{children}</BuilderContext.Provider>;
}

// Custom Hook
export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};

export default BuilderContext;
