import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import StudentsApp from "./StudentsApp";
import { UpdateForm } from "./UpdateForm";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/students" element={<StudentsApp />} />
      <Route path="/students/update/:id" element={<UpdateForm />} />
    </Routes>
  );
}
