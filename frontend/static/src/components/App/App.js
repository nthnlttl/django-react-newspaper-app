import {useState, useEffect} from 'react';
import {Route, Switch, withRouter, useHistory} from 'react-router-dom';
import './App.css';
import PrivateRoute from './../PrivateRoute/PrivateRoute';
import Header from './../Header/Header';
import RegistrationForm from './../Registration/RegistrationForm';
import LoginForm from './../Login/LoginForm';
import ArticleForm from './../Article/ArticleForm';
import MyArticleList from './../Article/MyArticleList';
import Home from './../Home/Home';
import Cookies from 'js-cookie';
import AdminArticleList from '../Article/AdminArticleList';

function App() {
  const [user, setUser] = useState(null);

  const history = useHistory();

useEffect(() => {
  const checkAuth = async () => {
    const response = await fetch('/rest-auth/user/');
    if(!response.ok) {
      setUser({isAuth: false});
    } else { 
      const data = await response.json();
      setUser({isAuth: true, isAdmin: data.is_staff})
    }
  }
  checkAuth();
}, [history]);

async function handleLogout(event, props) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
    body: JSON.stringify(props.user),
  };
  const response = await fetch("/rest-auth/logout/", options);
  if (!response) {
    console.log(response);
  } else {
    console.log(response);
    const data = await response.json();
    Cookies.remove("Authorization");
    setUser({isAuth: false});
    history.push("/login");
  }
}


const isAuth = user?.isAuth;
const isAdmin = user?.isAdmin;

return (
  <>
    <Header isAuth={isAuth}/>
    <Switch>
      <Route path="/registration">
        <RegistrationForm isAuth={isAuth} setUser={setUser}/>
      </Route>
      <Route path='/login'>
        <LoginForm isAuth={isAuth} setUser={setUser} />
      </Route>
      <PrivateRoute path='/articles/create' isauth={isAuth}>
        <ArticleForm />
      </PrivateRoute>
      <PrivateRoute path='/articles/myarticles/:status?' isAuth={isAuth} handleLogout={handleLogout}>
        <MyArticleList/>
      </PrivateRoute>
      <Route path='/articles/' isAdmin={isAdmin}>
        <AdminArticleList/>
      </Route>
      <Route path="/:category?">
        <Home />
      </Route>
    </Switch>
  </>  
);
  
}

export default withRouter(App);


////Leftoff with creating navlinks in src////