import React from "react";

const About = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 text-center">
   
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">
          About <span className="text-blue-600">shoeWave</span>
        </h1>

     
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Welcome to <span className="font-bold">shoeWave</span>, your ultimate
          destination for stylish, comfortable, and affordable footwear. Our
          mission is to bring you the latest trends and timeless designs, all in
          one place.
        </p>

        <div className="grid md:grid-cols-2 gap-10 mt-12">
       
          <div>
            <img
              src="/images/3.png"
              alt="Shoe Collection"
              className="rounded-2xl shadow-xl hover:scale-105 transition duration-500"
            />
          </div>

      
          <div className="flex flex-col justify-center text-left">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At <span className="font-semibold">shoeWave</span>, we believe
              that shoes are more than just fashion—they're a part of your
              lifestyle. Whether you're running a marathon, going to the office,
              or just chilling at home, we’ve got the perfect pair for you.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>✔ Wide range of stylish and comfortable shoes</li>
              <li>✔ Affordable prices with premium quality</li>
              <li>✔ Fast and reliable delivery</li>
              <li>✔ Dedicated customer support</li>
            </ul>
          </div>
        </div>

     
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-3 text-gray-800">
            Our Mission
          </h3>
          <p className="text-gray-600">
            To empower every individual with confidence through the right pair
            of shoes. We aim to provide quality footwear that blends comfort and
            style, making every step you take a statement.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;


