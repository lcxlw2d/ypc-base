import Imported from 'react-imported-component'


// To see more options in https://github.com/theKashey/react-imported-component
// const Login = Imported(() => import('../containers/login/pages/LoginPage.jsx'))
import Login from '../containers/login/pages/LoginPage'

export default [
  {
    path: '/',
    component: Login,
    childRoutes: []
  }
]
