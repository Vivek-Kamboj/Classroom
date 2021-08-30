import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./Routes/loginPage";
import LandingPage from "./Routes/landingPage";
import SignUpPage from "./Routes/signupPage";
import CreateClass from "./Components/createClass";
import JoinClass from "./Components/joinClass";
import SubjectDashboard from "./Routes/subjectDashboard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/dashboard/:id" exact component={LandingPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/signup" exact component={SignUpPage} />
          <Route path="/createClass/:id" exact component={CreateClass} />
          <Route path="/joinClass/:id" exact component={JoinClass} />
          <Route
            path="/user/:userID/subject/:subID"
            exact
            component={SubjectDashboard}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
