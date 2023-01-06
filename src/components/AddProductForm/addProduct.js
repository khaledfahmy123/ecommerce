import { useRef, useState } from "react";
import styles from "./addProduct.module.css";
import mainStyles from "./../App.module.css";
import homeStyles from "./../Home/home.module.css";
import Types from "./types";
import { Link } from "react-router-dom";
import { postData } from "./../DataFetchingFuncs/dataFetching";

const AddProductForm = (props) => {
  const { products, reFetch } = props;
  const [type, setType] = useState("noValue");
  const [formIsValid, setFormIsVaild] = useState(false);
  const [notification, setNotification] = useState("");

  const submitBtn = useRef();
  const addForm = useRef();

  // const postData = (temp) => {
  //   const requestOptions = {
  //     method: "post",
  //     mode: "no-cors",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(temp),
  //   };
  //   fetch("https://e-commerce-frog.000webhostapp.com/", {
  //     method: "post",
  //     mode: "no-cors",
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(temp),
  //   })
  //     .then((res) => res.json())
  //     .then((recipes) => {
  //       console.log(recipes);
  //     });
  // };

  const submitHandler = (e) => {
    e.preventDefault();

    let dataFields = e.target.elements;
    let description = "";

    for (let i in products) {
      if (products[i].sku === dataFields.sku.value) {
        setNotification("Enter a valid sku, this product already added");
        return;
      }
    }
    /* instead of using multiple cols for the types we can just 
      formate the data here before sending it to the backend
    */

    switch (dataFields.types.value) {
      case "dvd":
        description = `size: ${dataFields.size.value} mb`;
        break;
      case "book":
        description = `weight: ${dataFields.weight.value} kg`;
        break;
      case "furniture":
        description = `Dimensions: ${dataFields.height.value}x${dataFields.width.value}x${dataFields.len.value}`;
        break;
      default:
        break;
    }

    // formating data in a template to store in the database

    let temp = {
      status: "",
      sku: dataFields.sku.value,
      name: dataFields.name.value,
      price: dataFields.price.value,
      description: description,
    };

    // clear fields
    for (let x in dataFields) {
      if (dataFields[x].tagName === "INPUT") {
        dataFields[x].value = "";
      }
    }

    // post data to the server
    postData(temp);
    reFetch();
  };

  const typeChangeHandler = (event) => {
    setType(event.target.value);
  };

  return (
    <>
      <header className={`${homeStyles.header} ${styles.header}`}>
        <div className={mainStyles.container}>
          <h1>product add</h1>

          <button>
            <Link to="/">cancel</Link>
          </button>
          <button
            type="submit"
            className={styles.save}
            onClick={() => submitBtn.current.click()}
          >
            save
          </button>
        </div>
      </header>

      <form ref={addForm} id="product_form" onSubmit={submitHandler}>
        <div className={mainStyles.container}>
          <span>
            <label htmlFor="sku">SKU</label>
            <input
              type="text"
              required="required"
              name="sku"
              id="sku"
              placeholder="#sku"
            />
          </span>
          <span>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              required="required"
              name="name"
              id="name"
              placeholder="#name"
            />
          </span>
          <span>
            <label htmlFor="price">Price ($)</label>
            <input
              type="number"
              step="0.01"
              required="required"
              name="price"
              id="price"
              placeholder="#price"
              min={0}
            />
          </span>

          <span>
            <label htmlFor="types">Type Switcher</label>
            <select
              name="types"
              value={type}
              onChange={typeChangeHandler}
              id="productType"
            >
              {Object.keys(Types).map((key, index) => {
                return (
                  <option
                    value={key}
                    key={key}
                    disabled={index == 0 ? "disabled" : ""}
                  >
                    {Types[key].title}
                  </option>
                );
              })}
            </select>
          </span>
          <article>
            <h3>{Types[type]["txt"]}</h3>
            {Types[type]["compo"]}
          </article>
          <h3 className={styles.notify}>{notification}</h3>
        </div>

        <button
          type="submit"
          ref={submitBtn}
          style={{ display: "none" }}
        ></button>
      </form>
    </>
  );
};

export default AddProductForm;
