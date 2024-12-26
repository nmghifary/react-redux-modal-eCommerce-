/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/ModalCart";
import {
  addItemToCart,
  checkoutCartItems,
  removeItemFromCart,
  selectCartItems,
  selectCheckoutTotalItems,
  selectCheckoutTotalPrices,
  selectSelectedItemsID,
} from "./cartSlice";

const CartModal = ({ handleHideModalCart, isOpen }) => {
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectCheckoutTotalItems);
  const totalPrice = useSelector(selectCheckoutTotalPrices);
  const selectedItemsID = useSelector(selectSelectedItemsID);
  const dispatch = useDispatch();

  const handleClickBuy = (product) => {
    dispatch(addItemToCart(product));
  };

  const handleClickSell = (product) => {
    dispatch(removeItemFromCart(product));
  };
  const handleCheckboxChange = (id) => {
    dispatch(checkoutCartItems(id));
  };

  const handleCheckoutToWhatsapp = () => {
    if (totalItems === 0) return;

    const phoneNumber = "628226274171";
    const message = encodeURIComponent(
      `Halo, saya ingin membeli ${totalItems} barang dengan total harga ${totalPrice}`
    );

    const URL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

    window.open(URL, "_blank");
  };

  return (
    <Modal handleHideModal={handleHideModalCart} isOpen={isOpen}>
      <div className="flex flex-col gap-6 p-1: sm:p-2 w-full lg:w-[900px]">
        <div className="flex flex-col gap-6 max-h-[350px] overflow-auto">
          {cartItems.map((product) => {
            return (
              <div
                className="w-full border-b-4 border-blue-200 pb-4"
                key={product.id}
              >
                <div className="flex items-center w-full gap-4">
                  <input
                    type="checkbox"
                    checked={selectedItemsID.includes(product.id)}
                    onChange={() => handleCheckboxChange(product.id)}
                    className="w-5 h-5 text-blue-500 rounded-xl"
                  />
                  <div className="w-[120px] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-32 object-contain"
                    />
                  </div>
                  <div className="ml-4 w-[75%]">
                    <h3 className="capitalize mt-3 text-lg line-clamp-2">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm">{product.price}</h4>
                      <h3 className="text-lg font-bold">
                        {product.totalPrice}
                      </h3>
                    </div>
                    <div className="flex items-center gap-4 mt-4 ml-auto">
                      <button
                        type="button"
                        className="rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center"
                        onClick={() => handleClickSell(product)}
                      >
                        -
                      </button>
                      <h3>{product.quantity}</h3>
                      <button
                        type="button"
                        className="rounded-full bg-blue-400 w-5 h-5 text-white flex items-center justify-center"
                        onClick={() => handleClickBuy(product)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h3 className="text-md font-bold">Total Item: {totalItems}</h3>
          <h3 className="text-md font-bold">
            Total Price: {Math.round(totalPrice * 100) / 100}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="bg-slate-600 hover:bg-slate-800 text-white py-3 px-8 rounded-xl text-sm"
            onClick={handleHideModalCart}
          >
            Close
          </button>
          <button
            type="button"
            className="bg-green-600 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-xl text-sm"
            onClick={handleCheckoutToWhatsapp}
          >
            Checkout (whatsapp)
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CartModal;
