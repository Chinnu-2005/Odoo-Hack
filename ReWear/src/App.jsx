import { useState } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturedItems from "./FeaturedItems";
import StatsBar from "./StatsBar";
import Footer from "./Footer";
import RegisterPage from "./RegisterPage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "register":
        return <RegisterPage onNavigate={setCurrentPage} />;
      case "home":
      default:
        return (
          <>
            <Header onNavigate={setCurrentPage} />
            <HeroSection onNavigate={setCurrentPage} />
            <FeaturedItems />
            <StatsBar />
            <Footer />
          </>
        );
    }
  };

  return <div className="min-h-screen bg-white">{renderPage()}</div>;
}

export default App;
