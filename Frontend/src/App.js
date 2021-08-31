import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./Routes/loginPage";
import LandingPage from "./Routes/landingPage";
import SignUpPage from "./Routes/signupPage";
import CreateClass from "./Components/createClass";
import JoinClass from "./Components/joinClass";
import SubjectDashboard from "./Routes/subjectDashboard";
import PageNotFound from "./Routes/pageNotFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <ToastContainer />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/login" />;
            }}
          />
          <Route path="/dashboard/user/:id" exact component={LandingPage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/signup" exact component={SignUpPage} />
          <Route path="/user/:id/createClass" exact component={CreateClass} />
          <Route path="/user/:id/joinClass" exact component={JoinClass} />
          <Route
            path="/user/:userID/subject/:subID"
            exact
            component={SubjectDashboard}
          />
          <Route path="/page-not-found" exact component={PageNotFound} />
          <Redirect to="/page-not-found" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
