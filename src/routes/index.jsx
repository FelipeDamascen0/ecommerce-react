
import { CartProvider } from "common/context/cart";
import { PaymentProvider } from "common/context/payment";
import { UserProvider } from "common/context/user";
import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";


export const AppRoutes = () => {
  return(
      <UserProvider>
        <CartProvider>
          <PaymentProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/feira" element={<Feira />} />
                <Route path="/carrinho" element={<Carrinho />} />
              </Routes>
            </BrowserRouter>
          </PaymentProvider>
        </CartProvider>
      </UserProvider>
  );
}