import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ClerkProvider } from "@clerk/clerk-react";
// import { BrowserRouter } from "react-router-dom";

 const clerkPubKey = "pk_test_Y2xhc3NpYy1tdXNrb3gtMjguY2xlcmsuYWNjb3VudHMuZGV2JA";

createRoot(document.getElementById('root')).render(
      
  <ClerkProvider publishableKey={clerkPubKey}>
      <App />
  </ClerkProvider>
)
