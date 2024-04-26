import React, { useState } from "react";
import { addDoc, collection, doc, getDocs, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

const PaymentPage = ({ cart, setCart, total }) => {
  const navigate = useNavigate();

  let sum = 0;
  total.forEach((num) => {
    sum += num;
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const handleInputChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const { currentUser } = useAuth();

  const transferCartToRecList = async () => {
    try {
      console.log(currentUser);
      if (currentUser) {
        const userId = currentUser.uid;
        const userRef = doc(db, userId, "cart");
        const userDoc = await getDoc(userRef);

        const cartData = userDoc.data().cartList || [];
        console.log(cartData);

        if (cartData.length > 0) {
          const orderRecord = {
            items: cartData,
            createdAt: serverTimestamp(),
          };
          const recListRef = doc(db, userId, "rec");
          await setDoc(recListRef, orderRecord);
        }
      }
    } catch (error) {
      console.error("There was an error transferring the cart data to the records:", error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(paymentDetails);
    alert("Payment submitted");
    await transferCartToRecList();
    const clearCart = async () => {
      try {
        if (currentUser) {
          const userRef = doc(db, currentUser.uid, "cart");

          await setDoc(userRef, { cartList: [] });
          setCart([]);
          console.log("Cart has been cleared");
        }
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
      navigate("/orderrecord");
    };
    await clearCart();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="inline-block mt-10 mx-auto w-full text-center text-2xl">Total: {sum}</div>
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
              Card Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cardNumber"
              type="text"
              placeholder="1234 1234 1234 1234"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
              Expiry Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              name="expiryDate"
              value={paymentDetails.expiryDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
              CVV
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="cvv"
              type="text"
              placeholder="CVV"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardName">
              Cardholder's Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cardName"
              type="text"
              placeholder="Name on card"
              name="cardName"
              value={paymentDetails.cardName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;

// import React, { useState, useEffect } from "react";
// import hotelTest from "./hotelTest.txt";
// import { HotelCard } from "./HotelCard";
// import { Link } from "react-router-dom";

// const PaymentPage = ({ total }) => {
//   let sum = 0;
//   total.forEach((num) => {
//     sum += num;
//   });

//   const [paymentDetails, setPaymentDetails] = useState({
//     cardNumber: "",
//     expiryDate: "",
//     cvv: "",
//     cardName: "",
//   });

//   const handleInputChange = (e) => {
//     setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(paymentDetails);
//     alert("Payment submitted");
//     window.location.href = "/";
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex mt-20">Total: {sum}</div>
//       <div className="w-full max-w-md mx-auto">
//         <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
//               Card Number
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="cardNumber"
//               type="text"
//               placeholder="1234 1234 1234 1234"
//               name="cardNumber"
//               value={paymentDetails.cardNumber}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
//               Expiry Date
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="expiryDate"
//               type="text"
//               placeholder="MM/YY"
//               name="expiryDate"
//               value={paymentDetails.expiryDate}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
//               CVV
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="cvv"
//               type="text"
//               placeholder="CVV"
//               name="cvv"
//               value={paymentDetails.cvv}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardName">
//               Cardholder's Name
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="cardName"
//               type="text"
//               placeholder="Name on card"
//               name="cardName"
//               value={paymentDetails.cardName}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Pay Now
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
