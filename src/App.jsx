import React, { useState } from 'react';
import { CircuitProvider } from './context/CircuitContext';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { CircuitCanvas } from './components/CircuitCanvas';
import { PropertiesPanel } from './components/PropertiesPanel';
import { AnalysisPanel } from './components/AnalysisPanel';

function App() {
  const [toolbarWidth, setToolbarWidth] = useState(230);
  const [propertiesWidth, setPropertiesWidth] = useState(240);
  const [analysisHeight, setAnalysisHeight] = useState(180);

  const [isResizingToolbar, setIsResizingToolbar] = useState(false);
  const [isResizingProperties, setIsResizingProperties] = useState(false);
  const [isResizingAnalysis, setIsResizingAnalysis] = useState(false);

  const startResizingToolbar = (e) => {
    e.preventDefault();
    setIsResizingToolbar(true);
    document.body.classList.add('resizing');

    const handleMouseMove = (moveEvent) => {
      const newWidth = Math.max(180, Math.min(450, moveEvent.clientX));
      setToolbarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizingToolbar(false);
      document.body.classList.remove('resizing');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const startResizingProperties = (e) => {
    e.preventDefault();
    setIsResizingProperties(true);
    document.body.classList.add('resizing');

    const handleMouseMove = (moveEvent) => {
      const newWidth = Math.max(180, Math.min(450, window.innerWidth - moveEvent.clientX));
      setPropertiesWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizingProperties(false);
      document.body.classList.remove('resizing');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const startResizingAnalysis = (e) => {
    e.preventDefault();
    setIsResizingAnalysis(true);
    document.body.classList.add('resizing');

    const handleMouseMove = (moveEvent) => {
      const newHeight = Math.max(60, Math.min(600, window.innerHeight - moveEvent.clientY));
      setAnalysisHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsResizingAnalysis(false);
      document.body.classList.remove('resizing');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <CircuitProvider>
      <div 
        className="app-container"
        style={{
          '--toolbar-width': `${toolbarWidth}px`,
          '--properties-width': `${propertiesWidth}px`,
          '--analysis-height': `${analysisHeight}px`,
        }}
      >
        {/* Top App Bar */}
        <Header />
        
        {/* Left Toolbar (Components Sidebar) */}
        <Toolbar />

        {/* Left Resizer */}
        <div
          className={`resizer-col ${isResizingToolbar ? 'resizing' : ''}`}
          style={{ gridArea: 'resizer-l' }}
          onMouseDown={startResizingToolbar}
        />
        
        {/* Center SVG Design Area */}
        <CircuitCanvas />

        {/* Bottom Resizer */}
        <div
          className={`resizer-row ${isResizingAnalysis ? 'resizing' : ''}`}
          style={{ gridArea: 'resizer-b' }}
          onMouseDown={startResizingAnalysis}
        />
        
        {/* Bottom Real-time Analysis Panel */}
        <AnalysisPanel />

        {/* Right Resizer */}
        <div
          className={`resizer-col ${isResizingProperties ? 'resizing' : ''}`}
          style={{ gridArea: 'resizer-r' }}
          onMouseDown={startResizingProperties}
        />
        
        {/* Right Properties Panel */}
        <PropertiesPanel />
      </div>
    </CircuitProvider>
  );
}

export default App;

