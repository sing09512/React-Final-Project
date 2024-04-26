import React from "react";
import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth, AuthProvider } from "./AuthContext";
import { db, auth } from "./firebase";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { SearchFunction, SortFunction } from "./mycomponents";
import { useContext, createContext } from "react";
import { Chatbot } from "react-chatbot-kit";
import hotelTest from "./hotelTest.txt";
import Results from "./Results";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUp";
import { Aboutus } from "./About";
import Home from "./Home";
import Blog from "./Blog";
import Contactus from "./Contact";
import "./index.css";
import Cart from "./Cart";
import Favorites from "./Favorites";
import OrderRecord from "./OrderRecord";
import Profile from "./Profile";
import PaymentPage from "./payment";
import "./App.css";
import Activities from "./Activities";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import "./App.css";
import hamburger from "./img/hamburger.png";

function App() {
  const { currentUser } = useAuth();

  const [showBot, toggleBot] = useState(false);
  const [messageHistory, setMessageHistory] = useState([]);

  const [hotelData, setHotelData] = useState(null);
  const [originalHotelData, setOriginalHotelData] = useState(null);

  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState([]);

  const [record, setRecord] = useState([]);
  const [recTime, setRecTime] = useState(0);

  // async function getHotelData() {
  //   try {
  //     const res = await fetch(hotelTest);
  //     const data = await res.json();
  //     setHotelData(data.properties);
  //   } catch (error) {
  //     console.error("Failed to fetch hotel data:", error);
  //   }
  // }
  // useEffect(() => {
  //   getHotelData();
  // }, []);

  const [loading, setLoading] = useState(true);

  let userDataRef;
  if (currentUser) {
    userDataRef = collection(db, currentUser.uid);
  } else {
    console.log("No user is currently signed in.");
  }

  const getUserData = async () => {
    try {
      const userData = await getDocs(userDataRef);

      const filteredUserData = userData.docs.map((doc) => doc.data());

      const userFavorites = filteredUserData.find((item) => item.hotelList)?.hotelList;
      setFavorites(userFavorites);

      const userCart = filteredUserData.find((item) => item.cartList)?.cartList;
      setCart(userCart);
      setTotal(userCart.map((e) => e.totalPrice));

      const userRec = filteredUserData.find((item) => item.items)?.items;
      setRecord(userRec);

      setLoading(false);
    } catch (error) {
      console.log("fetch user data error", error);
    }
  };

  useEffect(() => {
    console.log("favorites:", favorites);
    console.log("cart", cart);
    console.log("total array :", total);
  }, [favorites, cart, total]);

  useEffect(() => {
    getUserData();
  }, []);

  // sing's chatbot start
  useEffect(() => {
    const messages = localStorage.getItem("chat_messages");
    if (messages) {
      setMessageHistory(JSON.parse(messages));
    }
  }, []);

  const saveMessages = (messages, HTMLString) => {
    try {
      localStorage.setItem("chat_messages", JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save messages:", error);
    }
  };
  const handleToggleBot = () => {
    toggleBot(!showBot);
  };
  // sing's chatbot end

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="">
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  hotelData={hotelData}
                  setHotelData={setHotelData}
                  originalHotelData={originalHotelData}
                  setOriginalHotelData={setOriginalHotelData}
                />
              }
            >
              <Route
                index
                element={
                  <Home
                    hotelData={hotelData}
                    setHotelData={setHotelData}
                    originalHotelData={originalHotelData}
                    setOriginalHotelData={setOriginalHotelData}
                  />
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route
                path="/results"
                element={
                  <Results
                    hotelData={hotelData}
                    setHotelData={setHotelData}
                    originalHotelData={originalHotelData}
                    setOriginalHotelData={setOriginalHotelData}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    cart={cart}
                    setCart={setCart}
                    getUserData={getUserData}
                    loading={loading}
                    setLoading={setLoading}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <Favorites
                    favorites={favorites}
                    setFavorites={setFavorites}
                    cart={cart}
                    setCart={setCart}
                    getUserData={getUserData}
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <Cart
                    favorites={favorites}
                    setFavorites={setFavorites}
                    cart={cart}
                    setCart={setCart}
                    getUserData={getUserData}
                    total={total}
                    setTotal={setTotal}
                  />
                }
              />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contactus />} />
              <Route
                path="/orderrecord"
                element={
                  <OrderRecord
                    getUserData={getUserData}
                    record={record}
                    setRecord={setRecord}
                    recTime={recTime}
                    setRecTime={setRecTime}
                  />
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payment" element={<PaymentPage cart={cart} setCart={setCart} total={total} />} />
              <Route path="/activities" element={<Activities />} />
            </Route>
          </Routes>
        </div>
        <div className="App singChatbot">
          <header className="App-header">
            <button
              className="toggle-bot-btn"
              onClick={handleToggleBot}
              aria-label={showBot ? "Close chatbot" : "Open chatbot"}
            >
              {showBot ? "🔽" : "💬"}
            </button>
            {showBot && (
              <div className={"chatbot-container " + (showBot ? "fade-in" : "fade-out")}>
                <Chatbot
                  config={config}
                  messageParser={MessageParser}
                  actionProvider={ActionProvider}
                  // messageHistory={messageHistory}
                  // saveMessages={saveMessages}
                />
              </div>
            )}
          </header>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
export default App;

function Footer() {
  return (
    <footer className="bg-[#AAD7D9] dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 ">
        <div className="flex justify-between">
          <div className="mb-6">
            <a href="https://flowbite.com/" className="flex items-center">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 me-3" alt="FlowBite Logo" /> */}
              <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">HOTERU</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="https://flowbite.com/" className="hover:underline">
                    About us
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="hover:underline">
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="https://github.com/themesberg/flowbite" className="hover:underline ">
                    Github
                  </a>
                </li>
                <li>
                  <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <a href="https://flowbite.com/" class="hover:underline">
              HOTERU™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a href="#" className="text-white hover:text-gray-900">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
              </svg>
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-white hover:text-gray-900 dark:hover:text-white ms-5">
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fill-rule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="text-white hover:text-gray-900 ms-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                <path d="M12.04 3.5c.59 0 7.54.02 9.34.5a3.02 3.02 0 0 1 2.12 2.15C24 8.05 24 12 24 12v.04c0 .43-.03 4.03-.5 5.8A3.02 3.02 0 0 1 21.38 20c-1.76.48-8.45.5-9.3.51h-.17c-.85 0-7.54-.03-9.29-.5A3.02 3.02 0 0 1 .5 17.84c-.42-1.61-.49-4.7-.5-5.6v-.5c.01-.9.08-3.99.5-5.6a3.02 3.02 0 0 1 2.12-2.14c1.8-.49 8.75-.51 9.34-.51zM9.54 8.4v7.18L15.82 12 9.54 8.41z" />
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Layout({ hotelData, setHotelData, originalHotelData, setOriginalHotelData }) {
  const memberBoxRef = useRef();
  const [openMemberBox, setOpenMemberBox] = useState(false);
  const [openHamburger, setOpenHamburger] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser } = useAuth();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close the MemberBox when the user navigates to a different page
  // Close the MemberBox when the user navigates to a different page
  useEffect(() => {
    setOpenMemberBox(false);
  }, [location]);

  const handleClickOutside = (event) => {
    if (memberBoxRef.current && !memberBoxRef.current.contains(event.target)) {
      setOpenMemberBox(false);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <header className="flex justify-between shadow-md px-8 py-4 md:px-10">
        <div className="notTailwind-left">
          <Link to="/" className="text-3xl pt-1 md:text-4xl md:pt-0 font-bold">
            HOTERU
          </Link>
        </div>

        <div className="flex">
          <nav className="hidden md:flex items-center">
            <div className="notTailwind-links text-xl space-x-8 sm:mr-1 mr-8 ">
              <Link to="/about" className="hover:text-[#568991]">
                About
              </Link>
              <Link to="./activities" className="hover:text-[#568991]">
                Activities
              </Link>
              <Link to="/blog" className="hover:text-[#568991]">
                Blog
              </Link>
              <Link to="/contact" className="hover:text-[#568991]">
                Contact
              </Link>
              {/* <Link to="/results" className="hover:text-[#568991] ">
                  Results
                </Link> */}

              {!currentUser && (
                <div className="inline">
                  <Link
                    to={"/login"}
                    className="mr-4 bg-[#75bdc8] hover:bg-[#568991] text-white py-1 px-2 rounded font-bold focus:outline-none focus:shadow-outline"
                  >
                    Log In
                  </Link>
                  <Link
                    to={"/signup"}
                    className="border-[#75bdc8] border-[2px] bg-white  hover:bg-[#568991] hover:text-white font-semibold text-black py-[2px] px-1 rounded focus:outline-none focus:shadow-outline"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
          <div className="mostRight-container flex items-center">
            {currentUser && (
              <div className="mostRight-left notTailwind-memberContainer inline-block relative">
                <img
                  src="https://picsum.photos/200/200"
                  alt=""
                  className="notTailwind-avator inline rounded-full w-10 h-10 ml-4 md:w-12 md:h-12"
                  onClick={() => setOpenMemberBox((e) => !e)}
                />
                <div ref={memberBoxRef}>
                  <MemberBox openMemberBox={openMemberBox} />
                </div>
              </div>
            )}
            {!currentUser && (
              <div className="inline md:hidden">
                <Link
                  to={"/login"}
                  className="mr-4 bg-[#75bdc8] hover:bg-[#568991] text-white py-1 px-2 rounded font-bold focus:outline-none focus:shadow-outline"
                >
                  Log In
                </Link>
                <Link
                  to={"/signup"}
                  className="border-[#75bdc8] border-[2px] bg-white  hover:bg-[#568991] hover:text-white font-semibold text-black py-[2px] px-1 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <button className="mostRight-right ml-4 md:hidden" onClick={() => setOpenHamburger(true)}>
              <img src={hamburger} alt="menu" className="h-8" />
            </button>
            {openHamburger && <Hamburger onOpenHamburger={setOpenHamburger} />}
          </div>
        </div>
      </header>
      <div className="w-full mx-auto">
        <SearchFunction
          hotelData={hotelData}
          setHotelData={setHotelData}
          originalHotelData={originalHotelData}
          setOriginalHotelData={setOriginalHotelData}
        />
      </div>
      <Outlet />
    </div>
  );
}

function MemberBox({ openMemberBox }) {
  let navigate = useNavigate();
  const { currentUser } = useAuth();
  const [currentUserName, setCurrentUserName] = useState("");

  useEffect(() => {
    async function fetchUserName(docID) {
      if (!currentUser) return; // Exit early if there's no user

      const uid = currentUser.uid;
      const docRef = doc(db, uid, docID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return docSnap.data().userName;
      } else {
        console.log("No such doc.");
        return null;
      }
    }

    fetchUserName("userInfo").then((fetchedUserName) => {
      setCurrentUserName(fetchedUserName || "Unknown");
    });
  }, [currentUser]); // Depend on currentUser, which should be stable

  const handleSignOut = async () => {
    try {
      const auth = getAuth();

      await signOut(auth);
      console.log("User signed out successfully");
      navigate("/"); // Redirect to login page after sign out
    } catch (error) {
      console.error("Sign out error:", error.message);
      // Handle errors here, such as displaying a notification
    }
  };
  return (
    <div>
      {openMemberBox && (
        <div className="right-[-30px] w-52 absolute top-12  z-50">
          <ul className=" space-y-4 flex flex-col  bg-white p-4 rounded-xl">
            <li>Welcome, {currentUserName}</li>
            <li>
              <Link to="/cart">
                <svg
                  className="w-6 h-6 inline text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"
                    clip-rule="evenodd"
                  />
                </svg>
                My Cart
              </Link>
            </li>
            <li>
              <Link to="/favorites">
                <svg
                  className="w-6 h-6 text-red-500 inline dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                </svg>
                Favorites
              </Link>
            </li>
            <Link to="/orderrecord">
              <svg
                className="w-6 h-6 text-gray-800 inline dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.617 2.076a1 1 0 0 1 1.09.217L8 3.586l1.293-1.293a1 1 0 0 1 1.414 0L12 3.586l1.293-1.293a1 1 0 0 1 1.414 0L16 3.586l1.293-1.293A1 1 0 0 1 19 3v18a1 1 0 0 1-1.707.707L16 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L12 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L8 20.414l-1.293 1.293A1 1 0 0 1 5 21V3a1 1 0 0 1 .617-.924ZM9 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                  clip-rule="evenodd"
                />
              </svg>
              Order Record
            </Link>
            <Link to="/profile">
              <svg
                className="w-6 h-6 inline text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                  clip-rule="evenodd"
                />
              </svg>
              Edit Profile
            </Link>
            <li>
              {currentUser && (
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign Out
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function Hamburger({ openHamburger, onOpenHamburger }) {
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className="fixed inset-y-0 right-0 flex flex-col bg-black opacity-90 w-screen h-screen overflow-auto z-40 "></div>
      <div className="fixed inset-y-0 right-0 flex flex-col bg-white w-2/3 h-screen overflow-auto z-50 ">
        <nav className="flex flex-col justify-evenly text-3xl p-10 h-[80%] w-full">
          <Link to="/" className="hover:text-[#568991]" onClick={() => onOpenHamburger(false)}>
            Home
          </Link>
          <Link to="/about" className="hover:text-[#568991]" onClick={() => onOpenHamburger(false)}>
            About
          </Link>
          <Link to="./activities" className="hover:text-[#568991]" onClick={() => onOpenHamburger(false)}>
            Activities
          </Link>
          <Link to="/blog" className="hover:text-[#568991]" onClick={() => onOpenHamburger(false)}>
            Blog
          </Link>
          <Link to="/contact" className="hover:text-[#568991]" onClick={() => onOpenHamburger(false)}>
            Contact
          </Link>
        </nav>
        <button
          class="absolute cursor-pointer text-gray-600 top-0 w-8 h-8 flex items-center justify-center right-0 mt-5 mr-5"
          onClick={() => onOpenHamburger(false)}
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
