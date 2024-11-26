import React from "react";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";

const StarRating = ({ rating, handleRatingChange }) => {
  return [1, 2, 3, 4, 5].map((star, idx) => (
    <Button
      key={idx}
      size="icon"
      variant="outline"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
      className={`text-orange-600 hover:border-none
        "mx-1" rounded-full transition-colors border-none ${
          star <= rating
            ? " hover:bg-black"
            : " hover:bg-primary hover:text-primary-foreground"
        }`}
    >
      <StarIcon
        className={`w-6 h-6 ${star <= rating ? "fill-orange-600" : ""}`}
      />
    </Button>
  ));
};

export default StarRating;
