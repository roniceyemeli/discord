import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import Home from "./components/Home/Home";
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar />
            <Hero />
          </Route>

          <Route exact path="/channels">
            <Home />
          </Route>

          <Route exact path="/channels/:id">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
