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
  name: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_ADMIN':
      return { action: 'openAdmin' }
    case 'CLOSE_ADMIN':
      return { action: 'closeAdmin' }
    case 'UPDATE_NAME':
      return { name: action.name }
    case 'OPEN_CARD':
      return { action: 'openCard' }
    case 'CLOSE_CARD':
      return { action: 'closecard' }
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
