import React from "react";
import {
  getCategories,
  addCategory,
  addSubCategory,
  removeCategory,
  removeSubCategory
} from "../../Auth/eventActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesSelector: [],
      valuesNewSubcat: {},
      valuesNewCat: ""
    };
    this.props.getCategories().then(resp => {
      if (resp.data) {
        this.setState({ categoriesSelector: resp.data.categories });
      }
    });
    this.removeSubcategory = this.removeSubcategory.bind(this);
    this.removeCategory = this.removeCategory.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.changecategory = this.changecategory.bind(this);
    this.addSubCategory = this.addSubCategory.bind(this);
    this.changesubcategory = this.changesubcategory.bind(this);
  }

  removeSubcategory(e) {
    let catId = e.target.value.split("-")[0];
    let subCatId = e.target.value.split("-")[1];
    this.props.removeSubCategory({ catId, subCatId }).then(resp => {
      this.props.getCategories().then(resp => {
        if (resp.data) {
          this.setState({ categoriesSelector: resp.data.categories });
        }
      });
    });
  }
  removeCategory(e) {
    let catId = e.target.value;
    this.props.removeCategory({ catId }).then(resp => {
      this.props.getCategories().then(resp => {
        if (resp.data) {
          this.setState({ categoriesSelector: resp.data.categories });
        }
      });
    });
  }

  addCategory(e) {
    this.props
      .addCategory({
        title: this.state.valuesNewCat
      })
      .then(resp => {
        if (!resp.error) this.setState({ valuesNewCat: "" });
        this.props.getCategories().then(resp => {
          if (resp.data) {
            this.setState({ categoriesSelector: resp.data.categories });
          }
        });
      });
  }

  changecategory(e) {
    this.setState({ valuesNewCat: e.target.value });
  }
  addSubCategory(e) {
    this.props
      .addSubCategory({
        catId: e.target.id,
        subCategoryTitle: this.state.valuesNewSubcat["sc" + e.target.id]
      })
      .then(resp => {
        if (!resp.error) this.setState({ valuesNewSubcat: {} });

        this.props.getCategories().then(resp => {
          if (resp.data) {
            this.setState({ categoriesSelector: resp.data.categories });
          }
        });
      });
  }

  changesubcategory(e) {
    let values = this.state.valuesNewSubcat;
    values[e.target.id] = e.target.value;
    this.setState({ valuesNewSubcat: values });
  }

  render() {
    return (
      <div>
        <h1>Categories</h1>
        {this.state.categoriesSelector.map(category => (
          <div key={category.categoryId} value={category.categoryId}>
            {category.titleEs}{" "}
            <button
              value={category.categoryId}
              onClick={this.removeCategory}
              className="btn remove-li"
            >
              -
            </button>
            <ul>
              {category.subcategories.map(subcategory => (
                <li key={subcategory.id}>
                  {subcategory.sCategoryEs}{" "}
                  <button
                    value={category.categoryId + "-" + subcategory.id}
                    onClick={this.removeSubcategory}
                    className="btn remove-li"
                  >
                    -
                  </button>
                </li>
              ))}
              <input
                id={"sc" + category.categoryId}
                type="text"
                name={"newsubcategory" + category.id}
                value={
                  this.state.valuesNewSubcat["sc" + category.categoryId]
                    ? this.state.valuesNewSubcat["sc" + category.categoryId]
                    : ""
                }
                onChange={this.changesubcategory}
              />
              <button id={category.categoryId} onClick={this.addSubCategory}>
                Add
              </button>
            </ul>
          </div>
        ))}
        <div>
          <input
            type="text"
            name={"newcategory"}
            value={this.state.valuesNewCat}
            onChange={this.changecategory}
          />
          <button onClick={this.addCategory}>Add Category</button>
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    getCategories,
    addCategory,
    addSubCategory,
    removeCategory,
    removeSubCategory
  }
)(Categories);
