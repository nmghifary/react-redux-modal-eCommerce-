/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getApiResponse } from "../libs/api-libs";
import { useDispatch } from "react-redux";
import { handleCategory } from "../features/filter/categorySlice";

const ScrollSnap = () => {
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const datas = await getApiResponse("products/categories");
        setCategories(datas);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const [activeButtons, setActiveButtons] = useState(
    categories.reduce((acc, item) => {
      acc[item] = false;
      return acc;
    }, {})
  );
  const handleOnClick = (item) => {
    setActiveButtons((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
    dispatch(handleCategory(item));
  };

  return (
    <div className="w-full h-full flex gap-2 py-2 overflow-x-auto snap-x snap-mandatory no-scrollbar">
      {categories?.map((item) => (
        <button
          key={item}
          onClick={() => handleOnClick(item)}
          className={`inline-flex min-w-fit p-2 rounded-md text-sm font-medium ${
            activeButtons[item]
              ? "bg-blue-700 text-white hover:bg-blue-800"
              : "bg-white text-gray-700 hover:bg-slate-100"
          } shadow transition duration-300 snap-start`}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ScrollSnap;
