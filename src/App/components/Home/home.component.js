import React from "react";
// import Carrousel from "./carrousel.component";
import Landing from "./landing.component";
import Highlights from "./highlights.component";
import Topsells from "./topsells.component";
import Header from "../Header/header.component";
import Footer from "../Footer/footer.component";
import Panel from "./panel.component";
import Mobile from "./mobile.component";
import Clients from "./client.component";
// import ShopItems from "./shop.component";
import Trending from "./trending.component";
import Blooth from "./blooth.component";

// import Test from "./test";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header history={this.props.history} />

        {/* <Test /> */}
        <Landing />

        <Trending />

        <Panel />

        <div className="bg-white">
          <Highlights />
          <Topsells />
        </div>

        {/* <ShopItems /> */}

        <Mobile />

        <Clients />

        <Blooth />

        <Footer />
      </div>
    );
  }
}

export default Home;
