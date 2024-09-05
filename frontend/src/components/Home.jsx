import React from 'react';

const Home = () => {
  return (
    <section
      id="home"
      className=" h-96 md:h-screen   flex flex-col justify-center items-center bg-black px-4 py-8"
    >
      <div className="text-center font-mono overflow-hidden whitespace-nowrap border-black animate-typewriter">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 font-peristiwa text-cyan-100 inline-block animate-blink">
          Welcome to My Portfolio
        </h1>
      </div>
      <p className="text-2xl md:text-4xl lg:text-5xl text-white font-serif text-center mt-4">
        I am Abbas Alizada, <br /> a full stack web developer
      </p>
    </section>
  );
};

export default Home;
