import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import Slider from "./components/Slider";

const slidesData = [
  {
    src: "https://i0.wp.com/assets.b9.com.br/wp-content/uploads/2021/06/vavab9.jpg?resize=1280%2C720&ssl=1",
    alt: "Valorant",
    title: "Valorant",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
  },
  {
    src: "https://images7.alphacoders.com/135/thumb-1920-1353695.jpeg",
    alt: "Pubg",
    title: "Pubg",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
  },
  {
    src: "https://images8.alphacoders.com/132/thumb-1920-1329760.jpeg",
    alt: "Counter Strike 2",
    title: "Counter Strike 2",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
  },
  // Adicione os outros slides aqui...
];

const App = () => {
  return (
    <div className="App">
      <Slider slidesData={slidesData} />
    </div>
  );
};

export default App;
