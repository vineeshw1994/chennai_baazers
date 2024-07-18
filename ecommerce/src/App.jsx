import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import ScrollTop from "./components/scrollTop/ScrollTop";
import { HelmetProvider } from "react-helmet-async";
import AdminRoutesComponent from "./Routes/Admin/Admin";
import UserRoute from "./Routes/User/user";

function App() {
  return (
    <Router>
      <HelmetProvider>
        <ScrollTop />
        <Routes>
          {/* Nested route for the home route */}
          <Route path="/*" element={<HomeWithHeaderAndFooter />} />
          {/* Routes for other pages */}
          <Route path="/admin/*" element={<AdminRoutesComponent />} />
        </Routes>

        <Toaster />
      </HelmetProvider>
    </Router>
  );
}
// Define a component for the home route with header and footer
function HomeWithHeaderAndFooter() {
  return (
    <div>
      <Header />
      <UserRoute />
      <Footer />
    </div>
  );
}

export default App;
