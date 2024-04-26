import { useEffect, useState } from "react";
import { db } from "./firebase";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { updateDoc } from "firebase/firestore";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const { currentUser } = useAuth();

  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [currency, setCurrency] = useState("");

  let userDataRef;
  if (currentUser) {
    userDataRef = collection(db, currentUser.uid);
  } else {
    console.log("No user is currently signed in.");
  }

  const getProfileData = async () => {
    try {
      const userData = await getDocs(userDataRef);
      const filteredUserData = userData.docs.map((doc) => doc.data());
      const profileData = filteredUserData.find((item) => item.userName);
      console.log(profileData);

      setName(profileData.userName);
      setBirthday(profileData.birthday);
      setGender(profileData.gender);
      setPhoneNum(profileData.phoneNum);
      setCurrency(profileData.currency);
    } catch (error) {
      console.log("get profile error:", error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className=" bg-[#f9f9f9]">
      <p className="text-2xl lg:text-3xl mx-20 lg:mx-60 pt-4">User Details</p>

      {isEditing ? (
        <EditProfile
          name={name}
          setName={setName}
          birthday={birthday}
          setBirthday={setBirthday}
          gender={gender}
          setGender={setGender}
          phoneNum={phoneNum}
          setPhoneNum={setPhoneNum}
          currency={currency}
          setCurrency={setCurrency}
          setIsEditing={setIsEditing}
        />
      ) : (
        <ProfileInfo
          name={name}
          setName={setName}
          birthday={birthday}
          setBirthday={setBirthday}
          gender={gender}
          setGender={setGender}
          phoneNum={phoneNum}
          setPhoneNum={setPhoneNum}
          currency={currency}
          setCurrency={setCurrency}
        />
      )}
      <div className="flex justify-end">
        <button className="font-bold mx-20 lg:mx-60 mb-10 bg-[#abd7d9] rounded-lg py-1 px-2 w-28" onClick={toggleEdit}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
}

function ProfileInfo({ name, birthday, gender, currency, phoneNum }) {
  return (
    <div className="flex flex-col my-4 mx-20 lg:mx-60">
      <div className="my-4 px-20 p-10 py-8 shadow-md rounded-lg flex flex-row justify-between">
        <p className="font-semibold">
          <svg
            className="inline mr-3"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#abd7d9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
            <circle cx="12" cy="10" r="3" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          Name
        </p>
        <p>{name}</p>
      </div>

      <div className="bg-white my-4 px-20 p-10 py-6 shadow-md rounded-lg flex flex-row justify-between">
        <p className="font-semibold">
          <svg
            className="inline mr-3"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#abd7d9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Birthay
        </p>
        <p>{birthday}</p>
      </div>

      <div className="bg-white my-4 px-20 p-10 py-6 shadow-md rounded-lg flex flex-row justify-between">
        <p className="font-semibold">
          <svg
            className="inline mr-3"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#abd7d9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3.8 3.8l16.4 16.4M20.2 3.8L3.8 20.2M15 3h6v6M9 3H3v6M15 21h6v-6M9 21H3v-6" />
          </svg>
          Gender
        </p>
        <p>{gender}</p>
      </div>

      <div className="bg-white my-4 px-20 p-10 py-6 shadow-md rounded-lg flex flex-row justify-between">
        <p className="font-semibold">
          <svg
            className="inline mr-3"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#abd7d9"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          Phone Number
        </p>
        <p>{phoneNum}</p>
      </div>

      <div className="bg-white my-4 px-20 p-10 py-6 shadow-md rounded-lg flex flex-row justify-between">
        <p className="font-semibold">
          <svg
            className="inline mr-3"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#abd7d9"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          Prefered Currency
        </p>
        <p>{currency}</p>
      </div>
    </div>
  );
}

function EditProfile({
  name,
  setName,
  birthday,
  setBirthday,
  gender,
  setGender,
  phoneNum,
  setPhoneNum,
  currency,
  setCurrency,
  setIsEditing,
}) {
  const { currentUser } = useAuth();
  let userDataRef;
  if (currentUser) {
    userDataRef = doc(db, currentUser.uid, "userInfo");
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(userDataRef, {
        userName: name,
        birthday: birthday,
        gender: gender,
        phoneNum: phoneNum,
        currency: currency,
      });
      console.log("Profile updated successfully");
      setIsEditing(false); // close the EditProfile form after successful update
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="flex flex-col mx-20 lg:mx-60">
      <label className=" px-20 my-4 p-10 py-6 shadow-md rounded-lg flex flex-row justify-between ">
        <p className="font-semibold mt-2">
          <svg
            className="inline mr-3"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#abd7d9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
            <circle cx="12" cy="10" r="3" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          Name
        </p>
        <input className="w-60 rounded-lg" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="bg-white px-20 my-4 p-10 py-6 shadow-md rounded-lg flex flex-row justify-between">
        <p className="font-semibold mt-2">
          <svg
            className="inline mr-3"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#abd7d9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Birthday
        </p>
        <input className="w-60 rounded-lg" type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
      </label>
      <label className="bg-white px-20 my-4 p-10 py-6 shadow-md rounded-lg flex flex-row justify-between">
        <p className="font-semibold mt-2">
          <svg
            className="inline mr-3"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#abd7d9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3.8 3.8l16.4 16.4M20.2 3.8L3.8 20.2M15 3h6v6M9 3H3v6M15 21h6v-6M9 21H3v-6" />
          </svg>
          Gender
        </p>
        <select className="w-60 rounded-lg" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label className="bg-white px-20 my-4 p-10 py-6 shadow-md rounded-lg flex flex-row justify-between">
        <p className="font-semibold mt-2">
          <svg
            className="inline mr-3"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#abd7d9"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          Phone Number
        </p>
        <input className="w-60 rounded-lg" type="tel" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} />
      </label>
      <label className="bg-white px-20 my-4 p-10 py-6 shadow-md rounded-lg flex flex-row justify-between">
        <p className="font-semibold mt-2">
          <svg
            className="inline mr-3"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#abd7d9"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          Preferred Currency
        </p>
        <input className="w-60 rounded-lg" type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} />
      </label>
      <div className="flex justify-end mb-4 ">
        <button className="bg-[#abd7d9] font-bold rounded-lg py-1 px-2 w-36" type="submit">
          Update Profile
        </button>
      </div>
    </form>
  );
}

// function EditProfile(getProfileData) {
//   const { currentUser } = useAuth();
//   const [name, setName] = useState("");
//   const [birthday, setBirthday] = useState("");
//   const [gender, setGender] = useState("");
//   const [phoneNum, setPhoneNum] = useState("");
//   const [currency, setCurrency] = useState("");

//   const updateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       await setDoc(doc(db, currentUser.uid, "userInfo"), {
//         userName: name,
//         birthday: birthday,
//         gender: gender,
//         phoneNum: phoneNum,
//         currency: currency,
//       });
//       console.log("Profile updated");
//       getProfileData();
//     } catch (error) {
//       console.error("Error updating profile: ", error);
//     }
//   };

//   return (
//     <form onSubmit={updateProfile}>
//       <label>
//         Name:
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//       </label>
//       <label>
//         Birthday:
//         <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
//       </label>
//       <label>
//         Gender:
//         <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
//       </label>
//       <label>
//         Phone Number:
//         <input type="tel" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} />
//       </label>
//       <label>
//         Preferred Currency:
//         <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} />
//       </label>
//       <button type="submit">Update Profile</button>
//     </form>
//   );
// }
