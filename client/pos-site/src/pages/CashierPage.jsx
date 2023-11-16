import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../constants";
import ProductsTable from "../components/ProductsTable";

export default function CashierPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

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
      <ProductsTable products={products} />
    </>
  );
}
