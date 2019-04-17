import React from "react";

const Crop = props => (
  <svg viewBox="0 0 32 32" {...props}>
    <path d="M29.5 8C30.879 8 32 6.879 32 5.5v-3C32 1.121 30.879 0 29.5 0h-3A2.502 2.502 0 0 0 24 2.5V3H8v-.5C8 1.121 6.879 0 5.5 0h-3A2.503 2.503 0 0 0 0 2.5v3C0 6.879 1.122 8 2.5 8H3v16h-.5A2.503 2.503 0 0 0 0 26.5v3C0 30.879 1.122 32 2.5 32h3C6.879 32 8 30.879 8 29.5V29h16v.5c0 1.379 1.121 2.5 2.5 2.5h3c1.379 0 2.5-1.121 2.5-2.5v-3c0-1.379-1.121-2.5-2.5-2.5H29V8h.5zm-27-2a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3c.275 0 .5.225.5.5v3c0 .275-.225.5-.5.5h-3zM6 29.5c0 .275-.225.5-.5.5h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5h3c.275 0 .5.225.5.5v3zm18-3v.5H8v-.5C8 25.121 6.879 24 5.5 24H5V8h.5C6.879 8 8 6.879 8 5.5V5h16v.5C24 6.879 25.121 8 26.5 8h.5v16h-.5a2.502 2.502 0 0 0-2.5 2.5zm5.5-.5c.275 0 .5.225.5.5v3c0 .275-.225.5-.5.5h-3a.501.501 0 0 1-.5-.5v-3c0-.275.225-.5.5-.5h3zm-3-20a.501.501 0 0 1-.5-.5v-3c0-.275.225-.5.5-.5h3c.275 0 .5.225.5.5v3c0 .275-.225.5-.5.5h-3z" />
  </svg>
);

export default Crop;