import { Route, Switch } from "react-router-dom";
import { LoginPage, DashboardPage } from "../pages";
import { PrivateRoute } from "../components/PrivateRoute";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <PrivateRoute exact path="/dashboard" component={DashboardPage} />
      </Switch>
    </div>
  );
};

export default App;
