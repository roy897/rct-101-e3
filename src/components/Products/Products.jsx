import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product/Product";
import { CartContext } from "../../context/CartContext";

const Products = () => {
  const [data, setData] = useState([]);
  const {cartCount, increment, decrement} = useContext(CartContext);

  const getData = () => {
    axios.get("http://localhost:8080/products")
    .then((r)=>setData(r.data))
  }

  const getCartD = (id) => {
    axios.get(
      "http://localhost:8080/cartItems",
      JSON.stringify({
        productId: id,
        count: cartCount
      })
    ).then((r)=>console.log(r))
  }

  const addToCart = (id) => {
    // console.log(id);
    getCartD(id);    
  }

  useEffect(()=>{
    getData();
  },[])

  return <div>
    {
      data.map((e)=>(
        <Product key={e.id} e={e} id={e.id} inc={increment} dec={decrement} addToCart={addToCart} />
      ))
    }
    
  </div>;
};

export default Products;
