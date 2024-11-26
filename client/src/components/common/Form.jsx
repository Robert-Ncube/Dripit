import React from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Form = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  imageUploadLoading,
  isBtnDisabled,
}) => {
  const renderByComponentType = (getControlItem) => {
    let element = null;
    let value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <input
            id={getControlItem.name}
            type={getControlItem.type}
            name={getControlItem.name}
            value={value}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
            placeholder={getControlItem.placeholder}
            className="border-2 border-gray-300 rounded-md px-4 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/50"
          />
        );
        break;
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            className=""
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>

            <SelectContent>
              {getControlItem.options && getControlItem?.options.length > 0
                ? getControlItem.options.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={getControlItem.name}
            name={getControlItem.name}
            value={value}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
            placeholder={getControlItem.placeholder}
            rows={5}
            className="border-2 border-gray-300 rounded-md px-4 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/50"
          />
        );
        break;

      default:
        element = (
          <input
            id={getControlItem.name}
            type={getControlItem.type}
            name={getControlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
            placeholder={getControlItem.placeholder}
            className="border-2 border-gray-300 rounded-md px-4 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/50"
          />
        );
        break;
    }
    return element;
  };

  return (
    <form className="" onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => {
          return (
            <div className="grid w-full gap-1.5" key={controlItem.name}>
              <Label className="mb-1">{controlItem.label}</Label>
              {renderByComponentType(controlItem)}
            </div>
          );
        })}
      </div>
      <Button
        type="submit"
        className="mt-2 w-full bg-orange-600"
        disabled={isBtnDisabled}
      >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default Form;
