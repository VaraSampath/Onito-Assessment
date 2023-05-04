import Form from "./components/form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MyTable from "./components/DataTable";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Form />}
        />
        <Route
          path="/users"
          element={<MyTable />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
