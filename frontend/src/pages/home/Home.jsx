import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Appbar from "../../components/Appbar";
import "./home.css";
import Footer from "../../components/Footer";
import LandingCarousel from "../../components/home/landingCarosel";
import TrendingSection from "../../components/home/trendingSection";
import CategorySection from "../../components/home/categorySection";
import { getAllEventsApiHandler } from "../../services/allapis";

const Home = () => {
  const dispatch = useDispatch();
  const { events, isLoading } = useSelector((state) => state.events);
  let caourosel = events[Math.floor(Math.random() * events.length)];

  useEffect(() => {
    dispatch(getAllEventsApiHandler());
  }, [dispatch]);

  return (
    <>
      <Appbar absPos={true} />
      {isLoading && <div>Loading</div>}
      {!isLoading && events && (
        <>
          <LandingCarousel caourosel={caourosel} />
          <TrendingSection tevents={events} />
          <CategorySection />
        </>
      )}
      <Footer />
    </>
  );
};

export default Home;
