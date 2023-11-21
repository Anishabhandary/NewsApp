import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
// import Spinner from "./Spinner";

const News = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeTitle = (docTitle) => {
    return docTitle.charAt(0).toUpperCase() + docTitle.slice(1);
  };

  useEffect(() => {
    document.title = `NewsDaily|${capitalizeTitle(props.category)}`;
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    // props.setProgress(30);
    fetch(url).then((res) => {
      res.json().then((result) => {
        console.log(result.articles);
        props.setProgress(100);
        setData(result.articles);
        setTotalResults(result.totalResults);
        setLoading(false);
      });
    });
    // eslint-disable-next-line
  }, []);

  const handlePrevClick = () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page - 1
    }&pageSize=${props.pageSize}`;
    setLoading(true);
    fetch(url).then((res) => {
      res.json().then((result) => {
        console.log(result.articles);
        props.setProgress(100);
        setData(result.articles);
        setPage(page - 1);
        setLoading(false);
      });
    });
  };
  const handleNextClick = () => {
    props.setProgress(10);
    if (page + 1 > Math.ceil(totalResults / props.pageSize)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        props.country
      }&category=${props.category}&apiKey=${props.apiKey}&page=${
        page + 1
      }&pageSize=${props.pageSize}`;
      setLoading(true);
      fetch(url).then((res) => {
        res.json().then((result) => {
          console.log(result.articles);
          props.setProgress(100);
          setData(result.articles);
          setPage(page + 1);
          setLoading(false);
        });
      });
    }
  };

  return (
    <div className="container my-3">
      <h1 style={{ marginTop: "80px" }}>
        DAILY HEAD-LINES on {capitalizeTitle(props.category)}
      </h1>
      {/* {loading && <Spinner />} */}
      <div className="row">
        {data
          ? !loading &&
            data.map((element) => {
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
                      author={element.author}
                      publishedAt={element.publishedAt}
                      source={element.source.name}
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
          disabled={page <= 1}
          onClick={handlePrevClick}
        >
          &larr; prev
        </button>
        <button
          type="button"
          className="btn btn-dark"
          disabled={page + 1 > Math.ceil(totalResults / props.pageSize)}
          onClick={handleNextClick}
        >
          next &rarr;
        </button>
      </div>
    </div>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: "8",
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.string,
  category: PropTypes.string,
};
export default News;
