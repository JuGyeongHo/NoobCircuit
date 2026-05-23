import React, { createContext, useReducer, useEffect } from 'react';

// Helpers
const generateId = () => crypto.randomUUID();

// Initial State
const initialState = {
  title: 'My Circuit',
  components: [],
  wires: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  selectedComponentId: null,
  wiringStartTerminal: null, // { componentId, terminalId }
};

// Action Types
export const ACTIONS = {
  SET_CIRCUIT: 'SET_CIRCUIT',
  ADD_COMPONENT: 'ADD_COMPONENT',
  UPDATE_COMPONENT: 'UPDATE_COMPONENT',
  REMOVE_COMPONENT: 'REMOVE_COMPONENT',
  SELECT_COMPONENT: 'SELECT_COMPONENT',
  START_WIRING: 'START_WIRING',
  ADD_WIRE: 'ADD_WIRE',
  REMOVE_WIRE: 'REMOVE_WIRE',
  CLEAR_CIRCUIT: 'CLEAR_CIRCUIT'
};

// Reducer
function circuitReducer(state, action) {
  let newState;
  switch (action.type) {
    case ACTIONS.SET_CIRCUIT:
      newState = { ...state, ...action.payload, selectedComponentId: null, wiringStartTerminal: null };
      break;
    
    case ACTIONS.ADD_COMPONENT:
      newState = {
        ...state,
        components: [...state.components, action.payload],
        updatedAt: new Date().toISOString()
      };
      break;

    case ACTIONS.UPDATE_COMPONENT:
      newState = {
        ...state,
        components: state.components.map(comp => 
          comp.id === action.payload.id ? { ...comp, ...action.payload.updates } : comp
        ),
        updatedAt: new Date().toISOString()
      };
      break;

    case ACTIONS.REMOVE_COMPONENT:
      newState = {
        ...state,
        components: state.components.filter(c => c.id !== action.payload),
        wires: state.wires.filter(w => 
          w.from.componentId !== action.payload && w.to.componentId !== action.payload
        ),
        selectedComponentId: state.selectedComponentId === action.payload ? null : state.selectedComponentId,
        updatedAt: new Date().toISOString()
      };
      break;

    case ACTIONS.SELECT_COMPONENT:
      newState = {
        ...state,
        selectedComponentId: action.payload
      };
      break;

    case ACTIONS.START_WIRING:
      newState = {
        ...state,
        wiringStartTerminal: action.payload // null to cancel
      };
      break;

    case ACTIONS.ADD_WIRE:
      const newWire = {
        id: generateId(),
        from: state.wiringStartTerminal,
        to: action.payload
      };
      // Check if wire already exists
      const exists = state.wires.find(w => 
        (w.from.componentId === newWire.from.componentId && w.from.terminalId === newWire.from.terminalId &&
         w.to.componentId === newWire.to.componentId && w.to.terminalId === newWire.to.terminalId) ||
        (w.to.componentId === newWire.from.componentId && w.to.terminalId === newWire.from.terminalId &&
         w.from.componentId === newWire.to.componentId && w.from.terminalId === newWire.to.terminalId)
      );
      
      if (exists) {
        newState = { ...state, wiringStartTerminal: null };
      } else {
        newState = {
          ...state,
          wires: [...state.wires, newWire],
          wiringStartTerminal: null,
          updatedAt: new Date().toISOString()
        };
      }
      break;

    case ACTIONS.REMOVE_WIRE:
      newState = {
        ...state,
        wires: state.wires.filter(w => w.id !== action.payload),
        updatedAt: new Date().toISOString()
      };
      break;

    case ACTIONS.CLEAR_CIRCUIT:
      newState = {
        ...initialState,
        id: generateId(),
        createdAt: new Date().toISOString()
      };
      break;

    default:
      return state;
  }

  return newState;
}

// Context
export const CircuitContext = createContext();

export const CircuitProvider = ({ children }) => {
  const [state, dispatch] = useReducer(circuitReducer, initialState, (initial) => {
    // Load from LocalStorage
    try {
      const localData = localStorage.getItem('noobcircuit_data');
      if (localData) {
        const parsed = JSON.parse(localData);
        return { ...initial, ...parsed, selectedComponentId: null, wiringStartTerminal: null };
      }
    } catch (e) {
      console.error("Failed to load circuit from local storage", e);
    }
    return initial;
  });

  // Save to LocalStorage on change
  useEffect(() => {
    const dataToSave = {
      title: state.title,
      components: state.components,
      wires: state.wires,
      createdAt: state.createdAt,
      updatedAt: state.updatedAt
    };
    localStorage.setItem('noobcircuit_data', JSON.stringify(dataToSave));
  }, [state.components, state.wires, state.title, state.updatedAt]);

  return (
    <CircuitContext.Provider value={{ state, dispatch }}>
      {children}
    </CircuitContext.Provider>
  );
};
