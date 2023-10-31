import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeMenu from "./Pages/HomeMenu";
import ProductDetail from "./Pages/productDetail";
import CheckoutForm from "./Pages/checkoutForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeMenu />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/checkout-form" element={<CheckoutForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
