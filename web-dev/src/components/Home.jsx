import React from "react";

const cards = [
  {
    image:
      "https://media.istockphoto.com/id/137336783/photo/vittala-temple-stone-chariot-hampi-karnataka-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=LaATHiHaYAuJidKugNXpwXSmIiwe8qtUl4ArleoiOAI=",
    title: "Indian History",
    discription:
      "In this course you will learn about History of India through ages",
    button: "Learn More",
  },
  {
    image:
      "https://media.istockphoto.com/id/172222439/photo/asia-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=N2qX8tNGxq8VePIl7VEIwe9a9yaWwpCNRh3VmaIYhV4=",
    title: "India and World Geography",
    discription: "Detail walkthrough about India and World Geography",
    button: "Learn More",
  },
  {
    image:
      "https://media.istockphoto.com/id/184085544/photo/indian-parliament-in-new-delhi-the-politic-government-of-india.webp?a=1&b=1&s=612x612&w=0&k=20&c=ZeDiKQGs3CzSvsXYGQUcga4TdRtPv9nzMajOcGMTgcQ=",
    title: "Indian Polity",
    discription: "We will learn about Government and its function",
    button: "Learn More",
  },
  {
    image:
      "https://images.unsplash.com/photo-1565374392032-8007fb37c26e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZWNvbm9teXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Indian Economy",
    discription:
      "Indian Economy includes Banking, Finance, Micro and Macro Economy and its aspect",
    button: "Learn More",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2NpZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Science and Technology",
    discription:
      "Summarized study of all branches of Science like Physics, Chemistry, Biology and Mathematics",
    button: "Learn More",
  },
];

const Card = ({ image, title, discription, button }) => {
  return (
    <div className="min-h-screen-xl mt-20 2xl:max-w-screen-3xl px-8 md:px-12 mx-auto py-12 lg:py-24 space-y-24 h-svh flex flex-col justify-center">
      <div className="rounded-xl justify-center p-2 items-center rotate-6 hover:rotate-0 duration-500 hover:-translate-y-12 h-fit w-65 border-2 border-slate-200 shadow-lg shadow-bg-slate-400 object-cover hover:scale-150 transform origin-bottom">
        <img src={image} alt="subjects" className="w-full" />
        <div className="text-2xl font-bold mb-2 text-center capitalize text-blue-700">
          {title}
        </div>
        <div className="justify-center text-center">
          <p className="text-slate-700 ">{discription}</p>
          <button className="bg-blue-600 px-3 py-2 rounded-lg mt-3  text-slate-200 text-nowrap">
            {button}
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="flex items-center">
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
