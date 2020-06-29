import React from "react";
import { connect } from "react-redux";
import { getMostSells } from "../../Auth/eventActions";
import PropTypes from "prop-types";
import StarRatingComponent from "react-star-rating-component";
import loading from "../../../assets/loading.gif";
import Slider from "react-slick";
import { responsive } from "../../../config";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  console.log("className = ", className);
  return (
    <div
      className="slick-arrow"
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <i className="fas fa-angle-right arrow-right"></i>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className="slick-arrow"
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <i className="fas fa-angle-left arrow-left"></i>
    </div>
  );
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: responsive
};

class Topsells extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: null
    };

    this.props.getMostSells().then(p => {
      if (!p.data.error) this.setState({ products: p.data.products });
    });
  }

  renderProducts() {
    return (
      <Slider {...settings}>
        {this.state.products.map((item, key) => (
          <div key={item.id} className="shop-cool">
            <div className="shop-box" href={"/product?p=" + item.id}>
              <div className="align-right h-40">
                {/* {item.reduce !== 0 && <div className="shop-reduce text-white">-{item.reduce}%</div>} */}
              </div>
              <a href={"/product?p=" + item.id}>
                <center>
                  <img
                    className="shop-image"
                    src={item.image}
                    alt="{item.title}"
                  />
                </center>
              </a>
              <div className="shop-description">{item.title}</div>
              <div className="flex-row-start ml-2 mt-3">
                <StarRatingComponent
                  name="rate1"
                  starCount={5}
                  value={item.rate}
                  editing={false}
                />
                <div className="ml-2">{item.count}</div>
              </div>

              <div className="shop-price">
                {item.price && <span className="shop-real">${item.price}</span>}
                {/* {item.price && <span className="shop-row">${item.price}</span>} */}
                {item.high && <span className="shop-high">${item.high}</span>}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    );
  }

  render() {
    const { products } = this.state;

    return (
      <center>
        <div className="col-10 myrespon">
          <div className="simple-text mt-5 mb-4">
            Most Popular
          <span className="simple-text color-red"> Items</span>
          </div>
          {products ? (
            this.renderProducts()
          ) : (
              <div className="flex-center">
                <img className="loading" src={loading} alt="{loading}" />
              </div>
            )}
        </div>
      </center>
    );
  }
}

Topsells.propTypes = {
  getMostSells: PropTypes.func.isRequired
};

export default connect(
  null,
  { getMostSells }
)(Topsells);
