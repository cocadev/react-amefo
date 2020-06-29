import React from "react";
import { connect } from "react-redux";
import Header from "../Header/header.component";
import Footer from "../Footer/footer.component";
import {
  getMyProducts,
  getMyPendingOrders,
  aceptOrder,
  confirmSendOrder
} from "../../Auth/eventActions";
import "../../styles/profile.scss";

import { Line } from "react-chartjs-2";
import {
  DASHBOARD,
  MY_SELLS,
  MY_WALLET,
  MY_DATA,
  MY_PUBLICATIONS,
  MY_REPUTATION,
  CONFIG
} from "../../utils/profile_screens";
const $ = window.$;
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: MY_PUBLICATIONS,
      my_products: [],
      pendingOrders: [],
      animationBlock1: "",
      animationBlock2: "anim-bl-dn",
      orderToAcept: null,
      clientDetails: null,
      orderForm: {},
      errorConfirmOrder: 0
    };
    this.setScreen = this.setScreen.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
    this.setOrderId = this.setOrderId.bind(this);
    this.showDetailClient = this.showDetailClient.bind(this);
    this.onSelectFile = this.onSelectFile.bind(this);
    this.aceptOrder = this.aceptOrder.bind(this);
    this.setFormOrder = this.setFormOrder.bind(this);
    this.promoProduct = this.promoProduct.bind(this);
    this.aceptShareOrder = this.aceptShareOrder.bind(this);
    this.init();
  }

  init() {
    this.props.getMyProducts().then(resp => {
      if (!resp.data.error) this.setState({ my_products: resp.data.products });
    });
    this.props.getMyPendingOrders().then(resp => {
      this.setState({ pendingOrders: resp.data.products });
    });
  }

  setScreen(e) {
    if (e.target) {
      let screenId = parseInt(e.target.value);
      this.setState({ screen: screenId });
    }
  }

  promoProduct(e) {
    window.scrollTo(0, 0);
    this.setState({
      animationBlock1: "bounceOutLeft"
    });
    setTimeout(() => {
      this.setState({
        animationBlock1: "bounceOutLeft anim-bl-dn",
        animationBlock2: "bounceInRight"
      });
    }, 500);
  }

  goToProfile() {
    window.scrollTo(0, 0);
    this.setState({
      animationBlock2: "bounceOutRight"
    });
    setTimeout(() => {
      this.setState({
        animationBlock2: "bounceOutRight anim-bl-dn",
        animationBlock1: "bounceInLeft"
      });
    }, 500);
  }

  setOrderId(e) {
    if (e.target.id) this.setState({ orderToAcept: e.target.id });
  }
  aceptOrder() {
    this.props.aceptOrder({ id: this.state.orderToAcept }).then(resp => {
      this.props.getMyPendingOrders().then(resp => {
        this.setState({ pendingOrders: resp.data.products });
      });
    });
  }
  showDetailClient(e) {
    this.state.pendingOrders.forEach(product => {
      if (product.id === e.target.id)
        this.setState({ clientDetails: product.data });
    });
  }
  aceptShareOrder() {
    if (this.state.orderForm) {
      if (!this.state.orderForm.nameOrder) {
        this.setState({ errorConfirmOrder: 1 });
        return;
      }
      if (!this.state.orderForm.idOrder) {
        this.setState({ errorConfirmOrder: 2 });
        return;
      }
      if (!this.state.orderForm.document) {
        this.setState({ errorConfirmOrder: 3 });
        return;
      }
      $("#shareOrderModal").modal("hide");

      this.props
        .confirmSendOrder({
          id: this.state.orderToAcept,
          orderForm: this.state.orderForm
        })
        .then(resp => {
          this.props.getMyPendingOrders().then(resp => {
            this.setState({ pendingOrders: resp.data.products });
          });
        });
    }
  }

  setFormOrder(e) {
    let orderForm = this.state.orderForm;

    orderForm[e.target.id] = e.target.value;

    this.setState({ orderForm });
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          let form = this.state.orderForm;

          let image = new Image();
          let _this = this;
          image.onload = function() {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            form.document = canvas.toDataURL("image/jpeg", 0.1);
            _this.setState({
              orderForm: form
            });
          };
          image.src = reader.result;
        },
        false
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  render() {
    const { user } = this.props.auth;
    const MONTHS = ["1semana", "2semana", "3semana", "4semana"];
    const dataCanvas = canvas => {
      const ctx = canvas.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 100, 0);
      return {
        labels: MONTHS,
        datasets: [
          {
            label: "Usd",
            backgroundColor: "#1efb22ab",
            borderColor: "#6be86e",
            borderWidth: 1,
            hoverBackgroundColor: "#6be86e",
            hoverBorderColor: gradient,
            data: [0, 450, 600, 800]
          }
        ]
      };
    };

    let modalClientDetail = (
      <div
        className="modal fade"
        id="clientDetails"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="clientDetailsLabel"
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
                  <h4>Detalles del envio</h4>
                </div>
              </div>
            </div>
            {this.state.clientDetails && (
              <div className="modal-body text-center">
                <div>nombre: {this.state.clientDetails.nombre}</div>
                <div>apellido: {this.state.clientDetails.apellido}</div>
                <div>email: {this.state.clientDetails.email}</div>
                <div>telefono: {this.state.clientDetails.telefono}</div>
                <div>dni: {this.state.clientDetails.dni}</div>
                <div>
                  dirección/calle: {this.state.clientDetails.direccionCalle}
                </div>
                <div>numero: {this.state.clientDetails.numero}</div>
                <div>puerta: {this.state.clientDetails.puerta}</div>
                <div>escalera: {this.state.clientDetails.escalera}</div>
                <div>pais: {this.state.clientDetails.pais}</div>
                <div>ciudad: {this.state.clientDetails.ciudad}</div>
                <div>cp: {this.state.clientDetails.cp}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
    let modalAceptOrder = (
      <div
        className="modal fade"
        id="aceptModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="aceptModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body text-center">
              <div className="title">Estas seguro?</div>
              <button
                onClick={this.aceptOrder}
                className="btn btn-info"
                data-dismiss="modal"
              >
                Si, Aceptar orden
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    let modalShareOrder = (
      <div
        className="modal fade"
        id="shareOrderModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="shareOrderModalLabel"
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
                  <h4>Ingrese los datos de la compania del reparto</h4>
                </div>
              </div>
            </div>

            <div className="modal-body text-center">
              <div>
                <div className="form-group row">
                  <label
                    htmlFor="nameOrder"
                    className="col-sm-2 col-form-label"
                  >
                    Nombre de la compania
                  </label>
                  <div className="col-sm-10">
                    <input
                      onChange={this.setFormOrder}
                      type="text"
                      className="form-control-plaintext"
                      id="nameOrder"
                    />
                    {this.state.errorConfirmOrder === 1 && (
                      <div style={{ color: "red", fontSize: 10 }}>
                        Por favor inserte el nombre
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="idOrder" className="col-sm-2 col-form-label">
                    Numero de seguimiento
                  </label>
                  <div className="col-sm-10">
                    <input
                      onChange={this.setFormOrder}
                      type="text"
                      className="form-control-plaintext"
                      id="idOrder"
                    />
                    {this.state.errorConfirmOrder === 2 && (
                      <div style={{ color: "red", fontSize: 10 }}>
                        Por favor inserte el numero identificador
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="fileDocEnvio">Documento comprobante</label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="fileDocEnvio"
                    accept="image/*"
                    onChange={this.onSelectFile}
                  />
                  {this.state.errorConfirmOrder === 3 && (
                    <div style={{ color: "red", fontSize: 10 }}>
                      Por favor suba un documento comprobante
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="detailOrder">
                    Detalle extra <span className="text-muted">(Opcional)</span>
                  </label>
                  <textarea
                    onChange={this.setFormOrder}
                    className="form-control"
                    id="detailOrder"
                    rows="3"
                  />
                </div>
              </div>
              <button onClick={this.aceptShareOrder} className="btn btn-info">
                Confirmar envio
              </button>
            </div>
          </div>
        </div>
      </div>
    );

    let htmlProfile = "loading";
    switch (this.state.screen) {
      case DASHBOARD:
        htmlProfile = (
          <div>
            <h2>Hola {user.username}! su balance actual es 3,000.00 Usd</h2>
            <h3>Estos son los ingresos de este mes</h3>
            <div className="chart-container">
              <Line
                data={dataCanvas}
                options={{ maintainAspectRatio: false }}
              />
            </div>

            <h3>Publicaciones activas</h3>
            <div className="row">
              {this.state.my_products.map(product => (
                <div className="box-miniature-product" key={product.id}>
                  <div id={product.id} className="hover-miniature-product">
                    <div id={product.id} className="noselect">
                      EDIT
                    </div>
                  </div>
                  <img
                    alt="product"
                    className="img-miniature-prod"
                    src={product.image}
                  />
                  <div className="stock-miniature-product">STOCK: 10</div>
                  <div className="title-miniature-product">{product.title}</div>
                </div>
              ))}
            </div>
          </div>
        );
        break;
      case MY_SELLS:
        if (this.props.auth.user.type === "publisher")
          htmlProfile = (
            <div>
              <h2>Mis Ventas</h2>
              <div className="row" />
              <div>
                {this.state.pendingOrders.map(pendingOrder => (
                  <div className="row pp-container" key={pendingOrder.id}>
                    <div className="col-2">
                      <div
                        className="pp-image"
                        style={{
                          backgroundImage:
                            "url(" + pendingOrder.product.image + ")"
                        }}
                      />
                    </div>

                    <div
                      className="row col-10"
                      stlye={{ backgroundColor: "red" }}
                    >
                      <div className="col-3">
                        <div>#{pendingOrder.id}</div>
                        <div>{pendingOrder.product.title}</div>
                        <div>hace 1 hora</div>
                      </div>
                      <div className="col-3">{pendingOrder.product.price}€</div>

                      {pendingOrder.state === 1 && (
                        <div className="col-3">En espera</div>
                      )}
                      {pendingOrder.state === 2 && (
                        <div className="col-3">En preparación</div>
                      )}
                      {pendingOrder.state === 3 && (
                        <div className="col-3">En reparto</div>
                      )}
                      {pendingOrder.state === 4 && (
                        <div className="col-3">Entregado</div>
                      )}
                      <div className="col-3">
                        {pendingOrder.state === 1 && (
                          <button
                            id={pendingOrder.id}
                            onClick={this.setOrderId}
                            data-toggle="modal"
                            data-target="#aceptModal"
                          >
                            Aceptar pedido
                          </button>
                        )}
                        {pendingOrder.state === 2 && (
                          <button
                            id={pendingOrder.id}
                            onClick={this.setOrderId}
                            data-toggle="modal"
                            data-target="#shareOrderModal"
                          >
                            Pedido enviado
                          </button>
                        )}
                        {pendingOrder.state === 3 && (
                          <div style={{ color: "green" }}>
                            Apenas se confirme la entrega recibirá su pago
                          </div>
                        )}
                        {pendingOrder.state === 4 && (
                          <div style={{ color: "red" }}>VENDIDO</div>
                        )}
                        {pendingOrder.state !== 4 && (
                          <div
                            data-toggle="modal"
                            id={pendingOrder.id}
                            onClick={this.showDetailClient}
                            data-target="#clientDetails"
                            className="alink"
                          >
                            DATOS DEL CLIENTE
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        break;
      case MY_WALLET:
        htmlProfile = (
          <div>
            <h2>Mi Cartera</h2>
            <p>mi balance:</p>
            <p>Recargar saldo</p>
            <p>Retirar dinero</p>
          </div>
        );
        break;
      case MY_PUBLICATIONS:
        if (this.props.auth.user.type === "publisher")
          htmlProfile = (
            <div>
              <h2>Mis productos promocionados</h2>
              <button onClick={this.promoProduct}>
                Promocionar un producto
              </button>
              <h2>Lista de productos activos</h2>

              <div className="row">
                {this.state.my_products.map(product => (
                  <div className="row pp-container col-12" key={product.id}>
                    <div className="col-2">
                      <div
                        className="pp-image"
                        style={{
                          backgroundImage: "url(" + product.image + ")"
                        }}
                      />
                    </div>

                    <div
                      className="row col-10"
                      stlye={{ backgroundColor: "red" }}
                    >
                      <div className="col-5">
                        {<div>#{product.id}</div>}
                        <div>{product.title}</div>
                        <div>0 visitas | 0 ventas</div>
                      </div>
                      <div className="col-2">{product.price}€</div>

                      <div className="col-2">{product.stock}u</div>
                      <div className="col-3">
                        <a href={"/edit-product?p=" + product.id}>
                          Modificar Detalles
                        </a>
                        <div className="alink">Activo</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        break;
      case MY_REPUTATION:
        htmlProfile = (
          <div>
            <h2>Mi Reputacion</h2>
            <p>Comentarios (+200)</p>
            <p>Lista de comentarios</p>
          </div>
        );
        break;
      case CONFIG:
        htmlProfile = (
          <div>
            <h2>Configuracion</h2>
            <p>Cambiar contraseña</p>
            <p>Activar two factor</p>
          </div>
        );
        break;
      case MY_DATA:
        htmlProfile = (
          <div>
            <h2>Mis Datos</h2>
            <p>Email</p>
            <p>Nombre</p>
            <p>Apellido</p>
            <p>Telefono</p>
            <p>dni/passaporte</p>
            <p>Verificar mi identidad</p>
          </div>
        );
        break;

      default:
        break;
    }

    return (
      <div>
        <Header history={this.props.history} />
        {modalAceptOrder}
        {modalShareOrder}
        {modalClientDetail}
        <div
          className={
            "row container-search animated " + this.state.animationBlock1
          }
        >
          <div className="search-filter-container">
            <h3>Mi cuenta</h3>
            <div>
              <button
                className="btn btn-d"
                value={DASHBOARD}
                onClick={this.setScreen}
              >
                Dashboard
              </button>
            </div>
            {this.props.auth.user.type === "publisher" && (
              <div>
                <button
                  className="btn btn-d"
                  value={MY_SELLS}
                  onClick={this.setScreen}
                >
                  Mis Ventas
                </button>
              </div>
            )}
            <div>
              <button
                className="btn btn-d"
                value={MY_DATA}
                onClick={this.setScreen}
              >
                Mis Datos
              </button>
            </div>

            <div>
              <button
                className="btn btn-d"
                value={MY_WALLET}
                onClick={this.setScreen}
              >
                Mi Cartera
              </button>
            </div>
            {this.props.auth.user.type === "publisher" && (
              <div>
                <button
                  className="btn btn-d"
                  value={MY_PUBLICATIONS}
                  onClick={this.setScreen}
                >
                  Publicaciones
                </button>
              </div>
            )}

            <div>
              <button
                className="btn btn-d"
                value={MY_REPUTATION}
                onClick={this.setScreen}
              >
                Reputacion
              </button>
            </div>

            <div>
              <button
                className="btn btn-d"
                value={CONFIG}
                onClick={this.setScreen}
              >
                Configuracion
              </button>
            </div>
          </div>
          <div className="search-products-container">{htmlProfile}</div>
        </div>
        <div
          className={
            "row container-search animated " + this.state.animationBlock2
          }
        >
          test block 2
          <div>
            <p>product title</p>
            <p>product detail</p>
            <p>product max detail</p>
            <p>product images</p>
            <button>Guardar cambios</button>
            <button onClick={this.goToProfile}>cancelar</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user
  };
}
export default connect(
  mapStateToProps,
  { getMyProducts, getMyPendingOrders, aceptOrder, confirmSendOrder }
)(Profile);
