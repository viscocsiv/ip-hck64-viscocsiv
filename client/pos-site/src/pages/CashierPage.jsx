import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../constants";
import ProductsTable from "../components/ProductsTable";
import CartTable from "../components/CartTable";
import { toast } from "react-toastify";

export default function CashierPage() {
  const [products, setProducts] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const addItemToCart = async (orderId, productId, userId) => {
    try {
      const { data } = await axios({
        method: "post",
        url: url + `/orders/${orderId}/carts`,
        data: {
          ProductId: productId,
          UserId: userId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      // console.log(data);
      setItemsInCart(data.carts);
      setTotalPrice(data.totalPrice);
      // console.log(data.carts);
      // console.log(data.totalPrice);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const createOrder = async () => {
    try {
      const { data } = await axios({
        method: "post",
        url: url + "/orders",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      // console.log(data);
      setOrderId(data.OrderId);
      setUserId(data.UserId);
      setItemsInCart(null);
      setTotalPrice(null);
      toast.success(`created new Order with id ${data.OrderId}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: url + "/products",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      // console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid grid-rows-2 lg:grid-cols-2 my-20">
        <div className="flex flex-col align-middle items-center p-4">
          <div className="grid grid-cols-3 items-center w-full">
            <div></div>
            <h1 className="my-2.5 text-xl">Product List</h1>
            <button
              onClick={(event) => {
                event.preventDefault(event);
                createOrder(orderId);
              }}
              className="btn btn-secondary w-20"
            >
              New Order
            </button>
          </div>
          <ProductsTable
            addItemToCart={addItemToCart}
            products={products}
            userId={userId}
            orderId={orderId}
          />
        </div>
        <div className="flex flex-col align-middle items-center p-4">
          <h1 className="my-2.5 text-xl">Cart</h1>
          <CartTable
            orderId={orderId}
            setItemsInCart={setItemsInCart}
            setTotalPrice={setTotalPrice}
            itemsInCart={itemsInCart}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </>
  );
}
