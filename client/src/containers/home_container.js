import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBooks } from '../actions';
import BookItem from '../widgetsUI/book_item';

class HomeContainer extends Component {
  componentWillMount() {
    this.props.dispatch(getBooks(4, 0, 'desc'));
  }

  loadmore = () => {
    const count = this.props.books.list.length;
    this.props.dispatch(getBooks(2, count, 'desc', this.props.books.list));
  };

  renderItems = books =>
    (books.list ? books.list.map(item => <BookItem {...item} key={item._id} />) : null);

  render() {
    return (
      <div>
        {this.renderItems(this.props.books)}
        <div
          className="loadmore"
          role="button"
          tabIndex={0}
          onClick={this.loadmore}
          onKeyPress={this.loadmore}
        >
          Load More
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  books: state.books,
});

export default connect(mapStateToProps)(HomeContainer);
