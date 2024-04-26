import background from "./img/maldives-live-photo.gif";

function Aboutus() {
  return (
    <div>
      <Banner />
      <Grid />
      <Block />
    </div>
  );
}
function Banner() {
  return (
    <div>
      <div
        className="h-[550px] w-auto bg-cover mx-0 z-10 border shadow-lg rounded-bl-[60px]"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
        }}
      >
        <p className="flex items-center justify-center font-semibold text-white text-5xl lg:text-6xl mt-60">
          About HOTERU
        </p>
        <div className="flex justify-center">
          <Content />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="border mx-10 lg:mx-32 p-10 lg:px-20 shadow-lg rounded-xl absolute top-[450px]  bg-white">
      <p className="flex items-center text-4xl mb-4">See The World For Less</p>
      <span className="m-0">
        HOTERU is an online travel platform that brings high-value and rewarding travel experiences to people all over
        the world through the HOTERU app and HOTERU website. Our mission is to empower everyone to be a traveler by
        offering affordable deals on hotels, flights, activities, and more, with an HOTERU booking experience that is
        hassle-free from start to finish. Since the HOTERU company was founded in 2024, we’ve made searching and booking
        travel as easy and stress-free as it should be.
      </span>
      <p className="flex items-center text-4xl mb-4 mt-4">Visitor Numbers</p>
      <p>
        In accordance with HOTERU.com obligations under the EU’s Digital Services Act (DSA), we estimate that the
        average monthly recipients* of the HOTERU.com service in the European Union from 1 February 2023 up to and
        including 31 July2023, is well below 45 million.
      </p>

      <p className="flex items-end mt-8">
        Please refer to the website for metrics we consider relevant to HOTERU.com’s business.
      </p>
    </div>
  );
}

function Grid() {
  return (
    <div className=" bg-white flex flex-row md:mx-4 lg:mx-0 justify-center mt-[520px] md:mt-[380px] lg:mt-[360px]">
      <div className="flex flex-col gap-10 lg:gap-12 md:grid grid-cols-2 ">
        <div className="lg:h-[116px] text-[3rem] lg:text-[48px] font-agoda-sans-stemless text-[#2D3748]  lg:pt-[46px] lg:mb-[55px] leading-[58px] font-normal flex items-center rounded-2xl bg-[#fff] lg:mx-0">
          <p>
            A bit more <br />
            about us...
          </p>
        </div>
        <div
          class=" rounded-2xl h-[450px] w-[450px] bg-no-repeat bg-[#5ea9b3] row-span-2"
          style={{
            backgroundImage: `url(https://www.agoda.com/wp-content/uploads/2022/03/beach-house2-2x.png)`,
            backgroundSize: "contain",
            backgroundPositionY: "200px",
          }}
        >
          <div class="px-10 pt-8">
            <p className="text-white">What exactly does HOTERU offer?</p>
            <p className="text-white text-3xl mt-6">Hotels, villas, and more—at affordable prices</p>
          </div>
        </div>
        <div
          class=" rounded-2xl  h-[450px] w-[450px]  bg-no-repeat bg-[#5ea9b3] row-span-2"
          style={{
            backgroundImage: `url(https://www.agoda.com/wp-content/themes/agoda-travel-guides/resources/about-agoda-v2//assets/images/card8-image.png`,
            backgroundSize: "contain",
            backgroundPositionY: "120px",
          }}
        >
          <div class="px-10 pt-8">
            <p className="text-white">Can I have an HOTERU career?</p>
            <p className="text-white text-3xl mt-6">Discover how to join our team</p>
          </div>
        </div>

        <div
          class=" rounded-2xl  h-[450px] w-[450px] bg-no-repeat bg-[#5ea9b3] row-span-2"
          style={{
            backgroundImage: `url(https://www.agoda.com/wp-content/uploads/2023/06/traveler-card-1-4.png)`,
            backgroundSize: "contain",
            backgroundPositionY: "80px",
          }}
        >
          <div class="px-10 pt-8">
            <p className="text-white">Why should I choose HOTERU?</p>
            <p className="text-white text-3xl mt-6">Created for travelers, by travelers</p>
          </div>
        </div>

        <div
          class=" rounded-2xl  h-[450px] w-[450px]  bg-no-repeat bg-[#5ea9b3] row-span-2"
          style={{
            backgroundImage: `url(https://www.agoda.com/wp-content/uploads/2022/03/truly-global-2x.png)`,
            backgroundSize: "contain",
            backgroundPositionY: "200px",
          }}
        >
          <div class="px-10 pt-8">
            <p className="text-white">Who is working for HOTERU?</p>
            <p className="text-white text-3xl mt-6">Meet our talented team</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Block() {
  return (
    <div className="mt-20">
      <section className="bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
          <a
            href="#"
            className="inline-flex justify-between items-center py-1 px-2 pe-4 mb-7 text-sm hover:text-[#426c73] hover:bg-[#e2f8fb] rounded-full bg-[#92C7CF] text-white"
          >
            <svg
              className="w-6 h-6 text-[#f3de56] dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.133 12.632v-1.8a5.407 5.407 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.933.933 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Zm-13.267-.8a1 1 0 0 1-1-1 9.424 9.424 0 0 1 2.517-6.391A1.001 1.001 0 1 1 6.854 5.8a7.43 7.43 0 0 0-1.988 5.037 1 1 0 0 1-1 .995Zm16.268 0a1 1 0 0 1-1-1A7.431 7.431 0 0 0 17.146 5.8a1 1 0 0 1 1.471-1.354 9.424 9.424 0 0 1 2.517 6.391 1 1 0 0 1-1 .995ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
            </svg>
            <span className="text-sm font-medium py-1 px-3">Our Membership Program was launched! See what's new</span>
            <svg
              className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 lg:text-5xl  dark:text-white">
            Stay up to date with us!{" "}
          </h1>
          <p className="mb-8 text-l font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
            Subscribe to our newsletter and be the first to know about the latest hotel deals, travel tips, and
            exclusive offers.
          </p>
          <form className="w-full max-w-md mx-auto">
            <label for="default-email" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Email sign-up
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-x-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="email"
                id="default-email"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-[#426c73] focus:border-[#426c73] dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your email here..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-[#92C7CF] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
export { Aboutus, Block };
