import React from "react";
import { Form } from "react-bootstrap";

const onChangeHandle = (valueHandler, label) => (e) => {
 valueHandler((v) => ({ ...v, [`${label.toLowerCase()}`]: e.target.value }));
};

export const BasicInput = ({
 placeholder,
 label,
 type,
 value,
 className,
 valueHandler,
}) => {
 return (
  <Form.Group className={className}>
   <Form.Label htmlFor={`${label}-label`} className="mt-2 ms-auto d-block">
    {label}
   </Form.Label>
   <Form.Control
    id={`${label}-label`}
    type={type}
    placeholder={placeholder}
    value={value && value}
    onChange={onChangeHandle(valueHandler, label)}
   />
  </Form.Group>
 );
};

export const CheckBoxInput = ({ label, name, valueHandler, checkVal }) => {
 return (
  <Form.Check
   type="radio"
   id={`default-${label}`}
   label={label}
   value={label}
   name={name}
   checked={checkVal === label}
   onChange={onChangeHandle(valueHandler, name)}
  />
 );
};
