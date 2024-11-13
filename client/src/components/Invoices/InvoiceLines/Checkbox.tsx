// export default function CheckBox({ indeterminate, ...rest }, ref) {
//   const defaultRef = React.useRef<HTMLInputElement>(null!);
//   const resolvedRef = ref || defaultRef;

//   React.useEffect(() => {
//     resolvedRef.current.indeterminate = indeterminate;
//   }, [ref, indeterminate]);

//   return <input type="checkbox" ref={ref} {...rest} />;
// }

import { useState } from "react";

export default function CheckBox({ isChecked, onChange }) {
  const [checked, setChecked] = useState(isChecked);

  function change() {
    setChecked(!checked);
    onChange();
  }
  return (
    <input
      type="checkbox"
      defaultChecked={isChecked}
      onClick={() => change()}
    />
  );
}
