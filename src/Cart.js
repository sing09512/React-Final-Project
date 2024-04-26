import { useEffect, useState } from "react";
import { db } from "./firebase";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { HotelCard } from "./HotelCard";

export default function Cart({
  favorites,
  setFavorites,
  favoritesId,
  setFavoritesId,
  cart,
  setCart,
  getUserData,
  total,
  setTotal,
}) {
  const { currentUser } = useAuth();

  let sum = 0;

  total.forEach((num) => {
    sum += num;
  });
  console.log("TEST", total);

  // let totalSum = 0;
  // totalSum.forEach((num) => {
  //   num += num;
  // });

  // console.log("totalSum", totalSum);
  // console.log("totalPayPrice", totalPayPrice);

  if (currentUser) {
    return (
      <div className="mt-10">
        <CartList
          favorites={favorites}
          setFavorites={setFavorites}
          favoritesId={favoritesId}
          setFavoritesId={setFavoritesId}
          cart={cart}
          setCart={setCart}
          getUserData={getUserData}
          sum={sum}
        />
      </div>
    );
  } else {
    console.log("No user is currently signed in.");
    return <p>Please Sign in to access this page</p>;
  }
}

function CartList({ favorites, setFavorites, favoritesId, setFavoritesId, cart, setCart, getUserData, sum, h }) {
  const { currentUser } = useAuth();

  useEffect(() => {
    // getUserData();

    console.log("favorites:", favorites);
    console.log("favoritesId:", favoritesId);
    console.log("cart", cart);
  }, [favorites, favoritesId, cart]);

  const toggleFavorite = async (id, name, img, rating, pricePerNight, totalPrice, amenities, nearby, hotelstar) => {
    try {
      if (currentUser) {
        const userRef = doc(db, currentUser.uid, "favHotel");
        const userDoc = await getDoc(userRef);
        const existingFavorites = userDoc.data().hotelList || [];

        // Check if the hotel already exists in the favorites
        const hotelInFavorites = existingFavorites.some((hotel) => hotel.id === id);

        const updatedFavorites = hotelInFavorites
          ? existingFavorites.filter((hotel) => hotel.id !== id) // Remove from favorites
          : [
              ...existingFavorites,
              {
                id,
                name,
                img,
                rating,
                pricePerNight,
                totalPrice,
                amenities,
                nearby,
                hotelstar,
              },
            ]; // Add to favorites

        await setDoc(userRef, { hotelList: updatedFavorites });

        getUserData(); // Refresh the state
      } else {
        console.log("User not logged in.");
      }
    } catch (error) {
      console.log("Error updating favorites:", error);
    }
  };

  const toggleCart = async (id, name, img, rating, pricePerNight, totalPrice, amenities, nearby, hotelstar, sum) => {
    try {
      if (currentUser) {
        const userRef = doc(db, currentUser.uid, "cart");
        const userDoc = await getDoc(userRef);
        const cartData = userDoc.data().cartList || [];

        // Check if the hotel already exists in the cart
        const itemIndex = cartData.findIndex((item) => item.id === id);
        console.log("itemIndex:", itemIndex);

        const updateCart =
          itemIndex !== -1
            ? cartData.filter((hotel) => hotel.id !== id) // Remove from cart
            : [
                ...cartData,
                {
                  id,
                  name,
                  img,
                  rating,
                  pricePerNight,
                  totalPrice,
                  amenities,
                  nearby,
                  hotelstar,
                },
              ]; // Add to cart

        await setDoc(userRef, { cartList: updateCart });

        getUserData(); // Refresh the state
      } else {
        console.log("User not logged in.");
        alert("Please Login");
      }
    } catch (error) {
      console.log("Error updating favorites:", error);
    }
  };

  return (
    <div className="mx-6">
      <p className="text-center text-3xl font-bold m-5">My Cart</p>
      <ul className="hotel-cards">
        {cart.map &&
          cart?.map((hotel) => (
            <HotelCard
              name={hotel.name}
              img={hotel.img}
              rating={hotel.rating}
              pricePerNight={hotel.pricePerNight}
              totalPrice={hotel.totalPrice}
              amenities={hotel.amenities}
              key={hotel.id}
              id={hotel.id}
              toggleFavorite={toggleFavorite}
              toggleCart={toggleCart}
              nearby={""}
              hideFavoriteBtn={true}
              isInCart={true}
            />
          ))}
      </ul>
      <div className="flex flex-col items-end p-4 space-y-2 mb-6">
        <p className="py-2 text-2xl mr-10">
          <span className="text-base text-gray-700">Total: </span>$ {sum}
        </p>
        {/* 這裡需要total */}
        <Link
          to="/payment"
          className="bg-[#75BDC8] font-bold text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 mr-10"
        >
          {" "}
          <svg
            className="inline mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          Booking Now
        </Link>
      </div>
    </div>
  );
}
