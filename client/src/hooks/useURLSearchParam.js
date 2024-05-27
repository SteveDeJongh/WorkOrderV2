import { useState, useEffect } from "react";

// import { useSearchParams } from "react-router-dom";

function useURLSearchParam(paramName, initialValue = "") {
  const query = new URLSearchParams(window.location.search);

  const [paramValue, setParamValue] = useState(query.get(paramName) || initialValue);

  useEffect(() => {
    const newURL = paramValue
    ? `${window.location.pathname}?${paramName}=${paramValue}`
    : window.location.pathname;

    window.history.pushState({}, "", newURL);
  }, [paramValue, paramName]);

  return [paramValue, setParamValue];
}

export default useURLSearchParam;