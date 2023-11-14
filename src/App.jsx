import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './Pages/productDetail';
import CheckoutForm from './Pages/checkoutForm';
import OrderDetails from './Pages/orderDetails';
import HomeMenu from './Pages/homeMenu';
import NotFoundPage from './Pages/notFoundPage';

import AdminLogin from './Pages/Admin/login';
import AdminDashboard from './Pages/Admin/dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeMenu />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/checkout-form" element={<CheckoutForm />} />
          <Route path="/order-detail" element={<OrderDetails />} />
          <Route path="/*" element={<NotFoundPage />} />


          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
