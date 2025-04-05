import React from "react";

const cards = [
  {
    image: "",
    title: "title1",
    discription: "this this my first card",
    button: "Learn More",
  },
  {
    image: "",
    title: "title2",
    discription: "this this my second card",
    button: "Learn More",
  },
  {
    image: "",
    title: "title3",
    discription: "this this my third card",
    button: "Learn More",
  },
  {
    image: "",
    title: "title4",
    discription: "this this my fourth card",
    button: "Learn More",
  },
  {
    image: "",
    title: "title5",
    discription: "this this my fifth card",
    button: "Learn More",
  },
];

const Card = ({ images, title, discription, button }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shdaow-lg flex">
      <div className="px-6 py-4 border-2 border-slate-300 rounded-lg">
        <img src={images} alt="" />
        <div className="text-2xl font-bold mb-2">{title}</div>
        <p className="text-slate-700 text-">{discription}</p>
        <button>{button}</button>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          discription={card.discription}
          button={card.button}
        />
      ))}
    </div>
  );
};
export default Home;
