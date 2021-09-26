import './assets/scss/main.scss'
import { Switch, Route, HashRouter as Router } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AppHeader } from './components/AppHeader'
import { apiService } from './services/apiService'
import { AuthPage } from './pages/AuthPage'
import { useSelector } from 'react-redux'
import { SignupPage } from './pages/SignupPage'
import { LoginPage } from './pages/LoginPage'
import { AccountPage } from './pages/AccountPage'
import { ProductPage } from './pages/ProductPage'
import { AppNotification } from './components/AppNotification'
import { CartPage } from './pages/CartPage'
import { SuggestMePage } from './components/SuggestMePage'
import { CreateProductPage } from './components/CreateProductPage'
import { JustForYouPage } from './pages/JustForYouPage'

function App() {
  // @ts-ignore
  const user = useSelector((rootReducer) => rootReducer.userReducer.user)
  return (
    <>
      <AppNotification />
      <Router>
        <div className='App'>
          {!user && (
            <Switch>
              <Route component={SignupPage} path='/signup' />
              <Route component={LoginPage} path='/' />
            </Switch>
          )}
          {user && (
            <div>
              <AppHeader />
              <main className='page-container'>
                <Switch>
                  <Route component={ProductPage} path='/product/:productId' />
                  <Route component={AccountPage} path='/account' />
                  <Route component={CartPage} path='/cart' />
                  <Route component={SuggestMePage} path='/suggest-me' />
                  <Route component={JustForYouPage} path='/just-for-you' />
                  <Route component={CreateProductPage} path='/create-product' />
                  <Route component={HomePage} path='/' />
                </Switch>
              </main>
            </div>
          )}
        </div>
      </Router>
    </>
  )
}

export default App
