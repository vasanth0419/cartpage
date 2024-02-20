# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


#### cart page task

#### _* 1st step to create a empty folder for a project and create react project with in the folder`cartpage`*_

#### code to create a react `npm create vite@latest cartpage`

### create a components as for recuirement

#### codes in `app.jsx`
```
import React, { createContext, useState } from "react";
import CartPage from "./components/CartPage";
export const mycontext = createContext("");
import "./App.css";

const App = () => {
  const products = [
    {
      id: 1,
      title: "iPhone 9",
      description: "An apple mobile which is nothing like apple",
      price: 549,
      discountPercentage: 12.96,
      rating: 4.69,
      stock: 94,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/1/1.jpg",
        "https://i.dummyjson.com/data/products/1/2.jpg",
        "https://i.dummyjson.com/data/products/1/3.jpg",
        "https://i.dummyjson.com/data/products/1/4.jpg",
        "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      ],
    },
    {
      id: 2,
      title: "iPhone X",
      description:
        "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
      price: 899,
      discountPercentage: 17.94,
      rating: 4.44,
      stock: 34,
      brand: "Apple",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/2/1.jpg",
        "https://i.dummyjson.com/data/products/2/2.jpg",
        "https://i.dummyjson.com/data/products/2/3.jpg",
        "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
      ],
    },
    {
      id: 3,
      title: "Samsung Universe 9",
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: "Samsung",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
      images: ["https://i.dummyjson.com/data/products/3/1.jpg"],
    },
    {
      id: 4,
      title: "OPPOF19",
      description: "OPPO F19 is officially announced on April 2021.",
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: "OPPO",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/4/1.jpg",
        "https://i.dummyjson.com/data/products/4/2.jpg",
        "https://i.dummyjson.com/data/products/4/3.jpg",
        "https://i.dummyjson.com/data/products/4/4.jpg",
        "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
      ],
    },
    {
      id: 5,
      title: "Huawei P30",
      description:
        "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
      price: 499,
      discountPercentage: 10.58,
      rating: 4.09,
      stock: 32,
      brand: "Huawei",
      category: "smartphones",
      thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
      images: [
        "https://i.dummyjson.com/data/products/5/1.jpg",
        "https://i.dummyjson.com/data/products/5/2.jpg",
        "https://i.dummyjson.com/data/products/5/3.jpg",
      ],
    },
  ];
  const [data, setData] = useState(products);
  return (
    <div className="container app">
      <mycontext.Provider value={[data, setData]}>
        <CartPage />
      </mycontext.Provider>
    </div>
  );
};

export default App;


```
#### codes in `Cartpage.jsx`
```
import React, { useContext } from "react";
import { mycontext } from "../App";
import "./style/CartPage.css";

const CartPage = () => {
  const [data, setData] = useContext(mycontext);
  const totalprice = data.reduce(
    (total, data) => total + data.price * (data.quantity || 1),
    0
  );
  const totalquantity = data.reduce(
    (total, data) => total + (data.quantity || 1),
    0
  );
  const handleadd = (id, quantity) => {
    setData((perData) => {
      return perData.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 || quantity + 1 };
        }
        return item;
      });
    });
  };
  const handleminus = (id, quantity) => {
    setData((perData) => {
      return perData.map((item) => {
        if (item.id === id && (item.quantity || 0) > 0) {
          return { ...item, quantity: item.quantity - 1 || quantity - 1 };
        }
        return item;
      });
    });
  };
  const handleremove = (id) => {
    setData((perData) => {
      const updatedData = perData.filter((item) => item.id !== id);
      return updatedData;
    });
  };

  return (
    <div>
      <h1 className="head">
        <i className="bi bi-cart3"></i>CART PAGE
      </h1>
      <div className="container body">
        {data.map((item, index) => (
          <div className="row cart-item" key={index}>
            <div className="col-5">
              <div
                className="carousel slide"
                data-bs-ride="carousel"
                id={`carousel-${index}`}
              >
                <div className="carousel-inner">
                  {item.images.slice(0, 5).map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className={`carousel-item ${
                        imgIndex === 0 ? "active" : ""
                      }`}
                    >
                      <img
                        src={img}
                        className="d-block w-100"
                        alt={`Slide ${imgIndex + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target={`#carousel-${index}`}
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target={`#carousel-${index}`}
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="col-7 content">
              <div className="card mb-3">
                <p className="m-2 p-2 text-muted">
                  {item.brand}
                  <span className="quantity">
                    <button
                      onClick={() => handleadd(item.id, item.quantity || 1)}
                    >
                      +
                    </button>

                    <p>{item.quantity || 1}</p>

                    <button
                      onClick={() => handleminus(item.id, item.quantity || 1)}
                    >
                      -
                    </button>
                  </span>
                </p>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">
                    <span className="price">Price: </span>
                    {item.price} $
                  </p>
                  <p>Discount : {item.discountPercentage} %</p>
                  <p className="card-text">
                    <button
                      className="remove"
                      onClick={() => handleremove(item.id)}
                    >
                      Remove
                    </button>
                    <hr />
                    <small className="rating text-warning">
                      Rating: {item.rating}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container">
        <div className="footer">
          <h1>Quantity : {totalquantity}</h1>
          <h1>Total : {totalprice} $</h1>
        </div>
      </div>
    </div>
  );
};

export default CartPage;


```