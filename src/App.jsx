import { Component } from "react";
import lodash from "lodash";
import "./App.css";

const books = [
  { title: "Book A", author: "Author X", year: 2021 },
  { title: "Book B", author: "Author Y", year: 2020 },
  { title: "Book C", author: "Author Z", year: 2019 },
  { title: "Book D", author: "Author X", year: 2018 },
  { title: "Book E", author: "Author Y", year: 2017 },
  { title: "Book F", author: "Author Z", year: 2016 },
  { title: "Book G", author: "Author X", year: 2015 },
  { title: "Book H", author: "Author Y", year: 2014 },
  { title: "Book I", author: "Author Z", year: 2014 },
];

class SearchBookBox extends Component {
  render() {
    return (
      <>
        <h2>Search Books</h2>
        <div>
          <input
            type="text"
            placeholder="Search..."
            onChange={(event) => this.props.onSearch(event.target.value)}
          />
          <select
            onChange={(event) =>
              this.props.onCriterionChange(event.target.value)
            }
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="year">Year</option>
          </select>
        </div>
      </>
    );
  }
}

class BookStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: books,
      searchText: "",
      searchCriterion: "title",
      sortColumn: null,
      sortAscending: true,
    };
  }

  handleSearch = (query) => {
    this.setState({ searchText: query });
  };

  handleCriterionChange = (criterion) => {
    this.setState({ searchCriterion: criterion });
  };

  handleSort = (column) => {
    this.setState((prevState) => {
      const isSameColumn = prevState.sortColumn === column;
      const sortAscending = isSameColumn ? !prevState.sortAscending : true;
      return {
        sortColumn: column,
        sortAscending,
      };
    });
  };

  filterBooks(books, searchText, searchCriterion) {
    const lowerCaseSearchText = searchText.toLowerCase();
    return books.filter((book) =>
      book[searchCriterion]
        ?.toString()
        .toLowerCase()
        .includes(lowerCaseSearchText)
    );
  }

  render() {
    const { books, searchText, searchCriterion, sortColumn, sortAscending } =
      this.state;

    const filteredBooks = this.filterBooks(books, searchText, searchCriterion);
    const sortedBooks = lodash.orderBy(
      filteredBooks,
      sortColumn,
      sortAscending ? "asc" : "desc"
    );

    return (
      <>
        <SearchBookBox
          onSearch={this.handleSearch}
          onCriterionChange={this.handleCriterionChange}
        />
        <h2>Book Collection</h2>
        <div>
          <table border="1">
            <thead>
              <tr>
                <th
                  onClick={() => this.handleSort("title")}
                  role="button"
                  className="clickable-header"
                >
                  Title
                  {sortColumn === "title" ? (sortAscending ? "↑" : "↓") : ""}
                </th>
                <th
                  onClick={() => this.handleSort("author")}
                  role="button"
                  className="clickable-header"
                >
                  Author
                  {sortColumn === "author" ? (sortAscending ? "↑" : "↓") : ""}
                </th>
                <th
                  onClick={() => this.handleSort("year")}
                  role="button"
                  className="clickable-header"
                >
                  Year
                  {sortColumn === "year" ? (sortAscending ? "↑" : "↓") : ""}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedBooks.map((book, index) => (
                <tr key={index}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default BookStore;
