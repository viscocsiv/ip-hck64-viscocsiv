/* eslint-disable react/prop-types */
import { useState } from "react";
import formatPrice from "../helpers/formatPrice";
import axios from "axios";
import url from "../../constants";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ButtonPayment from "./ButtonPayment";

export default function CartTable({
  setCartId,
  setOrderId,
  orderId,
  setItemsInCart,
  itemsInCart,
  totalPrice,
  setTotalPrice,
}) {
  const [increment, setIncrement] = useState(null);
  const [decrement, setDecrement] = useState(null);

  const deleteModal = async (cartId, orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "The product will be removed from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const { data } = await axios({
        method: "delete",
        url: url + `/orders/${orderId}/carts/${cartId}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setTotalPrice(data.totalPrice);
      setItemsInCart(data.carts);
    }
  };

  const handleIncrementQuantity = async (orderId, cartId, increment) => {
    try {
      // console.log(orderId, cartId, increment);
      const { data } = await axios({
        method: "patch",
        url: url + `/orders/${orderId}/carts/${cartId}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        data: {
          increment,
        },
      });
      // console.log(data);
      setTotalPrice(data.totalPrice);
      setItemsInCart(data.carts);
      setCartId(null);
    } catch (error) {
      console.log(error);
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

  const handleDecrementQuantity = async (orderId, cartId, decrement) => {
    try {
      // console.log(orderId, cartId, decrement);
      const { data } = await axios({
        method: "patch",
        url: url + `/orders/${orderId}/carts/${cartId}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        data: {
          decrement,
        },
      });
      // console.log(data);
      setTotalPrice(data.totalPrice);
      setItemsInCart(data.carts);
      setCartId(null);
    } catch (error) {
      console.log(error);
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

  return (
    <>
      <table className="text-center table table-auto my-4 flex flex-col bg-violet-700">
        <thead>
          <tr>
            <th>No.</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Edit Quantity</th>
            <th>Delete Item</th>
          </tr>
        </thead>
        <tbody className="align-middle items-center">
          {/* {console.log(itemsInCart)} */}
          {itemsInCart?.map((itemInCart, idx) => {
            // console.log(itemInCart);
            return (
              <tr key={itemInCart.id}>
                <td>{idx + 1}</td>
                <td>{itemInCart.Product.name}</td>
                <td>{formatPrice(itemInCart.Product.price)}</td>
                <td>{itemInCart.quantity}</td>
                <td className="flex flex-col gap-2 xl:flex-row">
                  <div>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        setCartId(itemInCart.id);
                        setIncrement("increment");
                        handleIncrementQuantity(
                          itemInCart.OrderId,
                          itemInCart.id,
                          increment
                        );
                      }}
                      className="btn btn-secondary"
                    >
                      <p>+</p>
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        setCartId(itemInCart.id);
                        setDecrement("decrement");
                        handleDecrementQuantity(
                          itemInCart.OrderId,
                          itemInCart.id,
                          decrement
                        );
                      }}
                      className="btn btn-accent "
                    >
                      <p>-</p>
                    </button>
                  </div>
                </td>
                <td>
                  <div>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        deleteModal(itemInCart.id, itemInCart.OrderId);
                      }}
                      className="btn bg-red-800 hover:bg-red-950"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl">Total Price: {formatPrice(totalPrice)}</h1>
        <ButtonPayment
          setItemsInCart={setItemsInCart}
          setTotalPrice={setTotalPrice}
          orderId={orderId}
          setOrderId={setOrderId}
          totalPrice={totalPrice}
        />
      </div>
    </>
  );
}
