import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './Pages/productDetail';
import CheckoutForm from './Pages/checkoutForm';
import OrderDetails from './Pages/orderDetails';
import HomeMenu from './Pages/homeMenu';
import NotFoundPage from './Pages/notFoundPage';
import Invoices from './Pages/invoices';

import PanelLogin from './Pages/Panel/login';
import PanelDashboard from './Pages/Panel/dashboard';
import PanelMenu from './Pages/Panel/menu';
import PanelOrders from './Pages/Panel/orders';
import PanelCategoryMenu from './Pages/Panel/categoryMenu';
import PanelUsers from './Pages/Panel/users';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomeMenu />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/checkout-form" element={<CheckoutForm />} />
          <Route path="/order-detail" element={<OrderDetails />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/*" element={<NotFoundPage />} />

          <Route path="/panel/login" element={<PanelLogin />} />
          <Route path="/panel/dashboard" element={<PanelDashboard />} />
          <Route path="/panel/orders" element={<PanelOrders />} />
          <Route path="/panel/menu" element={<PanelMenu />} />
          <Route path="/panel/kategori_menu" element={<PanelCategoryMenu />} />
          <Route path="/panel/users" element={<PanelUsers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
