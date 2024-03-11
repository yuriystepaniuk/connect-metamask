import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>page 404</div>
      <Link href="/">Return Home</Link>
    </div>
  );
};

export default NotFound;
