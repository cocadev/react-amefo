import React from "react";
import './style.landing.css';
import icon_3 from "../../../assets/3-layers.png";
import ico_camera from "../../../assets/ico_camera.png";
import ico_computer from "../../../assets/ico_computer.png";
import ico_controller from "../../../assets/ico_controller.png";
import ico_phone from "../../../assets/ico_phone.png";
import ico_plug from "../../../assets/ico_plug.png";
import ico_tv from "../../../assets/ico_tv.png";


const text = "Diseña tu éxito de la mano de Amefo, el comercio electrónico que llega para revolucionar España.";

function Landing() {
    return (
        <div className="row bg-landing">
            <div className="container my-auto">
                <div className="head-text">{text}</div><br />
                <div className="bg-panel">
                    <div className="ico-list">
                        <div className="ico-view">
                            <img className="d-block ico-size-0" src={icon_3} alt="slider 1" />
                            <div className="ico-text-2 mt-3">Search for:</div>
                        </div>
                        <div className="ico-view">
                            <img className="d-block ico-size-1" src={ico_computer} alt="slider 1" />
                            <div className="ico-text mt-2">Computers</div>
                        </div>

                        <div className='vertical-line'></div>

                        <div className="ico-view">
                            <img className="d-block ico-size-2" src={ico_camera} alt="slider 1" />
                            <div className="ico-text mt-2">Photography</div>
                        </div>

                        <div className='vertical-line'></div>

                        <div className="ico-view">
                            <img className="d-block ico-size-3" src={ico_phone} alt="slider 1" />
                            <div className="ico-text mt-2">Smart Phones</div>
                        </div>

                        <div className='vertical-line'></div>

                        <div className="ico-view">
                            <img className="d-block ico-size-4" src={ico_controller} alt="slider 1" />
                            <div className="ico-text mt-2">Games & Consoles</div>
                        </div>

                        <div className='vertical-line'></div>

                        <div className="ico-view">
                            <img className="d-block ico-size-5" src={ico_tv} alt="slider 1" />
                            <div className="ico-text">TV & Audio</div>
                        </div>

                        <div className='vertical-line'></div>

                        <div className="ico-view">
                            <img className="d-block ico-size-6" src={ico_plug} alt="slider 1" />
                            <div className="ico-text">Accessories</div>
                        </div>
                    </div>

                    <div className="input-group flex-center">
                        <input type="text" className="form-control" placeholder="Email Address" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append app-emaill-btn-2 flex-center">
                            <div className="text-white"><i className="fas fa-search mr-2"></i>SEARCH</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Landing;
