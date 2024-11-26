import React from "react";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star, idx) => (
        <StarIcon
          key={idx}
          size={18}
          className={` text-orange-600 ${
            star <= rating ? "fill-orange-600" : ""
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
