import "./App.css";
import { useState } from "react";
import ProductList from "./features/productlist/ProductList";
import CartModal from "./features/cart/CartModal";
import FilterModal from "./features/filter/FilterModal";
import Header from "./components/Header";

function App() {
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);
  const [isOpenModalFilter, setIsOpenModalFilter] = useState(false);

  const handleModalCart = (value) => {
    setIsOpenModalCart(value);
  };
  const handleModalFilter = (value) => {
    setIsOpenModalFilter(value);
  };

  return (
    <>
      {isOpenModalCart && (
        <CartModal handleHideModalCart={() => handleModalCart(false)} />
      )}
      {isOpenModalFilter && (
        <FilterModal handleHideModalFilter={() => handleModalFilter(false)} />
      )}
      <Header
        handleOpenModalCart={() => handleModalCart(true)}
        handleOpenModalFilter={() => handleModalFilter(true)}
      />
      <main className="max-w-7xl mx-auto px-4">
        <ProductList />
      </main>
    </>
  );
}

export default App;
