import { useEffect, useState } from "react";
import { db } from "./firebase";
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDocs, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";
import { Card } from "flowbite-react";
import { Block } from "./About";

function Blog() {
  return (
    <div className="">
      <Banner />
      <BlogInfo />
      <Block />
    </div>
  );
}

function BlogInfo() {
  const blogDataRef = collection(db, "Blog");
  const [blog, setBlog] = useState([]);

  const getblogData = async () => {
    try {
      const blogData = await getDocs(blogDataRef);
      const filteredBlogData = blogData.docs.map((doc) => doc.data());
      setBlog(filteredBlogData);
      console.log("blog:", filteredBlogData);
    } catch (error) {
      console.log("fetch user data error", error);
    }
  };

  useEffect(() => {
    getblogData();
  }, []);
  return (
    <div className="mx-10 lg:mx-10 xl:mx-24 ">
      <p className="mt-12 text-4xl font-bold my-8 ">What's New?</p>
      <div className=" grid grid-cols-1 md:mx-1 md:grid-cols-4 lg:grid-cols-6 gap-8	lg:gap-10 lg:mx-4">
        <>
          {blog &&
            blog.map((blog) => (
              <BlogCard
                title={blog.title}
                content={blog.info}
                image={blog.image}
                author={blog.author}
                authicon={blog.authicon}
              />
            ))}
        </>
      </div>
    </div>
  );
}
export default Blog;

function Banner() {
  return (
    <div
      className="h-[300px] md:h-[450px] lg:h-[500px] w-auto bg-cover mx-0 z-10 border shadow-lg rounded-[40px] flex justify-center items-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url('https://www.photocircle.net/public/uploads/photos/thumbnail_1000x1000/76166-Urlaub-auf-einer-tropischen-Insel-auf-den-Malediven--by-jan-becke.webp')`,
        backgroundSize: "cover",
      }}
    >
      <p className="  text-white  text-4xl lg:text-5xl font-semibold ">Travels tips for you</p>
    </div>
  );
}

function BlogCard({ title, content, image, author, authicon, update }) {
  return (
    <div
      className="first:lg:col-span-6 first:lg:col-start-1 first:md:col-span-4 first:mb-10 first:lg:h-auto
    lg:col-span-3 md:col-span-2"
    >
      <div className="mx-auto bg-white rounded-xl shadow-md h-full">
        <div className="w-auto">
          <div className="md:shrink-0">
            <img className=" w-full object-cover" src={image} alt="blogcover" />
          </div>
          <div className="p-10 mb-2">
            <div className="text-right tracking-wide text-sm lg:text-base text-indigo-500 font-semibold">
              <img className="h-8 w-8 lg:w-10 lg:h-10 inline mr-2 rounded-full" src={authicon} alt="authicon" />
              {author}
            </div>
            <a
              href="#"
              className="block mt-1 text-lg md:text-2xl lg:text-3xl leading-tight font-medium text-black hover:underline"
            >
              {title}
            </a>
            <p className="mt-2 text-slate-500">{content}.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
