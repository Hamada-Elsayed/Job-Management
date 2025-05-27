import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/home/Home";
import AddJob from "./pages/addjob/Addjob";
import JobList from "./pages/joblist/Joblist";
import Favorites from "./pages/fav/Favorites";

function App() {
  return (
    <div style={{display:"flex"}}>
    <Sidebar />
    <Router>
      <div>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addjob" element={<AddJob/>}/>
            <Route path="/joblist" element={<JobList/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  );
}
export default App;

