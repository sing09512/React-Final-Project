import { useState, useEffect } from "react";
import axios from "axios";

const useCountry = (cityName) => {
  const [countryName, setCountryName] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cityName) {
      return;
    }

    const apiKey = process.env.REACT_APP_API_KEY;

    fetch(`https://api.api-ninjas.com/v1/city?name=${cityName}`, {
      headers: {
        "X-Api-Key": apiKey,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error:", response.statusText);
        }
      })
      .then((data) => {
        if (data && data[0] && data[0].country) {
          setCountryName(data[0].country);
        } else {
          setError({ message: "No country information found." });
        }
      })
      .catch((error) => {
        console.error("Request failed:", error);
        setError(error);
      });
  }, [cityName]);

  return { countryName, error };
};

export default useCountry;
