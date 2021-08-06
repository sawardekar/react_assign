import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/users/edit/:id" component={(props)=><UserForm {...props}/>}>
          </Route>
          <Route exact path="/users/detail/:id" component={(props)=><UserForm {...props} isDetails/>}>
          </Route>
          <Route exact path="/create-users" component={(props)=><UserForm {...props}/>}>
          </Route>
          <Route exact path="/users" component={(props)=><UserList {...props}/>}>
          </Route>
          
        </Switch>
        </Router>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="/users"
            rel="noopener noreferrer"
          >
            User List
          </a>
        </header>
    </div>
  );
}

export default App;
