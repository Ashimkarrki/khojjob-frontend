import "./App.css";
import Navbar from "./components/Navbar";
import Bookmarks from "./pages/Bookmark";
import Company from "./pages/Company";
import AllCompany from "./pages/CompanyList";
import Job from "./pages/Job";
import Login from "./pages/Login";
import NewJob from "./pages/NewJob";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import JobsList from "./pages/JobsList";
function App() {
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/newjobs" element={<NewJob />} />
        <Route path="/alljobs" element={<JobsList />} />

        <Route path="/job/:jid" element={<Job />} />
        <Route path="/allcompany" element={<AllCompany />} />
        <Route path="/company/:cid" element={<Company />} />
        <Route path="/bookmark" element={<Bookmarks />} />
      </Routes>
    </>
  );
}

export default App;
