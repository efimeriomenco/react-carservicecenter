import "./App.css";
import { Home } from "./components/Home";
import Enquiry from "./components/Enquiry/Enquiry";
import Booking from "./components/Booking";
import AddEnquiry from "./components/Enquiry/AddEnquiry";
import Footer from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./components/css/styles.css";

function App() {
  return (
    <BrowserRouter>
      <div className="title-carservice border bg-dark border-dark">
        <h3 className="m-3 d-flex justify-content-center text-white fst-italic">
          {" "}
          Car Service Center
        </h3>
      </div>
      <div className="container">
        <Navigation />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/Enquiry" component={Enquiry} />
          <Route path="/Booking" component={Booking} />
          <Route path="/AddEnquiry/:id?" component={AddEnquiry} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
