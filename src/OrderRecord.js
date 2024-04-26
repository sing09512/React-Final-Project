import { useEffect, useState } from "react";
import { db } from "./firebase";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { HotelCard } from "./HotelCard";

export default function OrderRecord({ record, setRecord, recTime, setRecTime, getUserData }) {
  console.log("ORDER RECORD:", record);

  return (
    <div className="mx-6">
      <p className="text-center text-3xl font-bold m-5 mt-7">Order Record</p>
      <ul className="hotel-cards">
        {record?.map((hotel) => (
          <HotelCard
            name={hotel.name}
            img={hotel.img}
            rating={hotel.rating}
            pricePerNight={hotel.pricePerNight}
            totalPrice={hotel.totalPrice}
            amenities={hotel.amenities}
            key={hotel.id}
            id={hotel.id}
            // toggleFavorite={toggleFavorite}
            // toggleCart={toggleCart}
            nearby={hotel.nearby || "No nearby places"}
            hideFavoriteBtn={true}
            hideCartBtn={true}
          />
        )) || "No previous record"}
      </ul>
    </div>
  );
}
