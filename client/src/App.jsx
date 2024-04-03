import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import UserTable from "./components/UserTable";

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route exact path="/" element={<UserTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
