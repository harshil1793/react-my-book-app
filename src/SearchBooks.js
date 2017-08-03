import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    books: [],
     query:''
  }
  
  updateQuery = (query) => {
      this.setState({ query: query.trim() })
      BooksAPI.search(query, 10).then( (books) =>{
        this.setState({ books:books })
      })
        console.log(this.state.query);
  }

  render() {
    console.log('searchquery: ', this.state.newbooks)
    const { books } = this.state
    const { query } = this.state

    let showingBooks,tempBooks
    if(query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      tempBooks = books.filter( (book) => match.test(book.title))
      if(tempBooks.length>0) {
        showingBooks = books.filter( (book) => match.test(book.title))
        showingBooks.sort(sortBy('title'))
      }
    }
    else{
          showingBooks = books
    }
    return (
      <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}/>
            </div>
          </div>
          {showingBooks != undefined && (
          <div className="search-books-results">
            <ol className="books-grid">
              {showingBooks.map( (book) =>(
                <li key={book.id}>
                  <div>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            <select>
                              <option value="none" disabled>Move to...</option>
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
        </div>
    )
  }
}
export default SearchBooks
