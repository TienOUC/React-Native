import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import HomeScreen from './screens/HomeScreen'

const initialState = {
  action: '',
  name: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MENU':
      return { action: 'openMenu' }
    case 'CLOSE_MENU':
      return { action: 'closeMenu' }
    case 'UPDATE_NAME':
      return { name: action.name }
    default:
      return state
  }

  // if (action.type == 'CLOSE_MENU') {
  //   return {
  //     action: 'closeMenu'
  //   }
  // } else if (action.type == 'OPEN_MENU') {
  //   return {
  //     action: 'openMenu'
  //   }
  // }
  // return state
}

const store = createStore(reducer)

const App = () => (
  <Provider store={store}>
    <HomeScreen />
  </Provider>
)

export default App
