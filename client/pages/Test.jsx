import { toast } from "react-toastify";

export default function Test() {
  const onClick = () =>
    toast("Toast is good", {
      hideProgressBar: false,
      autoClose: 1000,
      type: "info",
    });

  return (
    <>
      <button onClick={onClick}> Click Me</button>
    </>
  );
}
