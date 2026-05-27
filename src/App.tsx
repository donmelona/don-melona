import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { BuilderPage } from './pages/BuilderPage';
import { Layout } from './components/Layout';
import { MenuPage } from './pages/MenuPage';

export function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/builder" element={<BuilderPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}