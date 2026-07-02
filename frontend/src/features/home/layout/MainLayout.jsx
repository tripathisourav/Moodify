import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

const MainLayout = ({ children }) => {
  return (
    <div className="layout">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <motion.div
        className="main"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>

      {/* Background Glow */}
      <div className="bg-glow" />

    </div>
  );
};

export default MainLayout;