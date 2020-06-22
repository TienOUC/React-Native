import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import AppNavigator from './navigator/AppNavigator'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'


const client = new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/qz5vkfi0i9ki/',
  credentials: 'same-origin',
  headers: {
    Authorization: `Bearer 7i-w8qyMFgYxyMgkSsgcW4f8gF6ZHe8GxHIRjEs9Up4`
  }
})

const initialState = {
  action: '',
  name: 'Admin',
  avatar: 'https://tva1.sinaimg.cn/large/007S8ZIlly1gftgvmed8ej303k03k742.jpg'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_ADMIN':
      return { ...state, action: 'openAdmin' }
    case 'CLOSE_ADMIN':
      return { ...state, action: 'closeAdmin' }
    case 'UPDATE_NAME':
      return { ...state, name: action.name }
    case 'UPDATE_AVATAR':
      return { ...state, avatar: action.avatar }
    case 'OPEN_CARD':
      return { ...state, action: 'openCard' }
    case 'CLOSE_CARD':
      return { ...state, action: 'closecard' }
    case 'OPEN_LOGIN':
      return { ...state, action: 'openLogin' }
    case 'CLOSE_LOGIN':
      return { ...state, action: 'closeLogin' }
    default:
      return state
  }
}

const store = createStore(reducer)

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </ApolloProvider>
)

export default App
