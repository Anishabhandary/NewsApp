import React from "react";

const NewsItem = (props) => {
  let { title, description, imgUrl, newUrl, author, publishedAt, source } =
    props;
  return (
    <div>
      <div className="card">
        <div>
          <span
            class="badge rounded-pill bg-danger"
            style={{
              display: "flex",
              position: "absolute",
              right: "0",
            }}
          >
            {source}
          </span>
        </div>

        <img
          src={imgUrl}
          className="card-img-top"
          alt="..."
          // style={{ height: "265px", width: "354px" }}
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
};

export default NewsItem;
