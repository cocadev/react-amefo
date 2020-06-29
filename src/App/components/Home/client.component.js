import React from "react";
import slider1 from "../../../assets/man.png";
// import slider2 from "../../../assets/slider2.jpg";
// import slider3 from "../../../assets/slider3.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Clients() {
    
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="bg-white pb-100">
            <Slider className="container" {...settings}>
                <div className="">
                    <div className="flex-row-start pt-100">
                        <img className="client-img ml-5" src={slider1} alt="slider 1" />
                        <div className="client-text ml-5">
                            <span className="notice-title-black ml-1">Comentarios de los </span><br />
                            <span className="notice-title-red ml-1">Clientes</span>
                            <h5 className="mt-4">Glenn Powers</h5>
                            <h6 className=""> Company</h6>
                        </div>
                    </div>

                    <div className="client-view flex-center p-5 ">
                        <h6 className="text-white client-texty">Only other business owners know how challenging and frustrating it is to try and secure financing. Nav made it easy and fast for me to sort through the chaos and then choose the best credit card that matched my business needs.</h6>
                    </div>
                </div>

                <div className="">
                    <div className="flex-row-start pt-100 ">
                        <img className="client-img ml-5" src={slider1} alt="slider 1" />
                        <div className="client-text ml-5">
                            <span className="notice-title-black">Comentarios de los </span><br />
                            <span className="notice-title-red">Clientes</span>
                            <h5 className="mt-4">Glenn Powers</h5>
                            <h6 className="">Company</h6>
                        </div>
                    </div>

                    <div className="client-view flex-center p-5 ">
                        <h6 className="text-white client-texty" >Only other business owners know how challenging and frustrating it is to try and secure financing. Nav made it easy and fast for me to sort through the chaos and then choose the best credit card that matched my business needs.</h6>
                    </div>
                </div>

            </Slider>
        </div>
    );
}

export default Clients;
