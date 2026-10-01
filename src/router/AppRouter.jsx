import { Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import ToolPage from "../pages/ToolPage";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import Calculators from "../pages/Calculators";
import StudyTools from "../pages/StudyTools";
import StudentLife from "../pages/StudentLife";
import Resources from "../pages/Resources";
import NotFound from "../pages/NotFound";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/calculators" element={<Calculators />} />
      <Route path="/study-tools" element={<StudyTools />} />
      <Route path="/student-life" element={<StudentLife />} />
      <Route path="/resources" element={<Resources />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />

      <Route path="/:toolSlug" element={<ToolPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;