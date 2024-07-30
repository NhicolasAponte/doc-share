import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AccessTypes = [
  { value: "viewer", label: "Can view" },
  { value: "editor", label: "Can edit" },
];

const AccessTypeSelector = ({
  userType,
  setUserType,
  onClickHandler,
}: AccessTypeSelectorProps) => {
  const accessChangeHandler = (type: UserType) => {
    setUserType(type);
    onClickHandler && onClickHandler(type);
  };

  return (
    <Select
      value={userType}
      onValueChange={(type: UserType) => accessChangeHandler(type)}
    >
      <SelectTrigger className="shad-select">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-none bg-dark-200">
        {AccessTypes.map((type, index) => {
          return (
            <SelectItem
              key={index}
              value={type.value}
              className="shad-select-item"
            >
              {type.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default AccessTypeSelector;
