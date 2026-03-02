import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import GallerySection from "./components/sections/GallerySection";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <GallerySection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default App;
