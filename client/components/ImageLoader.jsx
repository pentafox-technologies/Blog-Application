import Image from "next/image";

export default function Home({ name, H, W }) {
  const API = `http://localhost:5000`;
  const myLoader = ({ src }) => {
    return `${API}/coverImage/${name}`;
  };

  return (
    <Image
      loader={myLoader}
      src={`${API}/coverImage/${name}`}
      width={H ? H : 150}
      height={W ? W : 50}
      alt={`${name} image`}
    />
  );
}
