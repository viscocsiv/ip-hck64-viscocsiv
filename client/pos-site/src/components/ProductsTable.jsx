/* eslint-disable react/prop-types */
import formatPrice from "../helpers/formatPrice";
export default function ProductsTable({ addItemToCart, products, orderId, userId }) {

  return (
    <>
      <table className="text-center table table-auto my-4 flex flex-col bg-violet-700">
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
          {products?.map((product) => {
            const { id, name, price, category } = product;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{formatPrice(price)}</td>
                <td>{category}</td>
                <td>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      // console.log(event);
                      // console.log(orderId, id, userId);
                      addItemToCart(orderId, id, userId);
                    }}
                    className="btn btn-primary"
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
