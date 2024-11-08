import React from "react";

export default function SearchResult({ data }) {
  return <div onClick={() => console.log(data)}>{data.name}</div>;
}
