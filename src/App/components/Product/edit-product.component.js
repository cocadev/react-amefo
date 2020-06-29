import React from "react";
import { connect } from "react-redux";
import { getProduct, editProduct } from "../../Auth/eventActions";
import PropTypes from "prop-types";
import Header from "../Header/header.component";
import Footer from "../Footer/footer.component";
import TextFieldGroup from "../common/TextFieldGroup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../styles/product.scss";

class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      errors: {}
    };

    this.handleFullDetailChange = this.handleFullDetailChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.swapBoxes = this.swapBoxes.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.onSelectFile = this.onSelectFile.bind(this);

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

  onChange(e) {
    let product = this.state.product;
    product[e.target.name] = e.target.value;
    this.setState({ product });
  }

  editProduct() {
    let product = this.state.product;
    this.props.editProduct(product).then(res => {
      alert("Producto modificado");
    });
  }

  onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          let image = new Image();
          let _this = this;
          image.onload = function() {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 500;
            canvas.height = 500;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            let imgHeigth = canvas.height;
            let newPercent = (imgHeigth * 100) / image.height;
            let imgWidth = (image.width * newPercent) / 100;

            ctx.drawImage(
              image,
              canvas.width / 2 - imgWidth / 2,
              0,
              imgWidth,
              imgHeigth
            );

            let img = canvas.toDataURL("image/jpeg", 0.5);
            let product = _this.state.product;

            product.images.push(img);
            _this.setState({
              product
            });
          };
          image.src = reader.result;
        },
        false
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  deleteImage(e) {
    let images = [];
    for (let i = 0; this.state.product.images.length > i; i++) {
      if (i !== parseInt(e.target.id))
        images.push(this.state.product.images[i]);
    }
    let product = this.state.product;
    product.images = images;
    this.setState({ product });
  }
  handleDragStart(event) {
    let fromBox = JSON.stringify({ id: event.target.id });
    event.dataTransfer.setData("dragContent", fromBox);
  }

  handleDragOver(event) {
    event.preventDefault();
    return false;
  }

  handleDrop(event) {
    event.preventDefault();
    let fromBox = JSON.parse(event.dataTransfer.getData("dragContent"));
    let toBox = { id: event.target.id };
    this.swapBoxes(parseInt(fromBox.id), parseInt(toBox.id));
    return false;
  }

  swapBoxes(fromBox, toBox) {
    let images = this.state.product.images;
    let imageFrom = images[fromBox];
    let imageTo = images[toBox];
    images[toBox] = imageFrom;
    images[fromBox] = imageTo;

    let product = this.state.product;
    product.images = images;
    this.setState({ product });
  }

  handleFullDetailChange(value) {
    let product = this.state.product;
    product.detail = value;
    this.setState({ product });
  }
  render() {
    let htmlProduct = <div />;
    let defaultBoxImages = [];
    if (this.state.product && this.state.product.images.length < 4) {
      let loop = 4 - this.state.product.images.length;
      for (let i = 0; i < loop; i++)
        defaultBoxImages.push(
          <div className="imageBox default">
            <i className="fas fa-plus" />
          </div>
        );
    }
    if (this.state.product) {
      htmlProduct = (
        <div className="container">
          <div>
            <small>#{this.state.product.id}</small>
            <h4>{this.state.product.title}</h4>
            <small>0 visitas | {this.state.product.sells} ventas</small>
          </div>
          <div>
            <TextFieldGroup
              error={this.state.errors.title}
              label="Titulo"
              onChange={this.onChange}
              value={this.state.product.title}
              field="title"
            />
            <div>Imagenes</div>
            <div className="row">
              {this.state.product.images.length < 4 && (
                <div>
                  <label
                    className="labelAddImageProduct"
                    htmlFor="ipAddImageProduct"
                  >
                    AÑADIR IMAGEN
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="ipAddImageProduct"
                    accept="image/*"
                    onChange={this.onSelectFile}
                  />
                </div>
              )}
              {this.state.product.images.map(image => (
                <div
                  className="imageBox"
                  id={this.state.product.images.indexOf(image)}
                  key={this.state.product.images.indexOf(image)}
                  draggable="true"
                  onDragStart={this.handleDragStart}
                  onDragOver={this.handleDragOver}
                  onDrop={this.handleDrop}
                >
                  <div
                    id={this.state.product.images.indexOf(image)}
                    className="deleteHover"
                  >
                    <i
                      onClick={this.deleteImage}
                      id={this.state.product.images.indexOf(image)}
                      className="fas fa-trash"
                    />
                  </div>
                  <img
                    alt="product"
                    id={this.state.product.images.indexOf(image)}
                    className="img-final-detail-prod "
                    src={image}
                  />
                  {image === this.state.product.images[0] && (
                    <div className="portada">PORTADA</div>
                  )}
                </div>
              ))}
              {defaultBoxImages}
            </div>
            <TextFieldGroup
              error={this.state.errors.price}
              label="Precio"
              type="number"
              onChange={this.onChange}
              value={this.state.product.price}
              field="price"
            />
            <TextFieldGroup
              error={this.state.errors.price}
              label="Cantidad"
              type="number"
              onChange={this.onChange}
              value={this.state.product.stock}
              field="stock"
            />

            <div className="text-left sub-title-details">Descripcion Breve</div>
            <textarea
              onChange={this.onChange}
              value={this.state.product.minDetail}
              className="text-area-min"
              rows="5"
              name="minDetail"
            />
            <div className="text-left sub-title-details">
              Descripcion Detallada
            </div>
            <ReactQuill
              value={this.state.product.detail}
              onChange={this.handleFullDetailChange}
            />
            <button onClick={this.editProduct}>Modificar</button>
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
        {this.state.product && htmlProduct}
        <Footer />
      </div>
    );
  }
}

EditProduct.propTypes = {
  getProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user
  };
}
export default connect(
  mapStateToProps,
  { getProduct, editProduct }
)(EditProduct);
