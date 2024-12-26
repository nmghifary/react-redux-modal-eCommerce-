import "./App.css";
import { useState } from "react";
import ProductList from "./features/productlist/ProductList";
import CartModal from "./features/cart/CartModal";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

function App() {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);
  const [isOpenModalFilter, setIsOpenModalFilter] = useState(false);
  const [isTransitionModalCart, setIsTransitionModalCart] = useState(false);
  const [isTransitionModalFilter, setIsTransitionModalFilter] = useState(false);

  const handleOpenModalCart = () => {
    setIsOpenModalCart(true);
    setTimeout(() => {
      setIsTransitionModalCart(true);
    }, 10);
  };
  const handleCloseModalCart = () => {
    setIsTransitionModalCart(false);
    setTimeout(() => {
      setIsOpenModalCart(false);
    }, 300);
  };
  const handleOpenModalFilter = () => {
    setIsOpenModalFilter(true);
    setTimeout(() => {
      setIsTransitionModalFilter(true);
    }, 10);
  };
  const handleCloseModalFilter = () => {
    setIsTransitionModalFilter(false);
    setTimeout(() => {
      setIsOpenModalFilter(false);
    }, 500);
  };

  return (
    <div
      className={`flex flex-col min-h-screen transition-transform transform duration-500 *:transition-all
      ${isTransitionModalFilter ? "-translate-x-80" : "translate-x-0"}`}
    >
      {isOpenModalCart && (
        <CartModal
          handleHideModalCart={() => handleCloseModalCart()}
          isOpen={isTransitionModalCart}
        />
      )}
      {isOpenModalFilter && (
        <Sidebar
          handleHideModalFilter={() => handleCloseModalFilter()}
          isOpen={isTransitionModalFilter}
        />
      )}
      <Header
        handleOpenModalCart={() => handleOpenModalCart()}
        handleOpenSidebarFilter={() => handleOpenModalFilter()}
      />
      <main className="flex flex-row flex-grow max-w-7xl mx-auto px-4">
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
