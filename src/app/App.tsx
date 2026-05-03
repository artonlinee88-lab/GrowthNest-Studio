import { Scene3D } from "./components/Scene3D";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { Work } from "./components/Work";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div style={{ background: "#070c1a", minHeight: "100vh" }}>
      <Scene3D />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Services />
        <Process />
        <Work />
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
