import { useEffect, useState } from "react";
import { db } from "./firebase";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { HotelCard } from "./HotelCard";
import { SearchFunction, SortFunction } from "./mycomponents";
import { FilterFunction } from "./mycomponents";
import LoadingGif from "./img/loading.gif";

export default function Results({
  hotelData,
  setHotelData,
  originalHotelData,
  setOriginalHotelData,
  favorites,
  setFavorites,
  cart,
  setCart,
  getUserData,
  loading,
  isLoading,
}) {
  useAuth();
  return (
    <div>
      <div className="w-auto mx-10 md:flex mt-10 justify-center">
        <FilterFunction hotelData={hotelData} setHotelData={setHotelData} originalHotelData={originalHotelData} />

        <ResultsLists
          hotelData={hotelData}
          favorites={favorites}
          setFavorites={setFavorites}
          cart={cart}
          setCart={setCart}
          getUserData={getUserData}
          setHotelData={setHotelData}
          originalHotelData={originalHotelData}
          loading={loading}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

const auth = getAuth();
const user = auth.currentUser;

function ResultsFilters() {
  return (
    <div className="results-filters mx-4 mt-10 hidden lg:block">
      <p>Result Filters</p>
      <div className="filter-price">price</div>
      <div className="filter-rating">rating</div>
      <div className="filte-num-guests">num guests</div>
      <div className="property-type">property type</div>
      <div className="others">others (amenities)</div>
    </div>
  );
}

function ResultsLists({
  hotelData,
  setHotelData,
  originalHotelData,
  favorites,
  setFavorites,
  cart,
  setCart,
  getUserData,
  loading,
  isLoading,
}) {
  // const NEARBY = hotel.nearby_places ? hotel.nearby_places[0].name : "No nearby places";

  const { currentUser } = useAuth();
  let userDataRef;
  if (currentUser) {
    userDataRef = collection(db, currentUser.uid);
  } else {
    console.log("No user is currently signed in.");
  }

  useEffect(() => {
    console.log("favorites:", favorites);
    console.log("cart", cart);
  }, [favorites, cart]);

  //   It seems like the issue is with the toggleFavorite function. In the current implementation, you’re checking if the id exists in the existingFavorites array. However, existingFavorites is an array of objects, not just ids. So, existingFavorites.includes(id) will always return false because you’re comparing an object to an id.
  const toggleFavorite = async (id, name, img, rating, pricePerNight, totalPrice, amenities, hotelstar, nearby) => {
    try {
      if (currentUser) {
        const userRef = doc(db, currentUser.uid, "favHotel");
        const userDoc = await getDoc(userRef);
        const FavoritesData = userDoc.data().hotelList || [];

        // Check if the hotel already exists in the favorites
        const hotelInFavorites = FavoritesData.some((hotel) => hotel.id === id);

        const newHotel = {
          id,
          name,
          img,
          rating,
          pricePerNight,
          totalPrice,
          amenities,
          hotelstar,
          nearby,
        };

        if (Object.values(newHotel).includes(undefined)) {
          console.log("One or more fields are undefined:", newHotel);
        } else {
          const updatedFavorites = hotelInFavorites
            ? FavoritesData.filter((hotel) => hotel.id !== id) // Remove from favorites
            : [...FavoritesData, newHotel]; // Add to favorites

          await setDoc(userRef, { hotelList: updatedFavorites });
        }

        getUserData(); // Refresh the state
      } else {
        console.log("User not logged in.");
        alert("Please Login");
      }
    } catch (error) {
      console.log("Error updating favorites:", error);
    }
  };

  const toggleCart = async (id, name, img, rating, pricePerNight, totalPrice, amenities, hotelstar, nearby) => {
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
            : [...cartData, { id, name, img, rating, pricePerNight, totalPrice, amenities, hotelstar, nearby }]; // Add to cart

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
      <SortFunction hotelData={hotelData} originalHotelData={originalHotelData} setHotelData={setHotelData} />
      {hotelData ? "" : <img src={LoadingGif} alt="Loading..." className="mx-auto h-32 w-32 block p-5 m-5" />}
      <ul className="hotel-cards">
        {hotelData &&
          hotelData.properties &&
          hotelData.properties.length &&
          hotelData.properties.map((hotel) => (
            <HotelCard
              name={hotel?.name}
              img={hotel?.images?.[0].thumbnail}
              nearby={hotel?.nearby_places ? hotel.nearby_places?.[0].name : "No nearby places"}
              rating={hotel?.overall_rating * 2 || 9}
              pricePerNight={hotel?.rate_per_night?.extracted_lowest || 999}
              totalPrice={hotel?.total_rate?.extracted_lowest || 999}
              amenities={hotel?.amenities}
              hotelstar={hotel?.extracted_hotel_class || 999}
              key={hotel?.name}
              reviewNumber={hotel?.reviews}
              id={hotel?.property_token}
              isFavorite={favorites.some((e) => e.id === hotel.property_token)}
              isInCart={Array.isArray(cart) && cart.some((item) => item.id === hotel?.property_token)}
              toggleFavorite={toggleFavorite}
              toggleCart={toggleCart}
            />
          ))}
      </ul>
    </div>
  );
}
