import React from "react";

function Footer() {
  return (
    <footer className="section footer-classic bg-theme">

      <div className="container-fluid">

        <div className="row flex-center">
          
          <div className="col-10">
            <div className="row mt-5">
              <div className="col box-container card-view">
                <i className="fas fa-rocket text-danger font-size-40 mt-2 mr-4"></i>
                <div>
                  <span className="item-title">Free Delivery</span><br />
                  <span className="item-text">For all oders over $99</span>
                </div>
              </div>
              <div className="col box-container card-view">
                <i className="fas fa-sync text-danger font-size-40 mt-2 mr-4"></i>
                <div>
                  <span className="item-title">90 Days Return</span><br />
                  <span className="item-text">If goods have problems</span>
                </div>
              </div>
              <div className="col box-container card-view">
                <i className="far fa-credit-card text-danger font-size-40 mt-2 mr-4"></i>
                <div>
                  <span className="item-title">Secure Payment</span><br />
                  <span className="item-text">100% secure payment</span>
                </div>
              </div>
              <div className="col box-container card-view-right-none mr-4">
                <i className="fas fa-mail-bulk  text-danger font-size-40 mt-2 mr-4"></i>
                <div>
                  <span className="item-title">24/7 Support</span><br />
                  <span className="item-text">Dedicated support</span>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <hr className="bg-white" />
            </div>
          </div>
        </div>

        <div className="row row-30">

          <div className="offset-sm-1 col-md-3 col-xl-2 mt-3">
            <div className="pr-xl- mt-5">
              <p className="footer-thin-text font-weight-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc iaculis, quam ac rutrum blandit, tellus augue gravida
              </p>
              <p>
                <span><i className="fab fa-facebook-f ml-1"></i></span>
                <span><i className="fab fa-twitter ml-2"></i></span>
                <span><i className="fab fa-instagram ml-2"></i></span>
                <span><i className="fab fa-skype ml-2"></i></span>
              </p>
            </div>
          </div>
          <div className="col-md-3 offset-sm-1 mt-3">
            <h5>QUICK LNKS</h5>
            <div className="contact-list mt-3">
              <span>Categories</span><br />
              <span>Help</span><br />
              <span>About Us</span><br />
              <span>Community</span><br />
              <span>Sign Up</span>
            </div>
          </div>
          <div className="col-md-3 col-xl-3 offset-sm-1 mt-3">
            <h5>CONTACT US</h5>
            <div className="contact-list mt-3">
              <span>
                <a href="https://www.instagram.com/alivmarketing/" className='text-white'>
                  <i className="fas fa-map-marker-alt mr-3"></i>
                  640 Glenoaks Blvd
                  San Fernando,
                  CA 91340
                </a>
              </span><br />
              <span>
                <a href="https://www.instagram.com/alivmarketing/" className='text-white'>
                  <i className="fas fa-phone mr-3"></i>
                  0123458
                </a>
              </span><br />
              <span>
                <a href="https://twitter.com/AlivMarketing" className='text-white'>
                  <i className="fas fa-mail-bulk mr-3"></i>
                  info @amefo.com
                </a>
              </span><br />
              <span>
                <a href="https://www.facebook.com/alivmarketing" className='text-white'>
                  <i className="far fa-clock mr-3"></i>
                  Mon - Sat  | 9am - 8pm
                </a>
              </span><br />
            </div>
          </div>
        </div>

      </div>

    </footer>
  );
}

export default Footer;
