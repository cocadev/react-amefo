import React from "react";

export default class Panel extends React.Component {
  render() {
    return (
        <div className="row bg-landing-panel bg-white pt-5">
            <div className="container landing-panel">
                <span className="title-landing-panel">Un comercio eléctronico donde </span>
                <span className="text-landing-panel">todo será posible. </span>
                <div className="btn-landing-panel">
                    <span className="btnText-landing-panel">Follow Us</span>
                </div>
            </div>
        </div>
    );
  }
}
