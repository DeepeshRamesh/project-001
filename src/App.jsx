
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";



function App() {

  const location = useLocation();
 

  return (
    <div>
      <Navbar title="Project-001" />

      <div className="container">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div 
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              transition={{duration:0.2}}
              >
                <Home />
              </motion.div>} />
            <Route path="/about"element={
              <motion.div 
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              transition={{duration:0.2}}
              >
                <About />
              </motion.div>} />
            <Route path="/contact"element={
              <motion.div 
              initial={{opacity:0}}
              animate={{opacity:1}}
              exit={{opacity:0}}
              transition={{duration:0.2}}
              >
                <Contact />
              </motion.div>} />
          </Routes>
        </AnimatePresence>              
      </div>
    </div>
  );
}

export default App;
