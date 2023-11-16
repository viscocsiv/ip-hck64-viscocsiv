/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import formatPrice from "../helpers/formatPrice";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ProductsTable({ products }) {
  const navigate = useNavigate();

  const addItemToCart = async () => {
    try {
      
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
  }

  return (
    <>
      <div className="grid grid-rows-2 lg:grid-cols-2 my-20">
        <div className="flex flex-col align-middle items-center p-4">
          <div className="">
            <h1>Product List</h1>
          </div>
          <table className="text-center table table-auto my-4 flex flex-col bg-lime-600">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{formatPrice(product.price)}</td>
                    <td>{product.category}</td>
                    <td>
                      <button onClick={(event) => {

                      }} className="btn bg-violet-700 hover:bg-violet-900">
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bg-lime-900 flex flex-col align-middle items-center p-4">
          <div>
            cart
          </div>
        </div>
      </div>
    </>
  );
}
