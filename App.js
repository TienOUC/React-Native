import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import AppNavigator from './navigator/AppNavigator'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag'

const CardsQuery = gql`
  {
  cardsCollection {
    items {
      title
      subtitle
      image {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      logo {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
      caption
    }
  }
}
`

const client = new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/qz5vkfi0i9ki/',
  credentials: 'same-origin',
  headers: {
    Authorization: `Beaeer dFfRm4ut7GxB4aRns4jZtidssrwFQ0vAojIS_1MUY34`
  }
})

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
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  </ApolloProvider>
)

export default App
