/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/ModalFilter";
import {
  filterByBookmark,
  filterByCatagories,
  selectCategories,
  selectFilteredBookmark,
  selectFilteredCategories,
  selectSortedType,
  sortingProducts,
} from "../productlist/productSlice";
import { FaCheck } from "react-icons/fa";

const FilterModal = ({ handleHideModalFilter }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const filteredCategoris = useSelector(selectFilteredCategories);
  const sortedType = useSelector(selectSortedType);
  const filteredBookmark = useSelector(selectFilteredBookmark);
  const sortDatas = [
    { value: "ASC", label: "Sort A-Z" },
    { value: "DESC", label: "Sort Z-A" },
    { value: "HIGHEST", label: "Highest Price" },
    { value: "LOWEST", label: "Lowest Price" },
    { value: "TOPRATED", label: "Top Rated" },
    { value: "MOSTREVIEWED", label: "Most Reviewed" },
  ];

  const handleMultiSelectCategory = (category) => {
    dispatch(filterByCatagories(category));
  };
  const handleDropdownSort = (event) => {
    dispatch(sortingProducts(event.target.value));
  };
  const handleButtonBookmark = () => {
    dispatch(filterByBookmark());
  };

  const multiSelect = ({ categories, handleMultiSelectCategory }) => {
    return (
      <section className="w-full text-gray-700 pt-1 pb-2 space-y-1">
        <h3 className="text-lg font-medium">Categories</h3>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((category, i) => {
            const isActive = filteredCategoris.includes(category);

            return (
              <button
                key={i}
                onClick={() => handleMultiSelectCategory(category)}
                className={`relative w-full p-2 cursor-pointer rounded bg-blue-100 hover:bg-blue-200 shadow border border-gray-300 overflow-hidden group
                    ${isActive ? "ring-inset ring-2 ring-blue-700" : null}
                  `}
              >
                {isActive ? (
                  <div className="absolute top-0 left-0">
                    <div className="triangle absolute overflow-visible border-t-blue-700"></div>
                    <FaCheck className="absolute top-0.5 left-1 text-blue-100 group-hover:text-blue-200" />
                  </div>
                ) : null}
                {category}
              </button>
            );
          })}
        </div>
      </section>
    );
  };
  const dropdown = ({ sortDatas, handleDropdownSort, sortedType }) => {
    return (
      <section className="w-full text-gray-700 pt-1 pb-2 space-y-1">
        <label htmlFor="sort" className="text-lg font-medium">
          Sort
        </label>
        <select
          id="sort"
          value={sortedType}
          onChange={handleDropdownSort}
          className="w-full bg-blue-100 px-3 py-2 text-gray-700 rounded-md shadow focus:outline-none border border-gray-300 focus:ring-blue-500 focus:border-blue-500 *:bg-blue-100"
        >
          <option value="">-- Select an option --</option>
          {sortDatas.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </section>
    );
  };
  const selectBookmark = ({ handleButtonBookmark }) => {
    const isActive = filteredBookmark;

    return (
      <section className="w-full text-gray-700 pt-1 pb-2 space-y-1">
        <h3 className="text-lg font-medium">Bookmark</h3>
        <button
          onClick={() => handleButtonBookmark()}
          className={`relative w-full p-2 cursor-pointer rounded bg-blue-100 hover:bg-blue-200 shadow border border-gray-300 overflow-hidden group
                    ${isActive ? "ring-inset ring-2 ring-blue-700" : null}
                  `}
        >
          {isActive ? (
            <div className="absolute top-0 left-0">
              <div className="triangle absolute overflow-visible border-t-blue-700"></div>
              <FaCheck className="absolute top-0.5 left-1 text-blue-100 group-hover:text-blue-200" />
            </div>
          ) : null}
          Show Bookmark
        </button>
      </section>
    );
  };

  return (
    <Modal handleHideModal={handleHideModalFilter}>
      <h3 className="p-2 text-2xl font-bold text-white bg-blue-700">FILTER</h3>
      <div className="mx-2 pb-2 divide-y-4 divide-gray-300">
        {multiSelect({ categories, handleMultiSelectCategory })}
        {dropdown({ sortDatas, handleDropdownSort, sortedType })}
        {selectBookmark({ handleButtonBookmark })}
      </div>
    </Modal>
  );
};

export default FilterModal;
