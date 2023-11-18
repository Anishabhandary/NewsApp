import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      data: null,
      loading: false,
      page: 1,
    };
  }

  componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d7486b4b71764dfbb783de6884d03f5e&page=1&pageSize=${this.props.pageSize}`;
    fetch(url).then((res) => {
      res.json().then((result) => {
        console.log(result.articles);
        this.setState({
          data: result.articles,
          totalResults: result.totalResults,
        });
      });
    });
  }

  handlePrevClick = async () => {
    console.log("prev");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=d7486b4b71764dfbb783de6884d03f5e&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    fetch(url).then((res) => {
      res.json().then((result) => {
        console.log(result.articles);
        this.setState({ data: result.articles, page: this.state.page - 1 });
      });
    });
  };
  handleNextClick = async () => {
    console.log("next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 15)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=d7486b4b71764dfbb783de6884d03f5e&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      fetch(url).then((res) => {
        res.json().then((result) => {
          console.log(result.articles);
          this.setState({ data: result.articles, page: this.state.page + 1 });
        });
      });
    }
  };

  render() {
    return (
      <div className="container my-3">
        <h1>DAILY HEAD-LINES</h1>
        <div className="row">
          {this.state.data
            ? this.state.data.map((element) => {
                return (
                  <>
                    <div className="col-md-4 my-3" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 45) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 88)
                            : ""
                        }
                        imgUrl={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://imgs.search.brave.com/GSlXkhNqfuj2CMM5a6N4MgX2OA-V2EiOLVnHrW3Hetc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzAzLzMyLzI5/LzM2MF9GXzMwMzMy/Mjk5NV9VY3FDT1lR/VzF1a05ma3BNVzBu/R0l2eGlpSGhGR2Uw/Yi5qcGc"
                        }
                        newUrl={element.url}
                      />
                    </div>
                  </>
                );
              })
            : null}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark"
            disabled={this.state.page <= 1}
            onClick={this.handlePrevClick}
          >
            &larr; prev
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
