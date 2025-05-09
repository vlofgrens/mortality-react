import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ScenarioProvider } from './context/ScenarioContext.tsx';

createRoot(document.getElementById("root")!).render(
  <ScenarioProvider>
    <App />
  </ScenarioProvider>
);