/* eslint-disable react/prop-types */
import CartIcon from "../assets/cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectCartTotalItems } from "../features/cart/cartSlice";
import { useEffect, useState } from "react";
import { FaBars, FaSearch, FaStore } from "react-icons/fa";
import {
  searchProduct,
  selectCategories,
} from "../features/productlist/productSlice";

const Header = ({ handleOpenModalCart, handleOpenSidebarFilter }) => {
  const dispatch = useDispatch();
  const cartTotalItems = useSelector(selectCartTotalItems);
  const categories = useSelector(selectCategories);
  const [keyword, setKeyword] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSlidingIn, setIsSlidingIn] = useState(false);
  const [isSlidingOut, setIsSlidingOut] = useState(false);

  useEffect(() => {
    const datasLenght = categories?.length || 4;
    const interval = setInterval(() => {
      setIsSlidingOut(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % datasLenght);
        setIsSlidingOut(false);
        setIsSlidingIn(true);
        setTimeout(() => {
          setIsSlidingIn(false);
        }, 300);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, [categories.length]);

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    dispatch(searchProduct(keyword));
  };

  const cartButton = () => {
    return (
      <button
        type="button"
        className="relative rounded-full bg-blue-800 p-2 text-gray-100"
        onClick={handleOpenModalCart}
      >
        {cartTotalItems ? (
          <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-white text-sm flex items-center justify-center">
            {cartTotalItems}
          </span>
        ) : null}
        <img src={CartIcon} alt="cart" className="w-6 h-6" />
      </button>
    );
  };
  const filterButton = () => {
    return (
      <button
        type="button"
        className="relative rounded-full bg-blue-800 p-2 text-gray-100 text-sm font-thin"
        onClick={handleOpenSidebarFilter}
      >
        <FaBars className="w-4 h-6" />
      </button>
    );
  };
  const searchInput = () => {
    return (
      <form
        onSubmit={handleSubmitSearch}
        className="relative flex items-center w-full bg-white rounded-md"
      >
        <input
          type="text"
          value={keyword}
          placeholder=""
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full rounded-md py-2 px-3 bg-transparent z-10 peer focus:ring-2 focus:ring-blue-200 focus:outline-none"
        />
        <span
          type="submit"
          className={`absolute top-[50%] left-2 px-2 text-gray-400 block peer-focus:hidden transition-all duration-300
            ${
              isSlidingIn
                ? "translate-y-[-100%] opacity-0"
                : isSlidingOut
                ? "translate-y-[0%] opacity-0"
                : "translate-y-[-50%] opacity-100"
            }
              `}
        >
          {categories[currentIndex]}
        </span>
        <button
          type="submit"
          className="absolute top-[50%] translate-y-[-50%] right-0 px-2 cursor-pointer text-3xl text-blue-700 z-20 peer-focus:text-blue-500 border-l-2 border-slate-300"
        >
          <FaSearch />
        </button>
      </form>
    );
  };

  return (
    <header className="sticky top-0 z-20 bg-blue-700">
      <div className="max-w-7xl mx-auto px-4 pb-0">
        <div className="flex items-center gap-4 sm:justify-between h-20">
          <div className="flex items-center gap-4 font-bold text-gray-100">
            <FaStore className="text-3xl" />
            <h3 className="hidden sm:block text-3xl line-clamp-1">
              Redux E-Commerce
            </h3>
          </div>
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            {searchInput()}
            {cartButton()}
            {filterButton()}
          </div>
        </div>
      </div>
    </header>
  );
};

// const styles = {
//   header: "",
//   position: "",
//   layout: "",
// };

export default Header;
