import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
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
        return (
          <ProtectedRoute requireAuth={false}>
            <RegisterPage onNavigate={setCurrentPage} />
          </ProtectedRoute>
        );
      case "browse":
        return <BrowseProducts onNavigate={setCurrentPage} />;
      case "item-detail":
        return <ItemDetail onNavigate={setCurrentPage} />;
      case "admin":
        return (
          <ProtectedRoute requireAuth={true} requireAdmin={true}>
            <AdminDashboard onNavigate={setCurrentPage} />
          </ProtectedRoute>
        );
      case "dashboard":
        return (
          <ProtectedRoute requireAuth={true}>
            <UserDashboard onNavigate={setCurrentPage} />
          </ProtectedRoute>
        );
      case "add-item":
        return (
          <ProtectedRoute requireAuth={true}>
            <AddNewItem onNavigate={setCurrentPage} />
          </ProtectedRoute>
        );
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

  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="min-h-screen bg-white">{renderPage()}</div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
