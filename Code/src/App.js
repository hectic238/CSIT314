import { Routes, Route } from "react-router-dom";
import TestPage from './Pages/test';
import UserEventBrowser from './Pages/userEventBrowser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserEventBrowser />} />
      <Route path="/TestPage" element={<TestPage />} />
      <Route path="/userEventBrowser" element={<UserEventBrowser />} />
 
      <Route path="/Manage-Account" element={<h1>Manage-Account Placeholder</h1>} />
      <Route path="/Event-Manager" element={<h1>Event Management Placeholder</h1>} />
      <Route path="/Register-Event" element={<h1>Event Register Placeholder</h1>} />
    </Routes>
  );
}

export default App;