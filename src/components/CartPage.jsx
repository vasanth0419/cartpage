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
