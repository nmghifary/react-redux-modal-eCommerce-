/* eslint-disable react/prop-types */
import CartIcon from "../assets/cart.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectCartTotalItems } from "../features/cart/cartSlice";
import { useState } from "react";
import { CiSliderHorizontal } from "react-icons/ci";
import { FaSearch, FaStore } from "react-icons/fa";
import { searchProduct } from "../features/productlist/productSlice";

const Header = ({ handleOpenModalCart, handleOpenModalFilter }) => {
  const dispatch = useDispatch();
  const cartTotalItems = useSelector(selectCartTotalItems);
  const [keyword, setKeyword] = useState("");

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
        className="relative rounded-full bg-blue-800 p-2 text-gray-100"
        onClick={handleOpenModalFilter}
      >
        <CiSliderHorizontal className="w-6 h-6" />
      </button>
    );
  };
  const searchInput = ({ handleSubmitSearch, keyword, setKeyword }) => {
    return (
      <form
        onSubmit={handleSubmitSearch}
        className="relative flex items-center w-full"
      >
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search..."
          className="w-full rounded-md  py-2 px-3 text-gray-700 peer focus:ring-2 focus:ring-blue-200 focus:outline-none"
        ></input>
        <button
          type="submit"
          className="absolute top-[50%] translate-y-[-50%] right-0 px-2 cursor-pointer text-3xl text-blue-700 peer-focus:text-blue-500 border-l-2 border-slate-300"
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
            {searchInput({ handleSubmitSearch, keyword, setKeyword })}
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
