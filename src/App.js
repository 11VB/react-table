import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Navigate } from "react-router";
import Main from "./pages/main/main";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="" element={<Navigate to="/main" />} />
          <Route path="/main" element={<Main />} />
        </Routes>
    </Router>
  );
}

export default App;
