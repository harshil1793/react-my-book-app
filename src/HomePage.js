import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BookShelf extends Component {
  state= {
    shelfStatus: ''
  }
  // change(event){
  //        this.setState({value: event.target.value});
  //    }
  render() {
    const bookShelf = this.props.bookShelf

    return <ol className="books-grid">
      {bookShelf.map( (book) => (
        <li key={book.id}>
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select id="lang" onChange={(event) => (
                    this.props.change(event.target.value, book.id)
                  )} value={book.shelf}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
          </div>
        </li>
        ))}
    </ol>
  }
}

class HomePage extends Component {
  state = {
    value: '',
    id: '',
    booksh: []
  }
  componentDidMount(){
    BooksAPI.getAll().then( (booksh) =>{
      this.setState({ booksh })
    })
  }
  change = (shelf, book) => {
      BooksAPI.update(book, shelf).then(
      this.setState({ value: value, id: id})
        )
    }
  render() {
    // this.state.booksh =this.props.books
    const books = this.state.booksh
    const currentlyReading = books.filter(books => books.shelf === 'currentlyReading')
    const wantToRead = books.filter(books => books.shelf === 'wantToRead')
    const read = books.filter(books => books.shelf === 'read')
    
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <BookShelf bookShelf={currentlyReading} change={this.change}/>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <BookShelf bookShelf={wantToRead} change={this.change}/>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <BookShelf bookShelf={read} change={this.change}/>
                </div>
              </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default HomePage
