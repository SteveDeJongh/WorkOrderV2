import { searchProducts } from "../../../services/productServices";
import useURLSearchParam from "../../../hooks/useURLSearchParam";

import { useState } from "react";

import Select from "react-select";
import AsyncSelect from "react-select/async";

type props = {
  line: object;
  updateLine: Function;
};

export default function NewInvoiceLineReactSelect() {
  const [selectedOptions, setSelectedOptions] = useState(null);

  // function loadOptions(inputValue: string) {
  //   new Promise(resolve) {(setTimeout(() => {
  //     callback(fetchOptions(inputValue));
  //   }, 500)};
  // }

  async function fetchOptions(inputValue: string) {
    let val = searchProducts(inputValue).then((data) =>
      data.map((product) => ({ label: product.name, value: product.id }))
    );

    return val;
  }

  async function debouncedOptions(inputValue: string) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fetchOptions(inputValue));
      }, 1000);
    });
  }

  return (
    <div>
      <AsyncSelect
        cacheOptions
        loadOptions={debouncedOptions}
        defaultOptions
        // onInputChange={handleInputChange}
      />
    </div>
  );
}
