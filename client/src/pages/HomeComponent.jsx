import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import bg1 from "@/assets/home-1.jpg";
import bg2 from "@/assets/home-2.jpg";
import bg3 from "@/assets/home-3.jpg";
import heropic from "@/assets/home-hero.jpg";

const HomeComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 min-h-screen flex flex-col items-center justify-between p-6 w-screen">
      {/* Header Section */}
      <header className="w-full text-center py-10">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold text-white tracking-tight drop-shadow-lg">
          Drip<span className="text-black">IT</span>
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-white max-w-2xl mx-auto">
          Discover the latest trends in fashion and make your own style
          statement with DripIT.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <Button
            variant="ghost"
            className="border-orange-600 hover:bg-orange-700"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </Button>
          <Button
            className="border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            onClick={() => navigate("/auth/register")}
          >
            Register
          </Button>
        </div>
      </header>
      {/* Hero Section */}
      <section className="w-full flex flex-wrap justify-center items-center">
        <img
          src={heropic}
          alt="Hero Pic"
          className="w-full h-72 md:h-96 object-cover rounded-md shadow-lg"
        />
      </section>
      {/* New Text Section */}{" "}
      <section className="w-full text-center py-10 p-2 border-2 border-white mt-5 md:max-w-sm">
        {" "}
        <h3 className="text-3xl font-bold text-white">Fashion Forward</h3>{" "}
        <p className="mt-4 text-lg text-white max-w-xl mx-auto">
          {" "}
          At DripIT, we believe that fashion is more than just clothing—it's an
          expression of your personality. Our curated collections are designed
          to empower you to showcase your unique style. Whether you're looking
          for the latest trends or timeless classics, we have something for
          everyone. Step into a world where fashion meets individuality, and let
          your wardrobe speak volumes.{" "}
        </p>{" "}
      </section>
      {/*products */}
      <section className="w-full flex flex-wrap justify-center items-center gap-6 py-8">
        <div className="flex flex-col items-center gap-4">
          <img
            src={bg1}
            alt="Fashion Model"
            className="w-60 h-80 object-cover rounded-md shadow-lg"
          />
          <h2 className="text-2xl font-bold text-white">Latest Collection</h2>
          <Button
            className="bg-black text-white hover:bg-white hover:text-black mt-4"
            onClick={() => navigate("/shop/listing")}
          >
            Shop Now
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <img
            src={bg2}
            alt="Fashion Model"
            className="w-60 h-80 object-cover rounded-md shadow-lg"
          />
          <h2 className="text-2xl font-bold text-white">Exclusive Deals</h2>
          <Button
            className="bg-black text-white hover:bg-white hover:text-black mt-4"
            onClick={() => navigate("/auth/login")}
          >
            View Deals
          </Button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <img
            src={bg3}
            alt="Fashion Model"
            className="w-60 h-80 object-cover rounded-md shadow-lg"
          />
          <h2 className="text-2xl font-bold text-white">New Arrivals</h2>
          <Button
            className="bg-black text-white hover:bg-white hover:text-black mt-4"
            onClick={() => navigate("/auth/login")}
          >
            See What's New
          </Button>
        </div>
      </section>
      {/* CTA Section */}
      <section className="w-full text-center py-10 bg-white bg-opacity-80 rounded-md shadow-lg">
        <h3 className="text-3xl font-bold text-orange-600">
          Join our Community
        </h3>
        <p className="mt-2 text-lg text-gray-800">
          Sign up or login to stay updated and buy our latest trends and offers.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <Button
            className="bg-orange-600 text-white hover:bg-orange-700"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </Button>
          <Button
            className="border border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            onClick={() => navigate("/auth/register")}
          >
            Register
          </Button>
        </div>
      </section>
      {/* Footer Section */}
      <footer className="w-full text-center mt-6 border-t py-4">
        <p className="text-sm text-white ">
          Designed & Developed with love by{" "}
          <span className="font-bold">Robbie Ncube</span>.
        </p>
        <h3 className="text-sm text-white">
          {" "}
          © 2024 DripIT. All rights reserved.
        </h3>
      </footer>
    </div>
  );
};

export default HomeComponent;
