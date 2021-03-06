import React, { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from './components/Navbar';
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'
import Home from './views/Home';
import Signup from './views/Signup';
import Signin from './views/Signin';
import Profile from './views/Profile';
import CreatePost from './views/CreatePost';
import UserProfile from './views/UserProfile';
import Subpost from './views/SubscribedUserPost';
import { reducer, initialState } from './reducers/userReducer'


export const UserContext = createContext()

//inorder to use history also in app
const Routing = () => {
  const history = useHistory()
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user })
      //history.push("/")
    }
    else {
      //reset view must be created and route must be added in switch
      //if (!history.location.pathname.startsWith('/reset'))
      history.push('/signin')
    }
  }, [])
  return (
    <Switch>
      <Route exact path="/">
        <Subpost />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/explore">
        <Home />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>


  );
}

export default App;
