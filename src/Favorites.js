import { useEffect, useState } from "react";
import { db } from "./firebase";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { HotelCard } from "./HotelCard";

export default function Favorites({
  favorites,
  setFavorites,
  favoritesId,
  setFavoritesId,
  cart,
  setCart,
  getUserData,
}) {
  const { currentUser } = useAuth();

  if (currentUser) {
    return (
      <div className="mt-10 mx-6">
        <FavoriteList
          favorites={favorites}
          setFavorites={setFavorites}
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

function FavoriteList({ favorites, setFavorites, favoritesId, setFavoritesId, cart, setCart, getUserData }) {
  const { currentUser } = useAuth();
  // const userDataRef = collection(db, currentUser.uid);

  // const getUserData = async () => {
  //   try {
  //     const userData = await getDocs(userDataRef);

  //     const filteredUserData = userData.docs.map((doc) => doc.data());
  //     const userFavorites = filteredUserData.find((item) => item.hotelList)?.hotelList;
  //     console.log("userFavorites:", userFavorites);
  //     setFavorites(userFavorites);
  //     setFavoritesId(userFavorites.map((e) => e.id));

  //     const userCart = filteredUserData.find((item) => item.cartList)?.cartList;
  //     console.log("userCart:", userCart);
  //     setCart(userCart);
  //   } catch (error) {
  //     console.log("fetch user data error", error);
  //   }
  // };

  useEffect(() => {
    console.log("favorites:", favorites);
    console.log("favoritesId:", favoritesId);
    console.log("cart", cart);
  }, [favorites, favoritesId, cart]);

  useEffect(() => {
    getUserData();
  }, []);

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
          : [...existingFavorites, { id, name, img, rating, pricePerNight, totalPrice, amenities, nearby }]; // Add to favorites

        await setDoc(userRef, { hotelList: updatedFavorites });

        getUserData(); // Refresh the state
      } else {
        console.log("User not logged in.");
      }
    } catch (error) {
      console.log("Error updating favorites:", error);
    }
  };

  const toggleCart = async (id, name, img, rating, pricePerNight, totalPrice, amenities, nearby, hotelstar) => {
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
            : [...cartData, { id, name, img, rating, pricePerNight, totalPrice, amenities, nearby, hotelstar }]; // Add to cart

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
      <p className="text-center text-3xl font-bold m-5">Favorites Lists</p>

      <ul className="hotel-cards">
        {favorites?.map((hotel) => (
          <HotelCard
            name={hotel.name}
            img={hotel.img}
            rating={hotel.rating}
            pricePerNight={hotel.pricePerNight}
            totalPrice={hotel.totalPrice}
            amenities={hotel.amenities}
            // amenitie1={hotel.amenitie1}
            // amenitie2={hotel.amenitie2}
            // amenitie3={hotel.amenitie3}
            hotelstar={hotel.hotelstar}
            key={hotel.id}
            id={hotel.id}
            isFavorite={true}
            toggleFavorite={toggleFavorite}
            toggleCart={toggleCart}
            isInCart={cart.some((item) => item.id === hotel.id)}
            nearby={hotel.nearby || "No nearby places"}
            inFavoritesPage={true}
          />
        ))}
      </ul>
    </div>
  );
}
