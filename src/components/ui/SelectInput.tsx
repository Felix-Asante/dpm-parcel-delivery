import { Avatar, Select, SelectItem } from "@heroui/react";
import React from "react";

interface Options {
  label: string;
  value: string;
  key?: string;
  image?: string;
  onClick?: () => void;
}
interface SelectInputProps {
  options: Options[];
  label?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  isRequired?: boolean;
  name?: string;
}
export default function SelectInput(props: SelectInputProps) {
  const {
    options,
    label,
    placeholder,
    size = "md",
    isRequired = false,
    name,
  } = props;

  return (
    <Select
      items={options}
      label={label}
      placeholder={placeholder || "Select an option"}
      labelPlacement="outside"
      variant="bordered"
      radius="sm"
      size={size}
      isRequired={isRequired}
      name={name}
    >
      {(option) => (
        <SelectItem
          key={option?.key ?? option.label}
          textValue={option.value}
          onClick={option.onClick ? option.onClick : undefined}
        >
          <div className="flex gap-2 items-center">
            {option?.image && (
              <Avatar
                alt={option.label}
                className="flex-shrink-0"
                size="sm"
                src={option.image}
              />
            )}
            <div className="flex flex-col">
              <span className="text-small">{option.label}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
