import React from "react";
import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
import { getProduct, addToCart } from "../../Auth/eventActions";
import PropTypes from "prop-types";
import Header from "../Header/header.component";
import Footer from "../Footer/footer.component";
import "../../styles/product.scss";
import loading from "../../../assets/loading.gif";

import { SERVER_URL } from "../../../config";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };

    this.addToCart = this.addToCart.bind(this);
    if (this.props.location.search) {
      let params = this.props.location.search.substr(1);
      let paramsArr = params.split("&");
      paramsArr.forEach(param => {
        if (param.split("=")[0] === "p") {
          let productId = param.split("=")[1];
          this.props.getProduct(productId).then(res => {
            let product = res.data.product;
            if (product) {
              this.setState({ product: product });
            }
          });
        }
      });
    }
  }

  addToCart(e) {
    this.props
      .addToCart({
        productId: e.target.id,
        userId: this.props.auth.user.id
      })
      .then(resp => {
        this.refreshCart();
      });
  }

  refreshCart() { }

  render() {
    let htmlProduct = "";
    if (this.state.product) {
      htmlProduct = (
        <div>
          <div
            className="modal fade"
            id="sellModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="sellModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <div
                    className="modal-title max-width text-center"
                    id="sellModalLabel"
                  >
                    <div className="title">Vender Producto</div>
                  </div>
                </div>
                <div className="modal-body">
                  <div className="modal-qr-container1">
                    <div className="text-center qr-container">
                      <img
                        alt="qr code"
                        src={
                          "https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=" +
                          SERVER_URL +
                          "/order-form?pid=" +
                          this.state.product.id +
                          "$" +
                          this.props.auth.user.id
                        }
                      />
                    </div>
                  </div>
                  <div className="sell-modal-price">
                    Precio: <span>3000€</span> - Tu comision(3%): <b>90€</b>
                  </div>
                  <div className="sell-about">
                    Con el siguiente link podras vender el producto el cliente
                    solo tendra que entrar en el link y realizar el pago.
                  </div>
                  <div className="sell-description">
                    Tu link de venta:
                    <a
                      href={
                        SERVER_URL +
                        "/order-form?pid=" +
                        this.state.product.id +
                        "$" +
                        this.props.auth.user.id
                      }
                    >
                      {SERVER_URL +
                        "/order-form?pid=" +
                        this.state.product.id +
                        "$" +
                        this.props.auth.user.id}
                    </a>
                  </div>
                  <div className="text-center sell-modal-button">
                    <button className="btn btn-info">Imprimir</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content">
            <div className="normal-title indice">
              Categoria
              <span className="subindice">-> Categoria -> Categoria</span>
            </div>
            <div className="row">
              <div className="row col-7">
                <div className="col-3">
                  <div className="mini-image-container">
                    <img
                      alt="image1"
                      src={
                        this.state.product.images
                          ? this.state.product.images[0]
                          : ""
                      }
                    />
                  </div>
                  <div className="mini-image-container">
                    <img
                      alt="image2"
                      src={
                        this.state.product.images
                          ? this.state.product.images[1]
                          : ""
                      }
                    />
                  </div>
                  <div className="mini-image-container">
                    <img
                      alt="image3"
                      src={
                        this.state.product.images
                          ? this.state.product.images[2]
                          : ""
                      }
                    />
                  </div>
                  <div className="mini-image-container">
                    <img
                      alt="image4"
                      src={
                        this.state.product.images
                          ? this.state.product.images[3]
                          : ""
                      }
                    />
                  </div>
                </div>
                <div className="col-9 ">
                  <div className="image-container">
                    <img
                      alt="image1"
                      src={
                        this.state.product.images
                          ? this.state.product.images[0]
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-5 main-details">
                <div className="product-title">
                  <div>{this.state.product.title}</div>
                </div>
                <div className="product-valoration">******</div>
                <div className="product-price">{this.state.product.price}€</div>
                <div className="row product-caracteristicas">
                  <div className="col-6 ">
                    <div className="car-title">
                      Autonomia: <span className="car-value">Value</span>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="car-title">
                      Autonomia: <span className="car-value">Value</span>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="car-title">
                      Autonomia: <span className="car-value">Value</span>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="car-title">
                      Autonomia: <span className="car-value">Value</span>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="car-title">
                      Autonomia: <span className="car-value">Value</span>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="car-title">
                      Autonomia: <span className="car-value">Value</span>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="car-title">
                      Autonomia: <span className="car-value">Value</span>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="car-title">
                      Autonomia: <span className="car-value">Value</span>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="car-title">
                      Autonomia: <span className="car-value">Value</span>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <div className="car-title">
                      Autonomia: <span className="car-value">Value</span>
                    </div>
                  </div>
                </div>
                <div className="product-min-description">
                  {this.state.product.minDetail}
                </div>

                {(this.props.auth && this.props.auth.user.type) === "seller" ? (
                  <div className="product-buttons">
                    <button
                      className="btn btn-success m-l-15"
                      data-toggle="modal"
                      data-target="#sellModal"
                    >
                      Vender
                    </button>
                    <button
                      id={this.state.product.id}
                      onClick={this.addToCart}
                      className="btn btn-info"
                    >
                      Añadir a mi lista
                    </button>
                    <a
                      href={
                        SERVER_URL +
                        "/order-form?pid=" +
                        this.state.product.id +
                        "$" +
                        this.props.auth.user.id
                      }
                      className="btn btn-success m-l-15"
                    >
                      Comprar
                    </a>
                  </div>
                ) : (
                    <a
                      href={
                        SERVER_URL +
                        "/order-form?pid=" +
                        this.state.product.id +
                        "$" +
                        this.props.auth.user.id
                      }
                      className="btn btn-success m-l-15"
                    >
                      Comprar
                  </a>
                  )}
              </div>
            </div>
            <div className="normal-title">Lista mas vendidos</div>
            <div className="row items-container">
              <div className="box-item">
                <div className="item-title">Toy Car</div>
                <div className="item-image">
                  <img alt="lista vendidos imagen" src="./assets/car.png" />
                </div>
                <div className="line" />
                <div className="item-price">1000€</div>
                <div className="item-subtitle">description</div>
              </div>
              <div className="box-item">
                <div className="item-title">Toy Car</div>
                <div className="item-image">
                  <img alt="lista vendidos imagen" src="./assets/car.png" />
                </div>
                <div className="line" />
                <div className="item-price">1000€</div>
                <div className="item-subtitle">description</div>
              </div>
            </div>
            <div className="normal-title">Descripcion</div>
            <div className="row">
              <div className="col-9">
                <div className="description">
                  {ReactHtmlParser(this.state.product.detail)}
                </div>
                <div className="normal-title">
                  Otros productos que te pueden interesar
                </div>
                <div className="row items-container">
                  <div className="box-item">
                    <div className="item-title">Toy Car</div>
                    <div className="item-image">
                      <img alt="lista vendidos imagen" src="./assets/car.png" />
                    </div>
                    <div className="line" />
                    <div className="item-price">1000€</div>
                    <div className="item-subtitle">description</div>
                  </div>
                </div>
              </div>
              <div className="col-3 ads">
                <div className="product-ads">google ads</div>
                <div className="product-ads">web ads</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Header
          refreshCart={click => (this.refreshCart = click)}
          history={this.props.history}
        />
        {this.state.product
          ? htmlProduct
          : <div className='loading-view'>
              <img className='loading' src={loading} alt="{loading}" />
            </div>
         }
        <Footer />
      </div>
    );
  }
}

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user
  };
}
export default connect(
  mapStateToProps,
  { getProduct, addToCart }
)(Product);
