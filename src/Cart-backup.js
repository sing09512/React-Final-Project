import { useEffect, useState } from "react";
import { db } from "./firebase";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { HotelCard } from "./HotelCard";

export default function Cart({ favorites, setFavorites, favoritesId, setFavoritesId, cart, setCart, getUserData }) {
  const { currentUser } = useAuth();

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
        />
      </div>
    );
  } else {
    console.log("No user is currently signed in.");
    return <p>Please Sign in to access this page</p>;
  }
}

function CartList({ favorites, setFavorites, cart, setCart, getUserData }) {
  const { currentUser } = useAuth();

  useEffect(() => {
    // getUserData();

    console.log("favorites:", favorites);
    console.log("cart", cart);
    console.log();
  }, [favorites, cart]);

  const toggleFavorite = async (
    id,
    name,
    img,
    rating,
    pricePerNight,
    totalPrice,
    amenitie1,
    amenitie2,
    amenitie3,
    hotelstar,
    nearby
  ) => {
    try {
      if (currentUser) {
        const userRef = doc(db, currentUser.uid, "favHotel");
        const userDoc = await getDoc(userRef);
        const hotelData = userDoc.data().hotelList || [];

        // Check if the hotel already exists in the favorites
        const itemIndex = hotelData.findIndex((item) => item.id === id);
        console.log("fav itemIndex:", itemIndex);

        const updatedFavorites =
          itemIndex !== -1
            ? hotelData.filter((hotel) => hotel.id !== id) // Remove from favorite
            : [
                ...hotelData,
                {
                  id,
                  name,
                  img,
                  rating,
                  pricePerNight,
                  totalPrice,
                  amenitie1,
                  amenitie2,
                  amenitie3,
                  hotelstar,
                  nearby,
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

  const toggleCart = async (id, name, img, rating, pricePerNight, totalPrice, amenities, nearby) => {
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
            : [...cartData, { id, name, img, rating, pricePerNight, totalPrice, amenities, nearby }]; // Add to cart

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
    <div className="">
      <p>My Cart</p>

      <ul className="hotel-cards">
        {cart.map &&
          cart?.map((hotel) => (
            <HotelCard
              name={hotel.name}
              img={hotel.img}
              rating={hotel.rating}
              pricePerNight={hotel.pricePerNight}
              totalPrice={hotel.totalPrice}
              // amenitie1={amenitie1}
              // amenitie2={amenitie2}
              // amenitie3={amenitie3}
              // hotelstar={hotelstar}
              key={hotel.id}
              id={hotel.id}
              toggleFavorite={toggleFavorite}
              toggleCart={toggleCart}
              nearby={hotel.nearby || "No nearby places"}
              hideFavoriteBtn={true}
              isInCart={true}
            />
          ))}
      </ul>
    </div>
  );
}
