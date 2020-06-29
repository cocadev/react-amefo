import React from "react";
import { connect } from "react-redux";

import { getProducsToVerif, activateProduct } from "../../Auth/eventActions";

class ProductVerif extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.activateProduct = this.activateProduct.bind(this);

    this.props.getProducsToVerif().then(resp => {
      this.setState({ products: resp.data.products });
    });
  }

  activateProduct(e) {
    this.props.activateProduct(e.target.id).then(resp => {
      this.props.getProducsToVerif().then(resp => {
        this.setState({ products: resp.data.products });
        alert("Producto activado");
      });
    });
  }
  render() {
    return (
      <div class="row">
        {this.state.products.map(product => (
          <div className="row pp-container col-12" key={product.id}>
            <div className="col-2">
              <a href={"/product?p=" + product.id}>
                <div
                  className="pp-image"
                  style={{
                    backgroundImage: "url(" + product.images[0] + ")"
                  }}
                />
              </a>
            </div>

            <div className="row col-10" stlye={{ backgroundColor: "red" }}>
              <div className="col-5">
                {<div>#{product.id}</div>}
                <div>{product.title}</div>
              </div>
              <div className="col-2">{product.price}€</div>

              <div className="col-2">{product.stock}u</div>
              <div className="col-3">
                <button id={product.id} onClick={this.activateProduct}>
                  Activar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(
  null,
  { getProducsToVerif, activateProduct }
)(ProductVerif);
