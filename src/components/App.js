import { useState, useEffect } from "react";
import "./App.module.css";
import Home from "./Home/home";
import AddProductForm from "./AddProductForm/addProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchData } from "./DataFetchingFuncs/dataFetching";

const App = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const reloadHandler = () => {
    setReload((prev) => !prev);
  };

  const reFetchData = () => {
    fetchData().then((d) => setProducts(d));
  };

  useEffect(() => {
    reFetchData();
  }, [reload]);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home products={products} />} />
          <Route
            exact
            path="/add-product"
            element={<AddProductForm products={products} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
