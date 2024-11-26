import { filterOptions } from "@/config";
import React, { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const Filter = ({ filters, handleFilter }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem, idx) => (
          <Fragment key={idx}>
            <div className="">
              <h3 className="text-base capitalize font-bold">{keyItem}</h3>

              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 font-medium"
                  >
                    <Checkbox
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <hr className="border-b-1 my-2 border-gray-300" />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Filter;
