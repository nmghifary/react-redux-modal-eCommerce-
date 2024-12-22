/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../cart/cartSlice";
import { FaBookmark, FaStar } from "react-icons/fa6";
import { selectFilteredProducts, storeProduct } from "./productSlice";

const ProductList = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const datas = await response.json();
        dispatch(storeProduct(datas));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [dispatch]);

  const handleClickBuy = (product) => {
    dispatch(addItemToCart(product));
  };

  return (
    <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 py-2">
      {products?.map((product) => {
        return (
          <div key={product.id} className="group bg-transparent w-full">
            <div className="relative w-full h-fit mx-auto overflow-hidden bg-white rounded-xl">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-[200px] object-contain scale-90 group-hover:scale-100 transition-all duration-500 ease-in-out"
              />
              <button
                type="button"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm py-3 px-8"
                onClick={() => handleClickBuy(product)}
              >
                BUY NOW
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-1">
              <div>
                <h3 className="text-gray-700 font-semibold line-clamp-2 min-h-12">
                  {product.title}
                </h3>
                <h3 className="text-blue-700 font-bold text-2xl ">
                  <span className="text-base">$</span>
                  {product.price}
                </h3>
              </div>
              <div className="flex items-center divide-x-2 divide-slate-400">
                <h3 className="flex items-center gap-1 px-2 mr-2 rounded bg-amber-100 border-2 border-amber-300">
                  <FaStar className="text-amber-500" />
                  {product.rating.rate}
                </h3>
                <h3 className="pl-2">{product.rating.count} reviews</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList;
