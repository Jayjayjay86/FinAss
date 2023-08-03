import { useState, useEffect, React } from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/app/Header";
import Menu from "./components/app/Menu";
import Footer from "./components/app/Footer";
import List from "./components/page/List";
import Settings from "./components/page/Settings";
import Create from "./components/page/Create";
import Analyse from "./components/page/Analyse";
function App() {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:8000/expenses/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      } else {
        console.error(
          "Error fetching expenses:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const useCustomNavigation = () => {
    const navigate = useNavigate();

    const goToMenu = () => {
      navigate("/");
    };

    // Add more navigation functions if needed

    return { goToMenu };
  };
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route
              path="/list"
              element={
                <List
                  expenses={expenses}
                  setExpenses={setExpenses}
                  useCustomNavigation={useCustomNavigation}
                  fetchExpenses={fetchExpenses}
                />
              }
            />
            <Route
              path="/create"
              element={<Create useCustomNavigation={useCustomNavigation} />}
            />
            <Route
              path="/analyse"
              element={
                <Analyse
                  expenses={expenses}
                  useCustomNavigation={useCustomNavigation}
                />
              }
            />
            <Route
              path="/settings"
              element={
                <Settings
                  currentExpenses={expenses}
                  useCustomNavigation={useCustomNavigation}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
