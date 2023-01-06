import { useEffect, useState } from "react";
import mainStyles from "./../App.module.css";
import styles from "./home.module.css";
import Product from "./../ProductCardTemp/productCardTemp";
import { Link } from "react-router-dom";
import { deleteData } from "../DataFetchingFuncs/dataFetching";
const Home = (props) => {
  const { products } = props;
  const [checkedProducts, setCkeckedProducts] = useState([]);

  const massDeleteHandler = () => {
    let temp = {
      status: "delete",
      ids: checkedProducts,
    };
    deleteData(temp);
    // reFetch();
  };

  const addToDeleteList = (e) => {
    if (e.target.checked) {
      setCkeckedProducts((prev) => {
        return [...prev, e.target.name];
      });
    } else {
      setCkeckedProducts((prev) => {
        return [...prev.filter((p) => p !== e.target.name)];
      });
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={mainStyles.container}>
          <h1>product list</h1>

          <button>
            <Link to="/add-product">add</Link>
          </button>
          <button className={styles.delete} onClick={massDeleteHandler}>
            mass delete
          </button>
        </div>
      </header>

      <section className={styles.products}>
        <div className={mainStyles.container}>
          {!products.length ? (
            <h1>No products to display, try add some</h1>
          ) : (
            products.map((e) => {
              return (
                <>
                  <Product
                    data={e}
                    key={e.id}
                    toggleHandler={addToDeleteList}
                  />
                </>
              );
            })
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
