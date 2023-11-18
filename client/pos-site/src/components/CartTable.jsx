/* eslint-disable react/prop-types */
import { useState } from "react";
import formatPrice from "../helpers/formatPrice";
import axios from "axios";
import url from "../../constants";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import ButtonPayment from "./ButtonPayment";

export default function CartTable({
  orderId,
  setItemsInCart,
  itemsInCart,
  totalPrice,
  setTotalPrice,
}) {
  const [quantity, setQuantity] = useState(1);

  const deleteModal = async (cartId, orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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

  const editQuantity = async (orderId, cartId) => {
    try {
      const { data } = await axios({
        method: "patch",
        url: url + `/orders/${orderId}/carts/${cartId}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      // console.log(data);
      setItemsInCart(data.carts)
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
        <tbody>
          {/* {console.log(itemsInCart)} */}
          {itemsInCart?.map((itemInCart, idx) => {
            // console.log(itemInCart);
            return (
              <tr key={itemInCart.id}>
                <td>{idx + 1}</td>
                <td>{itemInCart.Product.name}</td>
                <td>{formatPrice(itemInCart.Product.price)}</td>
                <td>{itemInCart.quantity}</td>
                <td>
                  <div>
                    <form className="flex flex-col xl:flex-row gap-2">
                      <input
                        name="quantity"
                        value={quantity}
                        onChange={(event) => {
                          setQuantity(event.target.value);
                        }}
                        min="1"
                        type="number"
                        className="input input-bordered w-14"
                      />
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          editQuantity(itemInCart.orderId, itemInCart.id);
                        }}
                        className="btn btn-accent w-14"
                      >
                        Edit
                      </button>
                    </form>
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
          <ButtonPayment orderId={orderId} totalPrice={totalPrice}/>
      </div>
    </>
  );
}
