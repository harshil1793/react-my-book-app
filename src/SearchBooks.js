import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    // books: PropTypes.array.isRequired
  }

  state = {
    books: [],
    query:'',
    noResultFound : false
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    });
    if (query) {
      BooksAPI.search(query, 10).then( (books) =>{
        this.setState({ books:books })
      })
      this.setState({
        noResultFound : true
      });
    }
  
    else {
      this.setState({
        books: [],
        noResultFound : false
      });
    }
  }

  render() {
    const { books } = this.state
    const { query } = this.state
    let { noResultFound } = this.state

    let showingBooks
    if(query && books.length > 0) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter( (book) => match.test(book.title))
      showingBooks.sort(sortBy('title'))
    }
    else{
      showingBooks = []
    }

    return (
      <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            {/* 
              SEARCH INPUT FIELD
            */}
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={ event => this.updateQuery(event.target.value)}
                autoFocus/>
            </div>
          </div>

          {/*
            RESULT OF BOOKS
          */}
          {showingBooks !== undefined && (
          <div className="search-books-results">
            <ol className="books-grid">
              {showingBooks.map( (book) =>(
                <li key={book.id}>
                  <div>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            <select value={book.shelf} >
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">
                          {book.authors}
                        </div>
                      </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
        {/*
          NO RESULT FOUND
        */}
        {showingBooks.length === 0 && noResultFound === true && (
          <div className="align-center">
            <p> No Result found</p>
          </div>
        )}
        </div>
    )
  }
}
export default SearchBooks