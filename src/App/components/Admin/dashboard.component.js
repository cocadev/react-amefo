import React from "react";

class Dashboard extends React.Component {
  render() {
    return (
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div className="chartjs-size-monitor crtmain">
          <div className="chartjs-size-monitor-expand mcont2">
            <div className="avbs21" />
          </div>
          <div className="chartjs-size-monitor-shrink shrink2">
            <div className="amesad" />
          </div>
        </div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Dashboard</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Share
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Export
              </button>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary dropdown-toggle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-calendar"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              This week
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default Dashboard;
