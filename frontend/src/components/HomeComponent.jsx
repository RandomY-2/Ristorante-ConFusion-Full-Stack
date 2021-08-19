import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { getUrl } from "../shared/baseUrl";
import { FadeTransform } from "react-animation-components";
import { useSelector } from "react-redux";

const RenderCard = ({ item, isLoading, errMess }) => {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else if (item === undefined) {
    return <h4>No Featured</h4>
  } else {
    console.log(item.image);
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Card>
          <CardImg src={getUrl(item.image)} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? (
              <CardSubtitle>{item.designation}</CardSubtitle>
            ) : null}
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
  }
};

const Home = (props) => {
  const featuredDish = useSelector((state) => state.dish.dishes).filter((dish) => {
    return dish.featured;
  })[0];
  const dishLoading = useSelector((state) => state.dish.isLoading);
  const dishErrorMessage = useSelector((state) => state.dish.errMess);

  const featuredPromotion = useSelector((state) => state.promotion.promotions).filter((promotion) => {
    return promotion.featured;
  })[0];
  const promoLoading = useSelector((state) => state.promotion.isLoading);
  const promotionErrorMessage = useSelector((state) => state.promotion.errMess);

  const featuredLeader = useSelector((state) => state.leader.leaders).filter((leader) => {
    return leader.featured;
  })[0];
  const leaderLoading = useSelector((state) => state.leader.isLoading);
  const leaderErrorMessaeg = useSelector((state) => state.leader.errMess);

  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={featuredDish}
            isLoading={dishLoading}
            errMess={dishErrorMessage}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={featuredLeader}
            isLoading={leaderLoading}
            errMess={leaderErrorMessaeg}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={featuredPromotion}
            isLoading={promoLoading}
            errMess={promotionErrorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
