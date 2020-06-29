import React from "react";
import Header from "../Header/header.component";
import Categories from "./categories.component";
import Dashboard from "./dashboard.component";
import ProductVerif from "./product-verif.component";

import "../../styles/admin.scss";
import {
  DASHBOARD,
  VERIFICATIONS,
  PRODUCT_VERIF,
  USERS,
  REPORTS,
  CATEGORIES
} from "../../utils/admin_screens";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: PRODUCT_VERIF,
      my_products: []
    };
    this.setScreen = this.setScreen.bind(this);
  }

  setScreen(e) {
    if (e.target) {
      let screenId = parseInt(e.target.value);
      this.setState({ screen: screenId });
    }
  }

  render() {
    let htmlAdmin = "loading";
    switch (this.state.screen) {
      case CATEGORIES:
        htmlAdmin = <Categories />;
        break;
      case DASHBOARD:
        htmlAdmin = <Dashboard />;
        break;
      case PRODUCT_VERIF:
        htmlAdmin = <ProductVerif />;
        break;

      default:
        break;
    }
    return (
      <div>
        <Header history={this.props.history} />
        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <button
                      className="btn btn-d"
                      value={DASHBOARD}
                      onClick={this.setScreen}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-home"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      Dashboard <span className="sr-only">(current)</span>
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-d"
                      value={VERIFICATIONS}
                      onClick={this.setScreen}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-file"
                      >
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                        <polyline points="13 2 13 9 20 9" />
                      </svg>
                      Verificaciones
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-d"
                      value={PRODUCT_VERIF}
                      onClick={this.setScreen}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-shopping-cart"
                      >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      Para verificar
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-d"
                      value={USERS}
                      onClick={this.setScreen}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-users"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      Usuarios
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-d"
                      value={REPORTS}
                      onClick={this.setScreen}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-bar-chart-2"
                      >
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                      </svg>
                      Reports
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-d"
                      value={CATEGORIES}
                      onClick={this.setScreen}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-layers"
                      >
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                      Categorias
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="col-md-10 adm-container">{htmlAdmin}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
