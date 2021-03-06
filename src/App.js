import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import HomePage from './HomePage'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     books: [],
    showSearchPage: true
  }
  render() {
    return (
      <div className="app" >
        <Route exact path="/" render={() =>(
            <HomePage/>
          )}/>
        <Route path="/search" render={() =>(
            <SearchBooks/>
          )}/>
      </div>
    )
  }
}

export default BooksApp
