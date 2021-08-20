import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
} from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { Control, LocalForm } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { getUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";
import { useSelector, useDispatch } from "react-redux";
import { getComments, addComment } from "../redux/actions/commentActions";

const RenderDish = ({ dish, favorite, postFavorite }) => {
  return (
    <div className="col-12 col-md-5 m-1">
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Card>
          <CardImg top src={getUrl(dish.image)} alt={dish.name} />
          <CardBody className="mt-5">
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
};

const RenderComments = ({ dishId }) => {
  const comments = useSelector((state) => state.comment.comments);

  if (comments != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>
            {comments.map((comment) => {
              return (
                <Fade in key={comment._id}>
                  <li>
                    <p>{comment.comment}</p>
                    <p>{comment.rating} stars</p>
                    <p>
                      -- {comment.author},{" "}
                      {comment.updatedAt
                        ? new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          }).format(new Date(Date.parse(comment.updatedAt)))
                        : new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          }).format(new Date())}
                    </p>
                  </li>
                  <hr />
                </Fade>
              );
            })}
          </Stagger>
        </ul>
        <CommentForm dishId={dishId} />
      </div>
    );
  else return <div></div>;
};

const CommentForm = ({ dishId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addComment(dishId, { rating, comment, author: user }));
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button outline onClick={() => setIsModalOpen(!isModalOpen)}>
        <span className="fa fa-pencil fa-lg"></span> Submit Comment
      </Button>
      <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}>
        <ModalHeader toggle={() => setIsModalOpen(!isModalOpen)}>
          Submit Comment
        </ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={handleSubmit}>
            <Row className="form-group">
              <Col>
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  model=".rating"
                  id="rating"
                  className="form-control"
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  rows="6"
                  className="form-control"
                  onChange={(e) => setComment(e.target.value)}
                />
              </Col>
            </Row>
            <br />
            <Button type="submit" className="bg-primary">
              Submit
            </Button>
          </LocalForm>
        </ModalBody>
      </Modal>
    </div>
  );
};

const DishDetail = (props) => {
  const dispatch = useDispatch();
  const dishId = props.match.params.dishId;
  const dish = useSelector((state) => state.dish.dishes).filter((dish) => {
    return dish._id === dishId;
  })[0];
  const dishLoading = useSelector((state) => state.dish.isLoading);
  const dishErrMess = useSelector((state) => state.dish.errMess);

  useEffect(() => {
    dispatch(getComments(dishId));
  }, []);

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
  } else if (dish != null)
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish
            dish={dish}
            favorite={props.favorite}
            postFavorite={props.postFavorite}
          />
          <RenderComments dishId={dish._id} />
        </div>
      </div>
    );
  else return <div></div>;
};

export default withRouter(DishDetail);
