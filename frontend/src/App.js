import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAnime from "./pages/AddAnime";
import AddPergunta from "./pages/AddPergunta";
import ListarAnime from "./pages/ListarAnime";
import ListarPergunta from "./pages/ListarPergunta";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<ListarAnime />} />
            <Route path="/:id" element={<ListarPergunta />} />
            <Route path="/AddAnime" element={<AddAnime />} />
            <Route path="/pergunta'" element={<AddPergunta />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
