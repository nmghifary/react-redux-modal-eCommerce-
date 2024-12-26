import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../cart/cartSlice";
import { FaBookmark, FaRegBookmark, FaStar } from "react-icons/fa6";
import Skeleton from "../../components/Skeleton";
import {
  selectFilteredProducts,
  storeBookmark,
  storeProduct,
} from "./productSlice";

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
  const handleClickBookmark = (product) => {
    dispatch(storeBookmark(product));
  };

  return (
    <>
      <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 py-2 pb-4">
        {isLoading ? (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </>
        ) : (
          <>
            {products?.map((product) => {
              return (
                <div
                  key={product.id}
                  className="group bg-transparent w-full text-gray-700"
                >
                  <div className="relative w-full h-fit mx-auto overflow-hidden bg-white rounded-xl">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[200px] object-contain scale-90 group-hover:scale-100 duration-500"
                    />
                    <button
                      type="button"
                      className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm py-3 px-8"
                      onClick={() => handleClickBuy(product)}
                    >
                      BUY NOW
                    </button>
                    {product.bookmark ? (
                      <button
                        type="button"
                        className="absolute -top-1 right-2 cursor-pointer text-3xl text-amber-300 hover:scale-110"
                        onClick={() => handleClickBookmark(product)}
                      >
                        <FaBookmark className="" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="absolute -top-1 right-2 cursor-pointer text-3xl text-amber-300 hover:scale-110"
                        onClick={() => handleClickBookmark(product)}
                      >
                        <FaRegBookmark className="" />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 mt-1">
                    <div>
                      <h3 className="font-semibold line-clamp-2 min-h-12">
                        {product.title}
                      </h3>
                      <h3 className="text-blue-700 font-bold text-2xl ">
                        <span className="text-base">$</span>
                        {product.price}
                      </h3>
                    </div>
                    <div className="flex items-center divide-x-2 divide-slate-400 font-medium">
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
          </>
        )}
      </div>
    </>
  );
};

export default ProductList;
