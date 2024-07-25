import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../index";

const Home = () => {
  const { loggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn === false) {
      navigate("/login");
    }
  }, [loggedIn]);

  return (
    <div className="posts-container">
      <h1 className="heading-h1">
        Go to Primes and let's start generating large prime numbers!
      </h1>
    </div>
  );
};

export default Home;
