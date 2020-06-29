import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../Header/header.component";
import Footer from "../Footer/footer.component";
import TextFieldGroup from "../common/TextFieldGroup";
import { getCategories, publishProduct } from "../../Auth/eventActions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

class Publish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      isContinue: false,
      title: "",
      fullDetail: "",
      minDetail: "",
      errors: {},
      isLoading: true,
      categoriesSelector: [],
      subCategoriesSelector: [],
      price: 0,
      stock: 1,
      categoryId: 0,
      subCategoryId: 0,
      src: null,
      imageSelected: null,
      images: [],
      croppedImageUrl: "",
      crop: {
        aspect: 1,
        unit: "%",
        width: 80,
        height: 80,
        x: 0,
        y: 0
      }
    };
    this.props.getCategories().then(resp => {
      if (resp.data) {
        this.setState({ categoriesSelector: resp.data.categories });
      }
    });
    this.onChange = this.onChange.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.publishProduct = this.publishProduct.bind(this);
    this.handleFullDetailChange = this.handleFullDetailChange.bind(this);
    this.pushImage = this.pushImage.bind(this);
    this.selectCategory = this.selectCategory.bind(this);
    this.selectSubCategory = this.selectSubCategory.bind(this);
  }

  handleFullDetailChange(value) {
    this.setState({ fullDetail: value });
  }
  publishProduct() {
    let product = {};
    product.title = this.state.title;
    product.price = this.state.price;
    product.stock = this.state.stock;
    product.category = this.state.categoryId;
    product.subCategory = this.state.subCategoryId;
    product.minDetail = this.state.minDetail;
    product.detail = this.state.fullDetail;
    product.images = this.state.images;

    this.props
      .publishProduct(product)
      .then(resp => {
        // step 3
        alert("Producto publicado");
        this.setState({ step: 3, isLoading: true });
      })
      .catch(err => {
        // error
      });
  }

  pushImage() {
    let images = this.state.images;

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");
    canvas.width = this.state.crop.width;
    canvas.height = this.state.crop.height;
    let image = new Image();
    let _this = this;
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
      images.push(canvas.toDataURL());
      let load = true;
      if (images.length > 0) {
        load = false;
      }

      _this.setState({
        images: images,
        src: null,
        imageSelected: null,
        isLoading: load,
        croppedImageUrl: ""
      });
    };
    image.src = this.state.croppedImageUrl;
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () =>
          this.setState({
            src: reader.result
          }),
        false
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = image => {
    this.setState({ imageSelected: image });
    this.makeClientCrop(this.state.crop);
  };

  onCropComplete = crop => {
    console.log("onCropComplete2", crop);
    this.makeClientCrop(this.state.crop);
  };

  onCropChange = (crop, percentCrop) => {
    if (crop.width < 200) crop.width = 100;
    if (crop.height < 200) crop.height = 100;
    console.log("onCropComplete3", crop);
    this.makeClientCrop(crop);
    this.setState({ crop: crop });
  };

  onChange(e) {
    if (
      e.target.name === "minDetail" &&
      this.state.step === 2 &&
      e.target.value.length > 0
    ) {
      this.setState({ [e.target.name]: e.target.value, isLoading: false });
    } else {
      if (this.state.step !== 2) {
        this.setState({ [e.target.name]: e.target.value });
      } else {
        this.setState({ [e.target.name]: e.target.value, isLoading: true });
      }
    }
  }

  nextStep() {
    let step = this.state.step + 1;
    this.setState({ step: step, isLoading: true });
  }

  selectCategory(e) {
    let categoryId = e.target.value;
    let subcategories = [];
    this.state.categoriesSelector.forEach(category => {
      if (parseInt(categoryId) === category.categoryId)
        subcategories = category.subcategories;
    });

    this.setState({
      categoryId: categoryId,
      subCategoriesSelector: subcategories,
      isLoading: false
    });
  }

  selectSubCategory(e) {
    let subCategoryId = e.target.value;
    this.setState({
      subCategoryId: subCategoryId
    });
  }

  async makeClientCrop(crop) {
    if (this.state.imageSelected && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.state.imageSelected,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    const { errors, isContinue, step } = this.state;

    let formPublish;
    switch (step) {
      case 0:
        formPublish = (
          <div className="container">
            <div className="background-sl" />
            <div>
              <div>
                <h2 className="login-title">¿Que desea publicar?</h2>
              </div>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  error={errors.title}
                  label="Titulo"
                  onChange={this.onChange}
                  value={this.state.title}
                  field="title"
                />
                <TextFieldGroup
                  error={errors.price}
                  label="Precio"
                  type="number"
                  onChange={this.onChange}
                  value={this.state.price}
                  field="price"
                />
                <TextFieldGroup
                  error={errors.price}
                  label="Cantidad"
                  type="number"
                  onChange={this.onChange}
                  value={this.state.stock}
                  field="stock"
                />
                <div className="form-group text-left">
                  <label
                    className="sub-title-details"
                    htmlFor="productTypeSelector"
                  >
                    Seleccione la categoria del producto
                  </label>
                  <select
                    onChange={this.selectCategory}
                    className="form-control"
                    id="productTypeSelector"
                  >
                    {this.state.categoriesSelector.map(category => (
                      <option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.titleEs}
                      </option>
                    ))}
                  </select>
                </div>
                {this.state.subCategoriesSelector.length !== 0 ? (
                  <div className="form-group text-left">
                    <label
                      className="sub-title-details"
                      htmlFor="productSubTypeSelector"
                    >
                      Seleccione la subcategoria del producto
                    </label>
                    <select
                      onChange={this.selectSubCategory}
                      className="form-control"
                      id="productSubTypeSelector"
                    >
                      {this.state.subCategoriesSelector.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.sCategoryEs}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}

                <div className="form-group form-buttons">
                  <button
                    onClick={this.nextStep}
                    disabled={this.state.isLoading}
                    className="btn btn-primary btn-lg"
                  >
                    Continuar
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
        break;

      case 1:
        let inputImg = "";
        if (this.state.images.length <= 4 && this.state.src) {
          inputImg = (
            <div>
              <ReactCrop
                src={this.state.src}
                crop={this.state.crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
              <button
                onClick={this.pushImage}
                className="btn btn-primary btn-lg"
              >
                Add
              </button>
            </div>
          );
        }
        formPublish = (
          <div className="container">
            <div className="background-sl" />
            <div>
              <div className="title-upload">
                <h2 className="login-title">Agregue imagenes de muestra</h2>
              </div>

              {inputImg}

              {!this.state.src && this.state.images.length <= 4 && (
                <form id="file-upload-form" className="uploader">
                  <input
                    id="file-upload"
                    type="file"
                    name="fileUpload"
                    accept="image/*"
                    onChange={this.onSelectFile}
                  />

                  <label htmlFor="file-upload" id="file-drag">
                    <img
                      id="file-image"
                      src="#"
                      alt="Preview"
                      className="hidden"
                    />
                    <div id="start">
                      <i className="fa fa-download" aria-hidden="true" />
                      <div>Select a file or drag here</div>
                      <div id="notimage" className="hidden">
                        Please select an image
                      </div>
                      <span id="file-upload-btn" className="btn btn-primary">
                        Select a file
                      </span>
                    </div>
                  </label>
                </form>
              )}

              <div className="row">
                <div className="col-3 box-container">
                  {this.state.images[0] ? (
                    <div
                      className="box-image box-image-bg"
                      style={{
                        backgroundImage: "url(" + this.state.images[0] + ")"
                      }}
                    />
                  ) : (
                    <div className="box-image">
                      <i className="fas fa-plus" />
                    </div>
                  )}
                </div>

                <div className="col-3 box-container">
                  {this.state.images[1] ? (
                    <div
                      className="box-image box-image-bg"
                      style={{
                        backgroundImage: "url(" + this.state.images[1] + ")"
                      }}
                    />
                  ) : (
                    <div className="box-image">
                      <i className="fas fa-plus" />
                    </div>
                  )}
                </div>
                <div className="col-3 box-container">
                  {this.state.images[2] ? (
                    <div
                      className="box-image box-image-bg"
                      style={{
                        backgroundImage: "url(" + this.state.images[2] + ")"
                      }}
                    />
                  ) : (
                    <div className="box-image">
                      <i className="fas fa-plus" />
                    </div>
                  )}
                </div>
                <div className="col-3 box-container">
                  {this.state.images[3] ? (
                    <div
                      className="box-image box-image-bg"
                      style={{
                        backgroundImage: "url(" + this.state.images[3] + ")"
                      }}
                    />
                  ) : (
                    <div className="box-image">
                      <i className="fas fa-plus" />
                    </div>
                  )}
                </div>
              </div>
              {!this.state.isLoading && (
                <div className="buttonContinueImgs">
                  <button
                    onClick={this.nextStep}
                    className="btn btn-primary btn-lg"
                  >
                    Continuar
                  </button>
                  <div />
                </div>
              )}
            </div>
          </div>
        );
        break;

      case 2:
        formPublish = (
          <div className="container">
            <div className="background-sl" />
            <div>
              <div>
                <h2 className="login-title">Detalles del producto</h2>
              </div>
              <form onSubmit={this.onSubmit}>
                <div className="text-left sub-title-details">
                  Descripcion Breve
                </div>
                <textarea
                  onChange={this.onChange}
                  value={this.state.minDetail}
                  class="text-area-min"
                  rows="5"
                  name="minDetail"
                />

                <div className="text-left sub-title-details">
                  Descripcion Detallada
                </div>
                <ReactQuill
                  value={this.state.fullDetail}
                  onChange={this.handleFullDetailChange}
                />
                <div className="form-group form-buttons">
                  <button
                    onClick={this.nextStep}
                    disabled={this.state.isLoading}
                    className="btn btn-primary btn-lg"
                  >
                    Continuar
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
        break;
      case 3:
        formPublish = (
          <div className="container">
            <div className="background-sl" />
            <div>
              <div>
                <h2 className="login-title">Compruebe los datos</h2>
              </div>
              <div>Titulo: {this.state.title}</div>
              <div>Precio: {this.state.price}</div>
              <div>Imagenes:</div>
              <div>
                {this.state.images.map(image => (
                  <img
                    alt="product"
                    className="img-final-detail-prod "
                    src={image}
                  />
                ))}
              </div>
              <div>Detalle breve:{this.state.minDetail}</div>
              <div className="form-group form-buttons">
                <button
                  onClick={this.publishProduct}
                  className="btn btn-success"
                >
                  Publicar
                </button>
              </div>
            </div>
          </div>
        );
        break;
      default:
        break;
    }

    if (isContinue) {
      formPublish = <div className="container" />;
    } else {
    }
    return (
      <div>
        <Header history={this.props.history} />
        <div className="container">
          <div className="publish-box">{formPublish}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

Publish.propTypes = {
  auth: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  publishProduct: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { getCategories, publishProduct }
)(Publish);
