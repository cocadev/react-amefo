import React from "react";
import app from "../../../assets/two-app.png";
import btn_applestore from "../../../assets/btn-app-store.png";
import btn_appstore from "../../../assets/btn-play-store.png";

export default class Mobile extends React.Component {
  render() {
    return (
        <div className="bg-mobile pt-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-xs-12">
                        <img className="app-image" src={app} alt="slider 1" />
                    </div>
                    <div className="col-lg-6 col-xs-12">
                        <span className="notice-title-red">Descargar</span><br/>
                        <span className="notice-title-black">
                            <span className="notice-title-red mr-2">Amefo</span>ahora!
                        </span><br/><br/>
                        <span className="app-text">Shopping fastly and easily more with our app. Get a link to download the app on your phone</span>

                        <div className="input-group mt-3 flex-center">
                            <input type="text" className="form-control" placeholder="Email Address" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                            <div className="input-group-append app-emaill-btn-2 flex-center">
                                <span className="text-white">Search</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <img className="app-btn-image-1" src={btn_appstore} alt="slider 1" />
                            <img className="app-btn-image-2" src={btn_applestore} alt="slider 1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
