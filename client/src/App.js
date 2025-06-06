import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/login";
import OrgLogin from './Pages/orglogin'; // adjust path as needed

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/organiser-signin" element={<OrgLogin />} />
                <Route path="/home" element={<h1>Home Placeholder</h1>} />
                <Route path="/signup" element={<h1>Sign Up Placeholder</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
