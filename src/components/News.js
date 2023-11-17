import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: false,
    };
  }

  componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=d7486b4b71764dfbb783de6884d03f5e";
    fetch(url).then((res) => {
      res.json().then((result) => {
        console.log(result.articles);
        this.setState({ data: result.articles });
      });
    });
  }

  render() {
    return (
      <div className="container my-3">
        <h1>DAILY HEAD-LINES</h1>
        <div className="row">
          {this.state.data
            ? this.state.data.map((element) => {
                return (
                  <div className="col-md-4 my-3" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imgUrl={element.urlToImage}
                      newUrl={element.url}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default News;
