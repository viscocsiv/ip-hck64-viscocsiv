/* eslint-disable react/prop-types */
import axios from "axios";
import url from "../../constants";
import { useNavigate } from "react-router-dom";

export default function ButtonPayment({ totalPrice }) {
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
      //   console.log(data);
      window.snap.pay(data.transaction_token, {
        onSuccess: function () {
          /* You may add your own implementation here */
          alert("payment success!");
          navigate("/");
        },
        onPending: function () {
          /* You may add your own implementation here */
          alert("waiting your payment!");
        },
        onError: function () {
          /* You may add your own implementation here */
          alert("payment failed!");
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("you closed the popup without finishing the payment");
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
