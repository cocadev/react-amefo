import React from "react";
import logo from "../../../assets/logo.png";
import { connect } from "react-redux";
import { logout } from "../../Auth/authActions";
import { getSearch, getCart, deleteItemCart } from "../../Auth/eventActions";

import PropTypes from "prop-types";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleGoToProfile = this.handleGoToProfile.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.search = this.search.bind(this);
    this.searchText = this.searchText.bind(this);
    this.refreshCart = this.refreshCart.bind(this);
    this.deleteItemCart = this.deleteItemCart.bind(this);
    this.showCart = this.showCart.bind(this);
    this.showCategories = this.showCategories.bind(this);
    this.state = {
      categoriesStyle: {},
      cartStyle: {},
      cartList: [],
      searchList: [],
      textSearch: "",
      categoriesIcon: "fa-sort-down",
      searchListClass: "search-no-expanded"
    };
    if (this.props.auth.type !== "publisher") {
      this.props.getCart().then(resp => {
        this.setState({ cartList: resp.data.products });
      });
    }
  }
  componentDidMount() {
    if (this.props.refreshCart) this.props.refreshCart(this.refreshCart);
  }

  refreshCart() {
    this.props.getCart().then(resp => {
      this.setState({ cartList: resp.data.products });
    });
  }

  deleteItemCart(e) {
    console.log("delete item " + e.target.id);
    if (e.target.id)
      this.props.deleteItemCart({ prodId: e.target.id }).then(resp => {
        if (this.props.auth.type !== "publisher") {
          this.props.getCart().then(resp => {
            this.setState({ cartList: resp.data.products });
          });
        }
      });
  }

  searchChange(e) {
    let text = e.target.value;
    if (text) {
      this.props.getSearch(text).then(resp => {
        if (resp.data.products) {
          if (resp.data.products.length === 0)
            this.setState({
              textSearch: text,
              searchList: [],
              searchListClass: "search-no-expanded"
            });
          else
            this.setState({
              searchList: resp.data.products,
              searchListClass: "",
              textSearch: text
            });
        } else
          this.setState({
            searchList: [],
            textSearch: text,
            searchListClass: "search-no-expanded"
          });
      });
    } else {
      this.setState({
        textSearch: text,
        searchList: [],
        searchListClass: "search-no-expanded"
      });
    }
  }
  search(event) {
    let keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode === 13) {
      this.props.history.push("/search/" + this.state.textSearch);
      this.setState({
        categoriesStyle: {},
        searchList: [],
        textSearch: "",
        categoriesIcon: "fa-sort-down",
        searchListClass: "search-no-expanded"
      });
    }
  }
  searchText(e) {
    if (e.target.id) this.props.history.push("/search/" + e.target.id);
  }
  handleGoToProfile() {
    console.log("gotoProfile");
  }
  showCategories() {
    if (!this.state.categoriesStyle.height) {
      this.setState({
        categoriesStyle: { height: "30px" },
        categoriesIcon: "fa-sort-up"
      });
    } else {
      this.setState({ categoriesStyle: {}, categoriesIcon: "fa-sort-down" });
    }
  }

  showCart() {
    if (!this.state.cartStyle.right) {
      this.setState({
        cartStyle: { right: "0px" }
      });
    } else {
      this.setState({ cartStyle: {} });
    }
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    let publishButton = (
      <a href="/publish" className="btn button-publish">
        Publicar
      </a>
    );
    const userLinks = (
      <div className="form-inline my-2 my-lg-0">
        <div className="cart-icon-button">
          {user.type === "publisher" ? publishButton : ""}
        </div>
        <div className="login-list">
          <div>
            <i className="far fa-user-circle" /> {user.username}
            <i className="fas fa-angle-down" />
          </div>
          <div className="row profile-list">
            <div className="col-6 profile-list-img-profile">
              <div className="img-profile-header" />

              <div className="button-mi-cuenta text-center">
                <a className="btn btn-info" href="/profile">
                  Mi cuenta
                </a>
              </div>
            </div>
            <div className="col-6 profile-list-menu-profile">
              <ul className="profile-list-ul">
                <li>
                  <a href="/publications" onClick={this.handleGoToProfile}>
                    Publicaciones
                  </a>
                </li>
                <li>
                  <a href="/history" onClick={this.handleGoToProfile}>
                    Historial
                  </a>
                </li>
                <li>
                  <a href="/profile" onClick={this.handleGoToProfile}>
                    Seguridad
                  </a>
                </li>
                <li>
                  <a href="/" onClick={this.logout.bind(this)}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {user.type === "seller" ? (
          <div onClick={this.showCart} className="cart-icon-button">
            <i className="fas fa-shopping-cart" />
          </div>
        ) : (
          ""
        )}
      </div>
    );

    const guestLinks = (
      <div className="form-inline my-2 my-lg-0">
        <a
          href="/login"
          className="btn btn-outline-danger my-2 my-sm-0 btn-login"
        >
          Login
        </a>
        <a
          className="btn btn-danger my-2 my-sm-0 btn-register"
          href="/register"
        >
          Sign up
        </a>
      </div>
    );

    return (
      <header>
        <nav className="navbar navbar-expand-sm navbar-light">
          <a className="navbar-brand" href="/">
            <img src={logo} width="120" alt="logopage" />
          </a>
          <div className="collapse navbar-collapse max-content" id="navbarmain">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <button
                  onClick={this.showCategories}
                  className="nav-link btn btn-d"
                >
                  Home
                  <i className={"fas " + this.state.categoriesIcon} />
                </button>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/support">
                  About Us
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/support">
                  Blog
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/support">
                  Testimonials
                </a>
              </li>
            </ul>
            <div className="form-inline main-search mr-auto">
              <div className="input-group mb-3">
                <input
                  aria-label="Buscar.."
                  className="form-control mr-sm-2 "
                  placeholder="Buscar.."
                  onChange={this.searchChange}
                  onKeyPress={this.search}
                  type="search"
                  value={this.state.textSearch}
                />
                <div className="input-group-append">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-search" />
                  </span>
                </div>
                <div className={"search-box " + this.state.searchListClass}>
                  <ul>
                    {this.state.searchList.map(product => (
                      <li
                        onClick={this.searchText}
                        id={product.title}
                        key={product.title}
                      >
                        {product.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {isAuthenticated ? userLinks : guestLinks}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarmain"
            aria-controls="navbarmain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </nav>
        <div className="categories-div" style={this.state.categoriesStyle}>
          categories
        </div>

        <div className="carrito-container" style={this.state.cartStyle}>
          <div className="title">MI CARRITO</div>
          <button onClick={this.showCart} className="btn close">
            X
          </button>
          {this.state.cartList &&
            this.state.cartList.map(item => (
              <a key={item.id} href={"/product?p=" + item.id}>
                <div className="row item-cart">
                  <img
                    alt={"imagen " + item.title}
                    className="img-item-round"
                    src={item.images[0]}
                  />
                  <div className="item-cart-details">
                    <div className="item-cart-name">{item.title}</div>
                    <div className="item-cart-price">{item.price}€</div>
                  </div>
                  <button
                    id={item.id}
                    className="btn item-cart-delete"
                    onClick={this.deleteItemCart}
                  >
                    X
                  </button>
                </div>
              </a>
            ))}
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  getCart: PropTypes.func.isRequired,
  getSearch: PropTypes.func.isRequired,
  deleteItemCart: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { logout, getSearch, getCart, deleteItemCart }
)(Header);
