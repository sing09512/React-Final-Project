import { useEffect } from "react";

export function HotelCard({
  name,
  img,
  rating,
  reviewNumber,
  pricePerNight,
  totalPrice,
  hotelstar,
  amenities,
  amenitie1,
  amenitie2,
  amenitie3,
  id,
  isFavorite,
  isInCart,
  nearby,
  toggleFavorite,
  toggleCart,
  hideFavoriteBtn,
  hideCartBtn,
}) {
  console.log("ISINCART:", isInCart);

  let roundedRating;
  roundedRating = rating.toFixed(1);
  let ratingtext;
  if (rating >= 9) {
    ratingtext = "Exceptional";
  } else if (rating >= 8) {
    ratingtext = "Excellent";
  } else if (rating >= 7) {
    ratingtext = "Great";
  } else if (rating >= 6) {
    ratingtext = "Good";
  } else {
    ratingtext = "Average";
  }

  return (
    <li
      key={id}
      className="my-10 mx-auto border-gray-300 border shadow-md rounded-xl max-w-4xl flex flex-col justify-center p-4 md:flex-row md:justify-between md:p-0"
    >
      <div className="w-auto mx-auto md:w-50 md:justify-self-start">
        <img src={img} alt="" className="h-full rounded-xl object-cover" />
      </div>
      <div className="w-auto mx-auto border-none p-4 md:border-r md:border-gray-300 md:w-96">
        <div className="text-xl font-bold">{name}</div>
        <div className="mb-1 flex flex-row mt-1">
          {hotelstar >= 1 ? (
            <p>
              <svg
                className="w-4 h-4 lg:w-6 lg:h-6 text-yellow-400 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </p>
          ) : (
            <p>
              <svg
                className="hidden w-6 h-6 text-yellow-400 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </p>
          )}
          {hotelstar >= 2 ? (
            <p>
              <svg
                className="w-4 h-4 lg:w-6 lg:h-6 text-yellow-400 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </p>
          ) : (
            <p>
              <svg
                className="hidden w-6 h-6 text-yellow-400 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </p>
          )}
          {hotelstar >= 3 ? (
            <p>
              <svg
                className="w-4 h-4 lg:w-6 lg:h-6 text-yellow-400 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </p>
          ) : (
            <p>
              <svg
                className="hidden w-6 h-6 text-yellow-400 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </p>
          )}
          {hotelstar >= 4 ? (
            <p>
              <svg
                className="w-4 h-4 lg:w-6 lg:h-6 text-yellow-400 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </p>
          ) : (
            <p>
              <svg
                className="hidden w-6 h-6 text-yellow-400 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </p>
          )}
          {hotelstar >= 5 ? (
            <p>
              <svg
                className="w-4 h-4 lg:w-6 lg:h-6 text-yellow-400 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </p>
          ) : (
            <p>
              <svg
                className="hidden w-6 h-6 text-yellow-400 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
              </svg>
            </p>
          )}
        </div>
        <div className="my-2 text-base text-gray-800 italic hidden lg:block">
          <svg
            className="w-6 h-6 inline text-[#92C7CF] dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
              clipRule="evenodd"
            />
          </svg>
          {nearby}
        </div>

        <div className="mt-2 mb-3 text-sm">
          This property offers:
          <div className="mb-4 mt-1">
            {amenities &&
              amenities.map((e) => (
                <p className="bg-grey-100 hover:bg-[#92C7CF] hover:text-white text-[#426c73] text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-[#92C7CF] mb-1 inline-flex items-center justify-center">
                  {e}
                </p>
              ))}

            {/* <p className="bg-grey-100 hover:bg-[#92C7CF] hover:text-white text-[#426c73] text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-[#92C7CF] inline-flex items-center justify-center">
              {amenitie1}
            </p>
            <p className="bg-grey-100 hover:bg-[#92C7CF] hover:text-white text-[#426c73] text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-[#92C7CF] inline-flex items-center justify-center">
              {amenitie2}
            </p>
            <p className="bg-grey-100 hover:bg-[#92C7CF] hover:text-white text-[#426c73] text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-[#92C7CF] inline-flex items-center justify-center">
              {amenitie3}
            </p> */}
          </div>
        </div>
        <div className="notTailwind-buttonContainer space-x-2">
          {hideFavoriteBtn || (
            <button
              className="bg-[#92C7CF] px-2 py-1 rounded-xl text-sm text-gray-700 mb-1"
              onClick={() =>
                toggleFavorite(id, name, img, rating, pricePerNight, totalPrice, amenities, hotelstar, nearby)
              }
            >
              {isFavorite ? (
                <svg
                  className="inline mr-1 w-4 h-4 text-gray-600 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="mr-1 inline w-5 h-5 text-red-500 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                </svg>
              )}
              {isFavorite ? "Remove Favorite" : "Save as Favorite"}
            </button>
          )}
          {hideCartBtn || (
            <button
              className="bg-[#92C7CF] px-2 py-1 rounded-xl text-sm text-gray-700"
              onClick={() => toggleCart(id, name, img, rating, pricePerNight, totalPrice, amenities, hotelstar, nearby)}
            >
              {isInCart ? (
                <svg
                  className="inline mr-1 w-4 h-4 text-gray-600 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 inline text-gray-800 dark:text-white"
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
              )}
              {isInCart ? "Remove Cart" : "Add to Cart "}
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-row text-right justify-between w-auto min-w-48 md:flex-col md:justify-end md:align-bottom md:min-w-56 md:border-l">
        <div className="flex w-auto justify-center md:justify-end items-center ml-6 lg:ml-12 mr-4 mt-4">
          <div className="flex  items-center justify-center rounded-full bg-[#75bdc8] w-10 h-10 lg:w-12 lg:h-12">
            <p className=" text-white text-lg font-bold">{roundedRating}</p>
          </div>
          <div className="ml-4 mb-2 md:mb-0">
            <p className="text-black font-bold">{ratingtext}</p>
            <p className="text-gray-500 text-[12px]">{reviewNumber} reviews</p>
          </div>
        </div>
        <div className="w-full h-full mb-4 px-4 self-center flex flex-col justify-center md:justify-end ">
          <div className="text-[9px]  text-gray-500">Per night before taxes and fees</div>
          <div className="text-gray-700 mb-4">HKD {pricePerNight}</div>
          <div className="text-[14px] text-bold  text-gray-900">Total</div>
          <div className="text-2xl text-bold ">HKD {totalPrice}</div>
        </div>
      </div>
    </li>
  );
}
