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
  const [isTranslate, setIsTranslate] = useState(false);

  const handleModalCart = (value) => {
    setIsOpenModalCart(value);
  };
  const handleOpenModalFilter = () => {
    setIsOpenModalFilter(true);
    setTimeout(() => {
      setIsTranslate(true);
    }, 10);
  };
  const handleCloseModalFilter = () => {
    setIsTranslate(false);
    setTimeout(() => {
      setIsOpenModalFilter(false);
    }, 500);
  };

  return (
    <div
      className={`flex flex-col min-h-screen transition-transform transform duration-500 *:transition-all
      ${isTranslate ? "-translate-x-80" : "translate-x-0"}`}
    >
      {isOpenModalCart && (
        <CartModal handleHideModalCart={() => handleModalCart(false)} />
      )}
      {isOpenModalFilter && (
        <Sidebar
          handleHideModalFilter={() => handleCloseModalFilter()}
          isOpen={isTranslate}
        />
      )}
      <Header
        handleOpenModalCart={() => handleModalCart(true)}
        handleOpenSidebarFilter={() => handleOpenModalFilter()}
      />
      <main className="flex-grow flex max-w-7xl mx-auto px-4">
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
