import React from "react";
import { connect } from "react-redux";
import { getFeaturedProds } from "../../Auth/eventActions";
import PropTypes from "prop-types";

import icon_search from "../../../assets/ico_search_layer.png";
import ico_sofa from "../../../assets/ico_sofa.png";
import ico_tvd from "../../../assets/ico_tvd.png";
import ico_joystick from "../../../assets/ico_joystick.png";
import ico_iphonex from "../../../assets/ico_iphonex.png";
import ico_cam from "../../../assets/ico_cam.png";
import ico_laptop from "../../../assets/ico_laptop.png";

import icon_1 from "../../../assets/round-icon-1.png";
import icon_2 from "../../../assets/round-icon-2.png";
import icon_3 from "../../../assets/round-icon-3.png";
import icon_4 from "../../../assets/round-icon-4.png";
import icon_5 from "../../../assets/round-icon-5.png";
import icon_6 from "../../../assets/round-icon-6.png";


const products = [
  { id: 1, title: 'Macbook Air', image: ico_laptop },
  { id: 2, title: 'Nikon D60', image: ico_cam },
  { id: 3, title: 'IPhoneX', image: ico_iphonex },
  { id: 4, title: 'Playstation 5', image: ico_joystick },
  { id: 5, title: 'Samsung TV', image: ico_tvd },
  { id: 6, title: 'Electric Chairs', image: ico_sofa },
]

const categories = [
  {
    id: 1, title: 'Laptops & Mac', img: icon_1,  items: [
      { uid: 2, name: 'Windows' },
      { uid: 3, name: 'Nikon' },
      { uid: 4, name: 'Samsung' },
      { uid: 5, name: 'Samsung' },
      { uid: 6, name: 'Samsung' },
      { uid: 13, name: 'Accessories' },
      { uid: 14, name: 'Samsung' },
      { uid: 15, name: 'Mobile Phones' },
      { uid: 16, name: 'Compunters' },

    ]
  },
  {
    id: 2, title: 'Camera & Photography', img: icon_2, items: [
      { uid: 1, name: 'Apple Products' },
      { uid: 2, name: 'Accessories' },
      { uid: 3, name: 'Samsung' },
      { uid: 4, name: 'Mobile Phones' },
      { uid: 5, name: 'Refrigerators' },
      { uid: 6, name: 'Networking' },
    ]
  },
  {
    id: 3, title: 'Mobile & Tablets', img: icon_3, items: [
      { uid: 1, name: 'Apple Products' },
      { uid: 2, name: 'Windows' },
      { uid: 3, name: 'Accessories' },
      { uid: 4, name: 'Samsung' },
      { uid: 5, name: 'Mobile Phones' },
      { uid: 6, name: 'Compunters & Networking' },
    ]
  },
  {
    id: 4, title: 'Gaming Consoles', img: icon_4, items: [
      { uid: 1, name: 'Gaming Consoles' },
      { uid: 2, name: 'Windows' },
      { uid: 3, name: 'Accessories' },
      { uid: 4, name: 'Samsung' },
      { uid: 5, name: 'Mobile Phones' },
      { uid: 6, name: 'Compunters' },
    ]
  },
  {
    id: 5, title: 'TV & Audio', img: icon_5, items: [
      { uid: 1, name: 'Apple Products' },
      { uid: 2, name: 'Windows' },
      { uid: 3, name: 'Accessories' },
      { uid: 4, name: 'Samsung' },
      { uid: 5, name: 'Mobile Phones' },
      { uid: 6, name: 'Compunters' },
    ]
  },
  {
    id: 6, title: 'Accesories', img: icon_6, items: [
      { uid: 1, name: 'Apple Products' },
      { uid: 2, name: 'Windows' },
      { uid: 3, name: 'Accessories' },
      { uid: 4, name: 'Samsung' },
      { uid: 5, name: 'Mobile Phones' },
      { uid: 6, name: 'Compunters' },
    ]
  },
]

class Trending extends React.Component {
  constructor(props) {
    super(props);
    this.props.getFeaturedProds().then(p => {
      if (!p.data.error) this.setState({ products: p.data.products });
    });
  }

  render() {

    const items = products.map((item) => (
      <div key={item.id}>
        <div className="t-box">
          <div className='trend-header'>
            <img src={icon_search} alt="{item.title}" />
          </div>
          <div className="trending-box">
            <div className="trend-box">
              <img src={item.image} alt="{item.title}" />
              <div className="trend-text mt-1">{item.title}</div>
            </div>
          </div>
        </div>
      </div>
    ));

    const popular = categories.map((item) => (
      <div className="c-box" key={item.id}>
         <div className='trending-header'>
           <div className='flex-row-start align-items-center'>
              <img src={item.img} alt="{item.title}" />
              <h5 className='ml-2'>{item.title}</h5>
           </div>
           <h6 className='text-danger font-size-11'>View All</h6>
         </div>
         <div className='m-1 mt-3'>
           { item.items.map((x) => (
             <div key={x.uid} className="c-panel">{x.name}</div>
           ))}
         </div>
      </div>
    ));

    return (
      <div className="flex-center-col bg-white pb-5">
        <div className="col-sm-9">
          <div className="simple-text pt-5 pb-4 pl-3">Trending on
            <span className="simple-text color-red"> Products</span>
          </div>
          <div className="row align-justify">{items}</div>
        </div>
        <br />
        <div className="col-sm-9">
          <div className="simple-text pt-5 pl-3">Most Popular
            <span className="simple-text color-red"> Categories</span>
          </div>
          <div className="row align-justify">{popular}</div>
        </div>

      </div>
    );
  }
}

Trending.propTypes = {
  getFeaturedProds: PropTypes.func.isRequired
};

export default connect(
  null,
  { getFeaturedProds }
)(Trending);
