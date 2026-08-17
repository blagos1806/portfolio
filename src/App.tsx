import "./i18n"; // side-effect: inicializa o i18next
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import About from "./components/sections/About/About";
import Contact from "./components/sections/Contact/Contact";
import Hero from "./components/sections/Hero/Hero";
import Skills from "./components/sections/Skills/Skills";
import Experience from "./components/sections/Experience/Experience";
import Education from "./components/sections/Education/Education";
import Projects from "./components/sections/Projects/Projects";
import SectionDivider from "./components/ui/SectionDivider/SectionDivider";
import ScrollUp from "./components/ui/ScrollUp/ScrollUp";

function Content() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Contact />
      </main>
      <ScrollUp isVisible={true} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Content />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
