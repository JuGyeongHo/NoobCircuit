import React, { useContext, useState, useRef } from 'react';
import { CircuitContext, ACTIONS } from '../context/CircuitContext';
import { renderComponentSymbol } from './symbols/ComponentSymbols';
import { COMPONENT_TYPES } from '../data/defaultComponents';
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

// Helper to calculate rotated terminal coordinates
const getTerminalGlobalPos = (comp, terminalX, terminalY) => {
  const rad = (comp.rotation || 0) * (Math.PI / 180);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const rotatedX = terminalX * cos - terminalY * sin;
  const rotatedY = terminalX * sin + terminalY * cos;

  return {
    x: Math.round(comp.x + rotatedX),
    y: Math.round(comp.y + rotatedY)
  };
};

// Formats display values to use metric prefixes (e.g. k) and keep digits <= 3
const formatDisplayValue = (val, unit) => {
  if (val === undefined || val === null || val === '') return '';
  let num = Number(val);
  if (isNaN(num)) return `${val}${unit || ''}`;

  if (num >= 1000) {
    let scaled = num / 1000;
    let formatted;
    if (scaled >= 100) {
      formatted = Math.round(scaled).toString();
    } else if (scaled >= 10) {
      formatted = scaled % 1 === 0 ? scaled.toFixed(0) : scaled.toFixed(1);
      if (formatted.replace('.', '').length > 3) {
        formatted = Math.round(scaled).toString();
      }
    } else {
      formatted = scaled % 1 === 0 ? scaled.toFixed(0) : scaled.toFixed(1);
      if (formatted.replace('.', '').length > 3) {
        formatted = scaled.toFixed(1);
      }
    }

    let newUnit = unit || '';
    if (newUnit && !newUnit.startsWith('k') && !newUnit.startsWith('M') && !newUnit.startsWith('μ') && !newUnit.startsWith('m') && !newUnit.startsWith('n') && !newUnit.startsWith('p')) {
      newUnit = 'k' + newUnit;
    } else if (!newUnit) {
      newUnit = 'k';
    }
    return `${formatted}${newUnit}`;
  } else {
    let formatted;
    if (num >= 100) {
      formatted = Math.round(num).toString();
    } else if (num >= 10) {
      formatted = num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);
      if (formatted.replace('.', '').length > 3) {
        formatted = Math.round(num).toString();
      }
    } else {
      formatted = num % 1 === 0 ? num.toFixed(0) : Number(num.toFixed(2)).toString();
    }
    return `${formatted}${unit || ''}`;
  }
};

export const CircuitCanvas = () => {
  const { state, dispatch } = useContext(CircuitContext);
  const svgRef = useRef(null);
  const gRef = useRef(null);

  const [dragState, setDragState] = useState({ isDragging: false, compId: null, startX: 0, startY: 0, initCompX: 0, initCompY: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Panning State
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);

  const getCanvasCoordinates = (e) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const pt = svgRef.current.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const target = gRef.current || svgRef.current;
    const cursorPt = pt.matrixTransform(target.getScreenCTM().inverse());
    return { x: cursorPt.x, y: cursorPt.y };
  };

  const handleSVGMouseMove = (e) => {
    if (isPanning) {
      const newPanX = e.clientX - panStart.x;
      const newPanY = e.clientY - panStart.y;
      if (Math.abs(newPanX - pan.x) > 2 || Math.abs(newPanY - pan.y) > 2) {
        setHasDragged(true);
      }
      setPan({ x: newPanX, y: newPanY });
      return;
    }

    const coords = getCanvasCoordinates(e);
    setMousePos(coords);

    if (dragState.isDragging && dragState.compId) {
      const dx = coords.x - dragState.startX;
      const dy = coords.y - dragState.startY;

      // Snap to 16px grid as defined in DESIGN.md
      const newX = Math.round((dragState.initCompX + dx) / 16) * 16;
      const newY = Math.round((dragState.initCompY + dy) / 16) * 16;

      dispatch({
        type: ACTIONS.UPDATE_COMPONENT,
        payload: { id: dragState.compId, updates: { x: newX, y: newY } }
      });
    }
  };

  const handleSVGMouseUp = () => {
    setIsPanning(false);
    setDragState({ isDragging: false, compId: null, startX: 0, startY: 0, initCompX: 0, initCompY: 0 });
  };

  const handleComponentMouseDown = (e, comp) => {
    e.stopPropagation(); // prevent svg background click
    if (state.wiringStartTerminal) return; // If wiring, let terminal click handle it

    dispatch({ type: ACTIONS.SELECT_COMPONENT, payload: comp.id });

    const coords = getCanvasCoordinates(e);
    setDragState({
      isDragging: true,
      compId: comp.id,
      startX: coords.x,
      startY: coords.y,
      initCompX: comp.x,
      initCompY: comp.y
    });
  };

  const handleTerminalClick = (e, compId, terminalId) => {
    e.stopPropagation();

    if (state.wiringStartTerminal) {
      // Complete wire
      if (state.wiringStartTerminal.componentId === compId && state.wiringStartTerminal.terminalId === terminalId) {
        // Clicked same terminal, cancel wiring
        dispatch({ type: ACTIONS.START_WIRING, payload: null });
      } else {
        dispatch({ type: ACTIONS.ADD_WIRE, payload: { componentId: compId, terminalId } });
      }
    } else {
      // Start wire
      dispatch({ type: ACTIONS.START_WIRING, payload: { componentId: compId, terminalId } });
    }
  };

  const handleSVGCancelWiring = () => {
    if (state.wiringStartTerminal) {
      dispatch({ type: ACTIONS.START_WIRING, payload: null });
    }
  };

  // Render Grid
  const renderGrid = () => {
    return (
      <pattern
        id="grid"
        width="16"
        height="16"
        patternUnits="userSpaceOnUse"
        patternTransform={`translate(${pan.x}, ${pan.y})`}
      >
        <circle cx="8" cy="8" r="1" fill="#cbd5e1" />
      </pattern>
    );
  };

  // Build a map of wire endpoints to render connection dots (junction nodes)
  const getConnectionNodes = () => {
    const coordsMap = {};

    state.wires.forEach(wire => {
      const fromComp = state.components.find(c => c.id === wire.from.componentId);
      const toComp = state.components.find(c => c.id === wire.to.componentId);
      if (!fromComp || !toComp) return;

      const fromTerm = fromComp.terminals.find(t => t.id === wire.from.terminalId);
      const toTerm = toComp.terminals.find(t => t.id === wire.to.terminalId);
      if (!fromTerm || !toTerm) return;

      const p1 = getTerminalGlobalPos(fromComp, fromTerm.x, fromTerm.y);
      const p2 = getTerminalGlobalPos(toComp, toTerm.x, toTerm.y);

      const key1 = `${p1.x},${p1.y}`;
      const key2 = `${p2.x},${p2.y}`;

      coordsMap[key1] = (coordsMap[key1] || 0) + 1;
      coordsMap[key2] = (coordsMap[key2] || 0) + 1;
    });

    const nodes = [];
    Object.keys(coordsMap).forEach(key => {
      if (coordsMap[key] >= 3) {
        const [x, y] = key.split(',').map(Number);
        nodes.push({ x, y });
      }
    });

    return nodes;
  };

  // Render Wires
  const renderWires = () => {
    return state.wires.map(wire => {
      const fromComp = state.components.find(c => c.id === wire.from.componentId);
      const toComp = state.components.find(c => c.id === wire.to.componentId);
      if (!fromComp || !toComp) return null;

      const fromTerm = fromComp.terminals.find(t => t.id === wire.from.terminalId);
      const toTerm = toComp.terminals.find(t => t.id === wire.to.terminalId);
      if (!fromTerm || !toTerm) return null;

      const p1 = getTerminalGlobalPos(fromComp, fromTerm.x, fromTerm.y);
      const p2 = getTerminalGlobalPos(toComp, toTerm.x, toTerm.y);

      // Orthogonal Routing: L-bend wire logic for a neat academic diagram look
      const midX = p1.x;
      const midY = p2.y;

      return (
        <path
          key={wire.id}
          d={`M ${p1.x} ${p1.y} L ${midX} ${midY} L ${p2.x} ${p2.y}`}
          className="wire"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("배선을 삭제하시겠습니까?")) {
              dispatch({ type: ACTIONS.REMOVE_WIRE, payload: wire.id });
            }
          }}
          title="클릭하여 배선 삭제"
        />
      );
    });
  };

  // Active wire drawing preview (Orthogonal)
  const renderDrawingWire = () => {
    if (!state.wiringStartTerminal) return null;

    const startComp = state.components.find(c => c.id === state.wiringStartTerminal.componentId);
    if (!startComp) return null;

    const startTerm = startComp.terminals.find(t => t.id === state.wiringStartTerminal.terminalId);
    if (!startTerm) return null;

    const p1 = getTerminalGlobalPos(startComp, startTerm.x, startTerm.y);
    const midX = p1.x;
    const midY = mousePos.y;

    return (
      <path
        d={`M ${p1.x} ${p1.y} L ${midX} ${midY} L ${mousePos.x} ${mousePos.y}`}
        className="wire wire-drawing"
      />
    );
  };

  // Render Components
  const renderComponents = () => {
    return state.components.map(comp => {
      const isSelected = state.selectedComponentId === comp.id;

      return (
        <g
          key={comp.id}
          transform={`translate(${comp.x}, ${comp.y}) rotate(${comp.rotation || 0})`}
          className={`component-group ${isSelected ? 'selected' : ''}`}
          onMouseDown={(e) => handleComponentMouseDown(e, comp)}
        >
          {/* Component Bounding Highlight Box if selected */}
          {isSelected && (
            <rect
              x="-40"
              y="-30"
              width="80"
              height="60"
              fill="rgba(0, 82, 255, 0.05)"
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              strokeDasharray="4,4"
              rx="8"
            />
          )}

          {/* Invisible hit area covering the whole component */}
          <rect x="-40" y="-30" width="80" height="60" fill="transparent" pointerEvents="all" />

          {/* Component Symbol */}
          {renderComponentSymbol(comp.type)}

          {/* Terminals */}
          {comp.terminals.map(t => {
            const isWiringStart = state.wiringStartTerminal?.componentId === comp.id && state.wiringStartTerminal?.terminalId === t.id;
            return (
              <circle
                key={t.id}
                cx={t.x}
                cy={t.y}
                r="3.5"
                className={`terminal ${isWiringStart ? 'terminal-active' : ''}`}
                onMouseDown={(e) => e.stopPropagation()} // Prevent dragging component
                onClick={(e) => handleTerminalClick(e, comp.id, t.id)}
              />
            );
          })}

          {comp.type === COMPONENT_TYPES.GROUND ? (
            <text
              x="0"
              y="30"
              className="component-label"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${-(comp.rotation || 0)})`}
            >
              <tspan x="0" dy="-0.4em">{comp.label}</tspan>
              {comp.value !== undefined ? (
                <tspan x="0" dy="1.2em">{formatDisplayValue(comp.value, comp.unit)}</tspan>
              ) : null}
            </text>
          ) : (comp.type === COMPONENT_TYPES.VOLTAGE_SOURCE || comp.type === COMPONENT_TYPES.CURRENT_SOURCE) ? (
            <text
              x="0"
              y="0"
              className="component-label"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`translate(0, 30) rotate(${-(comp.rotation || 90)})`}
            >
              <tspan x="0" dy="-0.4em">{comp.label}</tspan>
              <tspan x="0" dy="1.2em">{comp.value !== undefined ? formatDisplayValue(comp.value, comp.unit) : ''}</tspan>
            </text>
          ) : (
            <text
              x="0"
              y="-22"
              className="component-label"
              textAnchor="middle"
              transform={`rotate(${-(comp.rotation || 0)})`}
            >
              {comp.label} {comp.value !== undefined ? `(${formatDisplayValue(comp.value, comp.unit)})` : ''}
            </text>
          )}

        </g>
      );
    });
  };

  return (
    <div className="canvas-area">
      <svg
        id="circuit-svg-canvas"
        ref={svgRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
        className={`circuit-canvas ${isPanning ? 'panning' : ''} ${state.wiringStartTerminal ? 'wiring' : ''}`}
        onMouseMove={handleSVGMouseMove}
        onMouseUp={handleSVGMouseUp}
        onClick={handleSVGCancelWiring}
        onMouseLeave={handleSVGMouseUp}
      >
        <defs>
          {renderGrid()}
        </defs>

        {/* Clickable Background Canvas Grid */}
        <rect
          width="100%"
          height="100%"
          fill="url(#grid)"
          onMouseDown={(e) => {
            if (e.button !== 0) return;
            setIsPanning(true);
            setHasDragged(false);
            setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
          }}
          onClick={(e) => {
            if (hasDragged) {
              e.stopPropagation();
              return;
            }
            dispatch({ type: ACTIONS.SELECT_COMPONENT, payload: null });
          }}
        />

        <g ref={gRef} transform={`translate(${pan.x}, ${pan.y})`}>
          {/* Render Wires */}
          {renderWires()}
          {renderDrawingWire()}

          {/* Connection/Junction Node Dots (Academic style) */}
          {getConnectionNodes().map((node, i) => (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r="4.5"
              className="connection-node"
            />
          ))}

          {/* Render Components */}
          {renderComponents()}
        </g>
      </svg>
    </div>
  );
};
export default CircuitCanvas;
const forceVisibleProps = {
  stroke: '#111827',
  strokeWidth: 2.5,
  fill: 'none',
  vectorEffect: 'non-scaling-stroke',
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};