
import { useCart } from "../components/CartContext";
import { Plus, Heart, Minus, Trash2 } from "lucide-react";
import { useState,useEffect } from "react";function ShoppingCart() {
  const {
    cartProducts,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const [discountTotal, setDiscountTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBrute, setTotalBrute] = useState(0);

  useEffect(() => {
    CalculateTotals();
  }, [cartProducts]);

  const CalculateTotals = () => {
    const discountRate = 0.13;
    let total = 0;
    cartProducts.forEach((product) => {
      total += product.price * product.quantity;
    });
    const totalDiscount = total * discountRate;
    const finalTotal = total - totalDiscount;
    setTotalBrute(total);
    setDiscountTotal(totalDiscount);
    setTotalAmount(finalTotal);
  };

  return (
    <div className="flex flex-col md:flex-row pt-[100px] m-auto">
      <ul className="w-full md:w-[60%]">
        {cartProducts.length === 0 ? (
          <li className="text-center font-semibold text-xl">No items in your cart</li>
        ) : (
          cartProducts.map((product) => (
            <li key={product._id}>
              <div className="flex flex-col m-auto w-[90%] gap-2 p-2 md:flex-row">
                <div className="w-full space-y-2 border-b-2 py-2 border-gray-300">
                  <h1 className="font-semibold text-3xl">Bag</h1>
                  <div className="flex gap-2 flex-col md:flex-row p-2">
                    <img
                      src={product.available[0].path}
                      alt={product.name}
                      className="w-[170px] h-[170px]"
                    />
                    <div className="flex justify-between w-full">
                      <div className="text-base/tight leading-6.5">
                        <h2 className="font-semibold">{product.name}</h2>
                        <p className="text-gray-600">
                          Category: {product.category}
                        </p>
                        <p className="md:text-gray-600 sm:text-white">
                          Description: {product.details}
                        </p>
                        <p className="text-gray-600">Size: 41</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">
                          {product.price} DA
                        </p>
                        <p className="font-medium text-lg text-green-600">
                          {product.price * product.quantity} DA
                        </p>
                      </div>
                    </div>
                  </div>
                  <Controle
                    id={product._id}
                    quantity={product.quantity}
                    price={product.price}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      <div className="w-full md:w-[30%] px-4">
        <h1 className="text-3xl font-semibold">Summary</h1>
        <div className="flex flex-cols border-b-2 py-2 border-gray-300">
          <div className="flex-2/3 text-lg font-medium leading-7.5">
            <p>Subtotal</p>
            <p>Estimated Shipping & Handling</p>
            <p>Estimated Tax</p>
            <p>Discount Total</p>
            <p className="text-green-600">13 % off - Price in Cart</p>
          </div>
          <div className="flex-1/3 font-medium text-lg">
            <p>{totalBrute} DA</p>
            <p>Free</p>
            <p>_</p>
            <p>{totalAmount.toFixed(2)} DA</p>
          </div>
        </div>
        <div className="flex flex-cols py-3.5 border-b-2 border-gray-300">
          <div className="flex-2/3">
            <p className="text-lg/tight leading-7.5">Total</p>
          </div>
          <div className="flex-1/3">
            <p className="text-lg/tight leading-7.5">
              {totalAmount.toFixed(2)} DA
            </p>
          </div>
        </div>
        <div className="py-3 space-y-4">
          <button className="bg-black py-3 rounded-xl text-white w-full font-mono text-xl cursor-pointer">
            Checkout
          </button>
          <button className="bg-gray-400 py-3 rounded-xl text-white w-full font-mono text-xl cursor-pointer">
            PayPal
          </button>
        </div>
      </div>
    </div>
  );
}


function Controle({ id, quantity, price, updateQuantity, removeFromCart }) {
  const [favorite, setFavorite] = useState(false);

  const handleClickPlus = () => {
    if (quantity < 10) {
      updateQuantity(id, quantity + 1);
    }
  };

  const handleClickMinus = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id); // Suppression du produit
    }
  };

  const addToFavorite = () => {
    setFavorite(true);
  };

  return (
    <div className="flex items-center gap-7.5 px-1">
      <div className="grid grid-cols-3 place-items-center ring-1 ring-gray-200 shadow-2xs w-[110px] rounded-3xl h-[43px]">
        <div
          className="rounded-full w-full h-full flex justify-center items-center hover:bg-gray-200 cursor-pointer"
          onClick={handleClickMinus}
        >
          {quantity === 1 ? (
            <Trash2 size={20} />
          ) : (
            <Minus size={20} />
          )}
        </div>
        <span className={`${quantity === 10 ? "text-gray-400" : ""}`}>
          {quantity}
        </span>
        <div
          className="rounded-full w-full h-full flex justify-center items-center hover:bg-gray-200 cursor-pointer"
          onClick={handleClickPlus}
        >
          <Plus size={20} />
        </div>
      </div>
      <Heart
        className="rounded-full hover:bg-gray-200 cursor-pointer p-1"
        size={27}
        color={favorite ? "red" : "gray"}
        onClick={addToFavorite}
      />
    </div>
  );
}


export default ShoppingCart;
