import { useState, useEffect } from "react";

function useURLSearchParam(paramName: string, initialValue = ""): [string, React.Dispatch<React.SetStateAction<string>>] {
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