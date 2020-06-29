import React from "react";
// import img_receiver from "../../../assets/receiver.png";

export default class Blooth extends React.Component {

  render() {
    return (
      <div className="flex-center-col bg-white pb-5">

        <div className="col-sm-9 ">
          <div className='row blooth-view'>
            <div className='col-sm-5 ad-p-5'>
              <div className='font-size-29'>Bose Bluetooth</div>
              <div className='font-size-29'>Headphones</div>
              <div className='font-size-14 mt-2'>Crisp powerful sound from the best sounding wireless</div>
              <div className='font-size-14'>headphone in its class</div>
            </div>
            <div className='col-sm-3 ad-p-5'>
              <div className='font-size-16'>
                $260.50
              </div>
              <div className='font-size-27'>
                $219.05
                </div>
              <div className="input-group-append app-emaill-btn flex-center mt-4">
                <span className="text-white font-size-15">Shop Now</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-sm-9 mt-5">
          <div className='row'>
            <div className="col-sm-8 blooth-view-2 mt-5">
              <div className='row'>
                <div className='col-sm-5 ad-p-5'>
                  <div className='font-size-21 mt-4'>Fabric Bed</div>
                  <div className='font-size-21'>Discount</div>
                  <div className='font-size-14 mt-2'>Strong mattress support with 10 wood</div>
                  <div className='font-size-14'>prevents sagging and increases mattress</div>
                </div>
                <div className='col-sm-3 ad-p-5'>
                  <div className='font-size-16'>
                    $260.50
                  </div>
                  <div className='font-size-27'>
                    $219.05
                  </div>
                  <div className="input-group-append app-emaill-btn flex-center mt-4">
                    <span className="text-white font-size-15">Shop Now</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="offset-sm-1 col-sm-3 blooth-view-3 mt-5">
              <div className='ad-p-5 align-right'>
                <div className='font-size-21'>
                  Smart
                </div>
                <div className='font-size-21'>
                  Phones
                </div>
                <div className="input-group-append app-emaill-btn flex-center mt-4">
                  <span className="text-white font-size-15">Shop Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    );
  }
}

