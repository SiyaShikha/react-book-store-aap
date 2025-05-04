import { Component } from "react";

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
  constructor(props) {
    super(props);
  }

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
    };
  }

  handleSearch = (query) => {
    this.setState({ searchText: query });
  };

  handleCriterionChange = (criterion) => {
    this.setState({ searchCriterion: criterion });
  };

  render() {
    const { books, searchText, searchCriterion } = this.state;

    const filteredBooks = books.filter((book) => {
      const lowerCaseSearchText = searchText.toLowerCase();
      if (searchCriterion === "title") {
        return book.title.toLowerCase().includes(lowerCaseSearchText);
      } else if (searchCriterion === "author") {
        return book.author.toLowerCase().includes(lowerCaseSearchText);
      } else if (searchCriterion === "year") {
        return book.year.toString().includes(lowerCaseSearchText);
      }
      return false;
    });

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
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book, index) => (
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
