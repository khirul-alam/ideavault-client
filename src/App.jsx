import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Ideas from "./pages/Ideas";
import IdeaDetails from "./pages/IdeaDetails";
import AddIdea from "./pages/AddIdea";
import MyIdeas from "./pages/MyIdeas";
import MyInteractions from "./pages/MyInteractions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>
} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/ideas/:id" element={
            <PrivateRoute><IdeaDetails /></PrivateRoute>
          } />
          <Route path="/add-idea" element={
            <PrivateRoute><AddIdea /></PrivateRoute>
          } />
          <Route path="/my-ideas" element={
            <PrivateRoute><MyIdeas /></PrivateRoute>
          } />
          <Route path="/my-interactions" element={
            <PrivateRoute><MyInteractions /></PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;