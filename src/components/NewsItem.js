import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newUrl, author, publishedAt, source } =
      this.props;
    return (
      <div>
        <div className="card">
          <span
            class="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
            style={{ zIndex: "1", left: "85%" }}
          >
            {source}
          </span>
          <img
            src={imgUrl}
            className="card-img-top"
            alt="..."
            style={{ height: "265px", width: "354px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p class="card-text">
              <small class="text-body-secondary">
                by {author ? author : "Unknown"} on{" "}
                {new Date(publishedAt).toGMTString()}
              </small>
            </p>
            <a
              href={newUrl}
              target="
            _blank"
              className="btn btn-sm"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Read More...
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
