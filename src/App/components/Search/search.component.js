import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategories, getSearchProducts } from "../../Auth/eventActions";
import Header from "../Header/header.component";
import Footer from "../Footer/footer.component";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      categories: [],
      products: [],
      filter_by_category: 0,
      filter_by_subcategory: 0,
      filter_by: 0,
      original_products: []
    };
    this.filterCategory = this.filterCategory.bind(this);
    this.filterSubCategory = this.filterSubCategory.bind(this);
    this.filterBy = this.filterBy.bind(this);

    this.reloadPage();
  }

  getProducts(itemToSearch) {
    this.props.getSearchProducts(itemToSearch).then(resp => {
      this.setState({
        searchString: itemToSearch,
        products: resp.data.products,
        original_products: resp.data.products
      });
      this.getCategories();
    });
  }

  filterProducts() {
    let filteredProducts = [];
    if (this.state.filter_by_category !== 0) {
      this.state.original_products.forEach(product => {
        if (product.category === this.state.filter_by_category) {
          if (this.state.filter_by_subcategory !== 0) {
            if (product.subCategory === this.state.filter_by_subcategory) {
              filteredProducts.push(product);
            }
          } else {
            filteredProducts.push(product);
          }
        }
      });
    }

    if (filteredProducts.length === 0) {
      filteredProducts = this.state.original_products;
    }

    console.log(filteredProducts);
    switch (this.state.filter_by) {
      case 1:
        filteredProducts.sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        );
        break;
      case -1:
        filteredProducts.sort((a, b) =>
          a.title < b.title ? 1 : b.title < a.title ? -1 : 0
        );
        break;

      case 2:
        filteredProducts.sort((a, b) =>
          a.price < b.price ? 1 : b.price < a.price ? -1 : 0
        );
        break;
      case -2:
        filteredProducts.sort((a, b) =>
          a.price > b.price ? 1 : b.price > a.price ? -1 : 0
        );
        break;
      default:
        break;
    }
    this.setState({ products: filteredProducts });
  }
  filterBy(event) {
    let filter = parseInt(event.target.value);
    this.setState({ filter_by: filter });
    setTimeout(() => this.filterProducts(), 0);
  }

  filterCategory(event) {
    let id = parseInt(event.target.id.split("-")[1]);
    this.setState({ filter_by_category: id });
    setTimeout(() => this.filterProducts(), 0);
  }
  filterSubCategory(event) {
    let id = parseInt(event.target.id.split("-")[1]);
    let idCat = parseInt(event.target.id.split("-")[2]);
    this.setState({ filter_by_subcategory: id, filter_by_category: idCat });
    setTimeout(() => this.filterProducts(), 0);
  }

  getCategories() {
    this.props.getCategories().then(resp => {
      let respCat = resp.data.categories;
      this.state.products.forEach(product => {
        for (let i = 0; i < respCat.length; i++) {
          if (product.category === respCat[i].categoryId) {
            respCat[i].display = true;
            for (let j = 0; j < respCat[i].subcategories.length; j++) {
              if (product.subCategory === respCat[i].subcategories[j].id) {
                respCat[i].subcategories[j].display = true;
              }
            }
          }
        }
        this.setState({ categories: respCat });
      });
    });
  }

  reloadPage() {
    let pathname = this.props.location.pathname;
    if (pathname.split("/").length >= 2) {
      let itemToSearch = pathname.split("/")[2];
      itemToSearch = itemToSearch.replace("-", " ");
      itemToSearch = itemToSearch.replace("%20", " ");

      this.getProducts(itemToSearch);
    }
  }
  render() {
    let pathname = this.props.location.pathname;
    if (pathname.split("/").length >= 2) {
      let itemToSearch = pathname.split("/")[2];
      itemToSearch = itemToSearch.replace("-", " ");
      itemToSearch = itemToSearch.replace("%20", " ");
      if (itemToSearch !== this.state.searchString) {
        this.reloadPage();
      }
    }
    return (
      <div>
        <Header history={this.props.history} />
        <div className="results-count-div">
          <div className="count-results">
            1-48 of over 1,000 results for "{this.state.searchString}"
          </div>
          <div className="sort-by-div">
            <div className="form-group">
              <select className="form-control" onChange={this.filterBy}>
                <option value="0">Filtrar Por</option>
                <option value="1">Nombre Ascendente</option>
                <option value="-1">Nombre Descendente</option>
                <option value="2">Precio alto</option>
                <option value="-2">Precio bajo</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row container-search">
          <div className="search-filter-container">
            <div className="title-search-item">Categorias</div>
            <div className="categories-box">
              {this.state.categories.map(
                category =>
                  category.display && (
                    <div key={category.categoryId}>
                      <button
                        id={"c-" + category.categoryId}
                        className="btn link-clategory"
                        onClick={this.filterCategory}
                      >
                        {category.titleEs}
                      </button>
                      <ul className="subcategories-ul">
                        {category.subcategories &&
                          category.subcategories.map(
                            scategory =>
                              scategory.display && (
                                <li key={scategory.id}>
                                  <button
                                    id={
                                      "sc-" +
                                      scategory.id +
                                      "-" +
                                      category.categoryId
                                    }
                                    onClick={this.filterSubCategory}
                                    className="btn bt-scat"
                                  >
                                    - {scategory.sCategoryEs}
                                  </button>
                                </li>
                              )
                          )}
                      </ul>
                    </div>
                  )
              )}
            </div>
          </div>
          <div className="search-products-container">
            <div className="row">
              {this.state.products.map(product => (
                <div key={product.id} className="box-item">
                  <a href={"/product?p=" + product.id}>
                    <div className="item-title">{product.title}</div>
                    <div className="item-image">
                      <img src={product.images[0]} alt={product.title} />
                    </div>
                    <div className="line" />
                    <div className="item-price">{product.price}€</div>
                    <div className="item-subtitle">{product.description}</div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

Search.propTypes = {
  getSearchProducts: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired
};

export default connect(
  null,
  { getSearchProducts, getCategories }
)(Search);
