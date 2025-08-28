import { createRoot } from 'react-dom/client';
import ExtensionPopup from './components/Extension/ExtensionPopup';
import './index.css';

const PopupApp = () => {
  return <ExtensionPopup isCompact={true} />;
};

createRoot(document.getElementById("root")!).render(<PopupApp />);