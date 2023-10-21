import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeMenu from "./Pages/HomeMenu";
import ProductDetail from "./Pages/productDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeMenu />} />
          <Route path="/product-detail" element={<ProductDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
