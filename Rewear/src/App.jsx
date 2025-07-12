import { useState } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturedItems from "./FeaturedItems";
import StatsBar from "./StatsBar";
import Footer from "./Footer";
import RegisterPage from "./RegisterPage";
import BrowseProducts from "./BrowseProducts";
import ItemDetail from "./ItemDetail";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import AddNewItem from "./AddNewItem";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "register":
        return <RegisterPage onNavigate={setCurrentPage} />;
      case "browse":
        return <BrowseProducts onNavigate={setCurrentPage} />;
      case "item-detail":
        return <ItemDetail onNavigate={setCurrentPage} />;
      case "admin":
        return <AdminDashboard onNavigate={setCurrentPage} />;
      case "dashboard":
        return <UserDashboard onNavigate={setCurrentPage} />;
      case "add-item":
        return <AddNewItem onNavigate={setCurrentPage} />;
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
