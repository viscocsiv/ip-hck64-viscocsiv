import formatPrice from "../helpers/formatPrice";


export default function TableProducts() {
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
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Starbucks Coffee Variety Pack, 100% Arabica</td>
                <td>{formatPrice(25495)}</td>
                <td>coffee</td>
                <td>true</td>
                <td>
                  <button className="btn bg-violet-700 hover:bg-violet-900">
                    Add to Cart
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-lime-900 flex flex-col align-middle items-center p-4">
          Cart
        </div>
      </div>
    </>
  );
}
