import { useEffect, useState } from "react";
import { db } from "./firebase";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { Card } from "flowbite-react";
import { Block } from "./About";
import background from "./img/202393-918066374_small.gif";

function Activities() {
  return (
    <>
      <Banner />
      <ActInfo />
      <Block />
    </>
  );
}

function ActInfo() {
  const actDataRef = collection(db, "Act");
  const [act, setAct] = useState([]);

  const getactData = async () => {
    try {
      const actData = await getDocs(actDataRef);
      const filteredActData = actData.docs.map((doc) => doc.data());
      setAct(filteredActData);
      console.log("act:", filteredActData);
    } catch (error) {
      console.log("fetch user data error", error);
    }
  };

  useEffect(() => {
    getactData();
  }, []);
  return (
    <div className="lg:mx-12 mx-4">
      <p className="text-center mt-12 pl-0 text-4xl font-bold md:text-left md:pl-6">Things to do on your trip</p>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8 mx-8">
        <>
          {act &&
            act.map((act) => (
              <ActCard
                title={act.actName}
                price={act.actFee}
                time={act.actTime}
                image={act.actImg}
                category={act.actCat}
              />
            ))}
        </>
      </div>
    </div>
  );
}
export default Activities;

function Banner() {
  return (
    <div
      className="h-[300px] md:h-[450px] lg:h-[500px] w-auto bg-cover mx-0 z-10 border shadow-lg rounded-b-[40px] flex justify-center items-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${background})`,
        backgroundSize: "cover",
      }}
    >
      <p className="  text-white  text-4xl lg:text-5xl font-semibold ">Find your next adventure</p>
    </div>
  );
}

function ActCard({ title, price, time, image, category }) {
  return (
    <div className="">
      <div className="mx-auto bg-white rounded-xl shadow-md h-full border border-gray-300">
        <div className="w-auto">
          <div className="md:shrink-0">
            <img className="w-full rounded-b	h-72 object-cover" src={image} alt="blogcover" />
          </div>
          <div className="p-8 mb-2">
            <div className=" tracking-wide text-bold lg:text-l text-indigo-500 font-semibold">{category}</div>
            <a
              href="#"
              className="block mt-1 text-lg md:text-xl lg:text-2xl leading-tight font-medium text-black hover:underline"
            >
              {title}
            </a>
            <p className="mt-4 text-right font-bold	 text-xl">
              <span className="text-sm text-slate-500 font-normal	">From </span>HK$ {price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
