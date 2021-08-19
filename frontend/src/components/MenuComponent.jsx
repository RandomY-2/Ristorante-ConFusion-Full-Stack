import React from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { getUrl } from "../shared/baseUrl";
import { useSelector } from "react-redux";

const RenderMenuItem = ({ dish, onClick }) => {
  return (
    <Card>
      <Link to={`/menu/${dish._id}`}>
        <CardImg width="100%" src={getUrl(dish.image)} alt={dish.name} />
        <CardImgOverlay>
          <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

const Menu = () => {
  const dishes = useSelector((state) => state.dish.dishes);
  const dishLoading = useSelector((state) => state.dish.isLoading);
  const dishErrMess = useSelector((state) => state.dish.errMess);

  const menu = dishes.map((dish) => {
    return (
      <div key={dish._id} className="col-12 col-md-5 m-1">
        <RenderMenuItem dish={dish} />
      </div>
    );
  });

  if (dishLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (dishErrMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{dishErrMess}</h4>
        </div>
      </div>
    );
  } else
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Menu</h3>
            <hr />
          </div>
        </div>
        <div className="row">{menu}</div>
      </div>
    );
};

export default Menu;
