import React, { useContext, useState, useEffect } from "react";
import "./ChildProduct.module.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { wishContext } from "../../Context/WishListContext";

export default function ChildProduct(props) {
  let { addToCart } = useContext(CartContext);
  let { addToWishList, deleteUserWish, getUserWish } = useContext(wishContext);
  let [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    checkIfInWishlist(props.productDetails._id);
  }, [props.productDetails._id]);

  async function checkIfInWishlist(id) {
    let { data } = await getUserWish();
    let found = data?.data?.some((item) => item._id === id);
    setIsInWishlist(found);
  }

  async function toggleWishlist(id) {
    if (isInWishlist) {
      let response = await deleteUserWish(id);
      if (response?.data.status === "success") {
        setIsInWishlist(false);
        toast.success("Product removed from wishlist", {
          position: "top-right",
          duration: 4000,
          style: {
            padding: "10px",
            color: "#fff",
            backgroundColor: "red",
          },
          icon: "❌",
        });
      } else {
        toast.error("Error in removing");
      }
    } else {
      let response = await addToWishList(id);
      if (response?.data.status === "success") {
        setIsInWishlist(true);
        toast.success("Added to wishlist ❤️", {
          position: "top-right",
          duration: 4000,
          style: {
            padding: "10px",
            color: "#fff",
            backgroundColor: "#4fa74f",
          },
          icon: "✔️",
        });
      } else {
        toast.error("Error in adding");
      }
    }
  }

  async function addProductToCart(id) {
    let response = await addToCart(id);
    if (response?.data?.status === "success") {
      toast.success("Product added to cart 🚕", {
        position: "top-right",
        duration: 4000,
        style: {
          padding: "10px",
          color: "#fff",
          backgroundColor: "green",
        },
        icon: "✔️",
      });
    } else {
      toast.error("Error in adding", {
        position: "top-right",
        duration: 4000,
        style: {
          padding: "10px",
          color: "#fff",
          backgroundColor: "red",
        },
        icon: "❌",
      });
    }
  }

  return (
    <>
      {props?.productDetails ? (
        <div key={props.productDetails._id} className="col-md-3 col-sm-6">
          <div className="addParent rounded bg-body">
            <Link to={`/productDetails/${props.productDetails._id}`}>
              <div className="container">
                <img
                  src={props.productDetails.imageCover}
                  className="w-100"
                  alt="product cover"
                />
                <p className="main-color">{props.productDetails.category.name}</p>
                <h6 className="main-color">
                  {props.productDetails.title.split(" ").slice(0, 2).join(" ")}
                </h6>
                <div className="d-flex justify-content-between py-2">
                  <span className="main-color">
                    {props.productDetails.price} EGP
                  </span>
                  <span className="main-color">
                    <i className="fa-solid fa-star rating-color px-2"></i>
                    {props.productDetails.ratingsAverage}
                  </span>
                </div>
              </div>
            </Link>
            <div className="d-flex justify-content-between py-4 align-items-center">
              <button
                onClick={() => addProductToCart(props.productDetails._id)}
                className="btn w-75 bg-success addHover text-white addColorChange"
              >
                + Add
              </button>
              <button className="btn btnFocus">
                <i
                  onClick={() => toggleWishlist(props.productDetails._id)}
                  className="fa-solid fa-heart fa-xl heartPosition"
                  style={{ color: isInWishlist ? "red" : "green" }}
                ></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
