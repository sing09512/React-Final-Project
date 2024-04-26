import React from "react";
import { city } from "./cityname";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    let found = false;

    if (message.includes("hello")) {
      actions.handleHello();
      found = true;
    }

    city.forEach((cityItem) => {
      if (message.includes(cityItem)) {
        actions.handleRecommendation(cityItem);
        found = true;
      }
    });
    if (!found) {
      actions.handleError();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
