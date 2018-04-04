import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getBook, updateBook, clearBook, deleteBook } from '../../actions';

class EditBook extends PureComponent {
  state = {
    formdata: {
      _id: this.props.match.params.id,
      name: '',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: '',
    },
  };

  componentWillMount() {
    this.props.dispatch(getBook(this.props.match.params.id));
  }

  componentWillReceiveProps(nextProps) {
    const book = nextProps.books.book;
    this.setState({
      formdata: {
        _id: book._id,
        name: book.name,
        author: book.author,
        review: book.review,
        pages: book.pages,
        rating: book.rating,
        price: book.price,
      },
    });
  }

  componentWillUnmount() {
    this.props.dispatch(clearBook());
  }

  handleInput = (event, name) => {
    const newFormData = { ...this.state.formdata };
    newFormData[name] = event.target.value;
    this.setState({
      formdata: newFormData,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    this.props.dispatch(updateBook(this.state.formdata));
  };

  deletePost = () => {
    this.props.dispatch(deleteBook(this.props.match.params.id));
  };

  redirectUser = () => {
    setTimeout(() => {
      this.props.history.push('/user/user-reviews');
    }, 2000);
  };

  render() {
    console.log(this.props);
    const books = this.props.books;
    return (
      <div className="rl_container article">
        {books.updatebook ? (
          <div className="edit_confirm">
            Post updated, <Link to={`/books/${books.book._id}`}>Click here to see your post</Link>
          </div>
        ) : null}
        {books.postdeleted ? (
          <div className="red_tag">
            Post deleted
            {this.redirectUser()}
          </div>
        ) : null}

        <form onSubmit={this.submitForm}>
          <h2>Edit review</h2>

          <div className="form_element">
            <input
              type="text"
              placeholder="Enter name"
              value={this.state.formdata.name}
              onChange={event => this.handleInput(event, 'name')}
            />
          </div>
          <div className="form_element">
            <input
              type="text"
              placeholder="Enter author"
              value={this.state.formdata.author}
              onChange={event => this.handleInput(event, 'author')}
            />
          </div>
          <div className="form_element">
            <textarea
              value={this.state.formdata.review}
              onChange={event => this.handleInput(event, 'review')}
            />
          </div>
          <div className="form_element">
            <input
              type="number"
              placeholder="Enter pages"
              value={this.state.formdata.pages}
              onChange={event => this.handleInput(event, 'pages')}
            />
          </div>
          <div className="form_element">
            <select
              value={this.state.formdata.rating}
              onChange={event => this.handleInput(event, 'rating')}
            >
              <option val="1">1</option>
              <option val="2">2</option>
              <option val="3">3</option>
              <option val="4">4</option>
              <option val="5">5</option>
            </select>
          </div>
          <div className="form_element">
            <input
              type="number"
              placeholder="Enter price"
              value={this.state.formdata.price}
              onChange={event => this.handleInput(event, 'price')}
            />
          </div>
          <button type="submit">Edit review</button>
          <div className="delete_post">
            <div
              className="button"
              onClick={this.deletePost}
              onKeyPress={this.deletePost}
              role="button"
              tabIndex="0"
            >
              Delete review
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books,
});

export default connect(mapStateToProps)(EditBook);
