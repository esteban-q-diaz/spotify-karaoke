import React from "react";

export const Next = ({ color, size, title, className }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height={ size ? size : "1rem" }
      width={ size ? size : "1rem" }
      style={{ color }}
      className={ className ? className : '' }
    >
      { title ? <title>{title}</title> : null }
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M1,3.5 L1,20 L10,14 L10,20 L21,12 L10,4 L10,10 L1,3.5 Z M22,2 L22,22 L22,2 Z"
      ></path>
    </svg>
  );
};

export const Previous = ({ color, size, title, className }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      height={ size ? size : "1rem" }
      width={ size ? size : "1rem" }
      style={{ color }}
      className={ className ? className : '' }
    >
      { title ? <title>{title}</title> : null }
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        d="M23,3.5 L23,20 L14,14 L14,20 L3,12 L14,4 L14,10 L23,3.5 Z M2,2 L2,22 L2,2 Z"
      ></path>
    </svg>
  );
};

