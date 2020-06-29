import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../Header/header.component";
import Footer from "../Footer/footer.component";
import { getFollowProduct, setReviewOrder } from "../../Auth/eventActions";
import "react-image-crop/dist/ReactCrop.css";
import "../../styles/follow-product.scss";

class FollowOrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      followObj: null,
      starSeller: 0,
      starQuality: 0,
      starTime: 0,
      detailReview: "",
      followId: ""
    };

    this.setStarSeller = this.setStarSeller.bind(this);
    this.setStarQuality = this.setStarQuality.bind(this);
    this.setStarTime = this.setStarTime.bind(this);
    this.setReview = this.setReview.bind(this);
    this.setDetailReview = this.setDetailReview.bind(this);

    if (this.props.location.search) {
      let params = this.props.location.search.substr(1);
      let paramsArr = params.split("&");
      paramsArr.forEach(param => {
        if (param.split("=")[0] === "fid") {
          let followId = param.split("=")[1];
          console.log(followId);
          this.props.getFollowProduct(followId).then(res => {
            let product = res.data.product;
            let followObj = res.data.followObj;
            console.log(res);
            if (product) {
              this.setState({
                product: product,
                followObj,
                followId
              });
            }
          });
        }
      });
    }
  }
  setStarSeller(e) {
    this.setState({ starSeller: parseInt(e.target.id.split("-")[1]) });
  }
  setStarQuality(e) {
    this.setState({ starQuality: parseInt(e.target.id.split("-")[1]) });
  }
  setStarTime(e) {
    this.setState({ starTime: parseInt(e.target.id.split("-")[1]) });
  }

  setDetailReview(e) {
    this.setState({ detailReview: e.target.value });
  }

  setReview() {
    this.props
      .setReviewOrder({
        orderId: this.state.followObj.id,
        productId: this.state.followObj.productId,
        sellerId: this.state.followObj.sellerId,
        publisherId: this.state.followObj.publisherId,
        starSeller: this.state.starSeller,
        starQuality: this.state.starQuality,
        starTime: this.state.starTime,
        detailReview: this.state.detailReview
      })
      .then(res => {
        this.props.getFollowProduct(this.state.followId).then(res => {
          let product = res.data.product;
          let followObj = res.data.followObj;
          console.log(res);
          if (product) {
            this.setState({ product: product, followObj });
          }
        });
        alert("review enviado");
      });
  }

  render() {
    let modalConfirm = (
      <div
        className="modal fade"
        id="confirmModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div
                className="modal-title max-width text-center"
                id="sellModalLabel"
              >
                <div className="title">
                  <h4>Evalue el servicio de venta</h4>
                </div>
              </div>
            </div>
            <div className="modal-body text-center">
              <small className="text-muted">
                Antes de confirmar la llegada por favor deje su evaluacion.
              </small>
              <div>
                <div>
                  Vendedor:
                  <i
                    onClick={this.setStarSeller}
                    id="starvend-1"
                    className={
                      (this.state.starSeller >= 1 ? "fas" : "far") + " fa-star"
                    }
                  />
                  <i
                    onClick={this.setStarSeller}
                    id="starvend-2"
                    className={
                      (this.state.starSeller >= 2 ? "fas" : "far") + " fa-star"
                    }
                  />
                  <i
                    onClick={this.setStarSeller}
                    id="starvend-3"
                    className={
                      (this.state.starSeller >= 3 ? "fas" : "far") + " fa-star"
                    }
                  />
                  <i
                    onClick={this.setStarSeller}
                    id="starvend-4"
                    className={
                      (this.state.starSeller >= 4 ? "fas" : "far") + " fa-star"
                    }
                  />
                  <i
                    onClick={this.setStarSeller}
                    id="starvend-5"
                    className={
                      (this.state.starSeller >= 5 ? "fas" : "far") + " fa-star"
                    }
                  />
                </div>
                <div>
                  Estado del producto:
                  <i
                    onClick={this.setStarQuality}
                    id="starestado-1"
                    className={
                      (this.state.starQuality >= 1 ? "fas" : "far") + " fa-star"
                    }
                  />
                  <i
                    onClick={this.setStarQuality}
                    id="starestado-2"
                    className={
                      (this.state.starQuality >= 2 ? "fas" : "far") + " fa-star"
                    }
                  />
                  <i
                    onClick={this.setStarQuality}
                    id="starestado-3"
                    className={
                      (this.state.starQuality >= 3 ? "fas" : "far") + " fa-star"
                    }
                  />
                  <i
                    onClick={this.setStarQuality}
                    id="starestado-4"
                    className={
                      (this.state.starQuality >= 4 ? "fas" : "far") + " fa-star"
                    }
                  />
                  <i
                    onClick={this.setStarQuality}
                    id="starestado-5"
                    className={
                      (this.state.starQuality >= 5 ? "fas" : "far") + " fa-star"
                    }
                  />
                </div>
                <div>
                  Tiempo de envio:
                  <i
                    onClick={this.setStarTime}
                    id="startiempo-1"
                    className={
                      (this.state.starTime >= 1 ? "fas" : "far") + " fa-star"
                    }
                  />
                  <i
                    onClick={this.setStarTime}
                    id="startiempo-2"
                    className={
                      (this.state.starTime >= 2 ? "fas" : "far") + " fa-star"
                    }
                  />
                  <i
                    onClick={this.setStarTime}
                    id="startiempo-3"
                    className={
                      (this.state.starTime >= 3 ? "fas" : "far") + " fa-star"
                    }
                  />
                  <i
                    onClick={this.setStarTime}
                    id="startiempo-4"
                    className={
                      (this.state.starTime >= 4 ? "fas" : "far") + " fa-star"
                    }
                  />
                  <i
                    onClick={this.setStarTime}
                    id="startiempo-5"
                    className={
                      (this.state.starTime >= 5 ? "fas" : "far") + " fa-star"
                    }
                  />
                </div>
                <div>
                  Comentario(opcional):
                  <textarea
                    style={{ resize: "none" }}
                    className="form-control"
                    onChange={this.setDetailReview}
                    aria-label="Detalle extras"
                    rows="6"
                    cols="20"
                  />
                </div>
              </div>

              <button
                onClick={this.setReview}
                className="btn btn-info"
                data-dismiss="modal"
              >
                Enviar evaluacion!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        <Header history={this.props.history} />
        {modalConfirm}
        <div className="container">
          <div>
            <div className="row">
              <div className="col-md-4 order-md-2 mb-4">
                <h4 className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted">Detalle Del producto</span>
                </h4>
                <ul className="list-group mb-3">
                  <li className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">
                        {this.state.product && this.state.product.title}
                      </h6>
                      <small className="text-muted">
                        {this.state.product && this.state.product.minDetail}
                      </small>
                    </div>
                    <span className="text-muted">
                      {this.state.product && this.state.product.price}€
                    </span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between">
                    <span>Total (EUR)</span>
                    <strong>
                      {this.state.product && this.state.product.price}€
                    </strong>
                  </li>
                </ul>
              </div>
              <div className="col-md-8 order-md-1">
                <h4 className="mb-3">SEGUIMIENTO DEL PEDIDO</h4>
                <div className="row">
                  <div className="col-3">
                    {this.state.followObj && (
                      <div
                        className={
                          "circle-state " +
                          (this.state.followObj.state > 0 && "green")
                        }
                      >
                        EN ESPERA
                      </div>
                    )}
                  </div>
                  <div className="col-3">
                    {this.state.followObj && (
                      <div
                        className={
                          "circle-state " +
                          (this.state.followObj.state > 1 && "green")
                        }
                      >
                        PREPARANDO
                      </div>
                    )}
                  </div>
                  <div className="col-3">
                    {this.state.followObj && (
                      <div
                        className={
                          "circle-state " +
                          (this.state.followObj.state > 2 && "green")
                        }
                      >
                        EN TRANSITO
                      </div>
                    )}
                  </div>
                  <div className="col-3">
                    {this.state.followObj && (
                      <div
                        className={
                          "circle-state " +
                          (this.state.followObj.state > 3 && "green")
                        }
                      >
                        ENTREGADO
                      </div>
                    )}
                  </div>
                </div>

                <h4 className="mb-3">DETALLE DEL ENVIO</h4>
                {this.state.followObj && (
                  <div>
                    <div>nombre: {this.state.followObj.data.nombre}</div>
                    <div>apellido: {this.state.followObj.data.apellido}</div>
                    <div>email: {this.state.followObj.data.email}</div>
                    <div>telefono: {this.state.followObj.data.telefono}</div>
                    <div>dni: {this.state.followObj.data.dni}</div>
                    <div>
                      dirección/calle:{" "}
                      {this.state.followObj.data.direccionCalle}
                    </div>
                    <div>numero: {this.state.followObj.data.numero}</div>
                    <div>puerta: {this.state.followObj.data.puerta}</div>
                    <div>escalera: {this.state.followObj.data.escalera}</div>
                    <div>pais: {this.state.followObj.data.pais}</div>
                    <div>ciudad: {this.state.followObj.data.ciudad}</div>
                    <div>cp: {this.state.followObj.data.cp}</div>
                  </div>
                )}

                {this.state.followObj && this.state.followObj.state !== 4 && (
                  <button data-toggle="modal" data-target="#confirmModal">
                    Pedido Recibido
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

FollowOrderForm.propTypes = {
  getFollowProduct: PropTypes.func.isRequired,
  setReviewOrder: PropTypes.func.isRequired
};

export default connect(
  null,
  { getFollowProduct, setReviewOrder }
)(FollowOrderForm);
