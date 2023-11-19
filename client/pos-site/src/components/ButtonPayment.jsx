/* eslint-disable react/prop-types */
import axios from "axios";
import url from "../../constants";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ButtonPayment({
  setOrderId,
  setItemsInCart,
  setTotalPrice,
  totalPrice,
}) {
  const navigate = useNavigate();
  const handlePayment = async () => {
    try {
      const { data } = await axios({
        method: "post",
        url: url + `/payment/midtrans/token`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        data: {
          totalPrice,
        },
      });
      // console.log(data);
      window.snap.pay(data.transaction_token, {
        onSuccess: function () {
          /* You may add your own implementation here */
          setItemsInCart(null);
          setTotalPrice(null);
          setOrderId(null);
          navigate("/cashier");
        },
        onPending: function () {
          /* You may add your own implementation here */
          Swal.fire({
            title: "Waiting your payment!",
            icon: "info",
          });
        },
        onError: function () {
          /* You may add your own implementation here */
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your payment is failed",
          });
        },
        onClose: function () {
          /* You may add your own implementation here */
          Swal.fire({
            title: "You closed the popup without finishing the payment",
            icon: "warning",
          });
          navigate("/cashier");
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={handlePayment}
        className="btn bg-lime-500 hover:bg-lime-700"
      >
        Payment
      </button>
    </>
  );
}
