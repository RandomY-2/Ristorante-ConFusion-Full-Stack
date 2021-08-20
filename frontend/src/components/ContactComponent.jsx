import React, { useState, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm } from "react-redux-form";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postFeedback } from "../redux/actions/feedbackActions";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const Contact = () => {
  const [username, setUsername] = useState("");
  const [telnum, setTelNum] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(postFeedback({
      username,
      telnum,
      email,
      feedback,
    }));
  }

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
          <BreadcrumbItem active>Contact Us</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Contact Us</h3>
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Location Information</h3>
        </div>
        <div className="col-12 col-sm-4 offset-sm-1">
          <h5>Our Address</h5>
          <address>
            121, Clear Water Bay Road<br />
            Clear Water Bay, Kowloon<br />
            HONG KONG<br />
            <i className="fa fa-phone"></i>: +852 1234 5678<br />
            <i className="fa fa-fax"></i>: +852 8765 4321<br />
            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
          </address>
        </div>
        <div className="col-12 col-sm-6 offset-sm-1">
          <h5>Map of our Location</h5>
        </div>
        <div className="col-12 col-sm-11 offset-sm-1">
          <div className="btn-group" role="group">
            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
          </div>
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h3>Send us Your Feedback</h3>
        </div>
        <div className="col-12 col-md-9">
          <LocalForm onSubmit={handleSubmit}>
            <Row className="form-group mb-2">
              <Col>
                <Label htmlFor="username">Username: </Label>
                <Control.text
                  model=".username"
                  id="username"
                  placeholder="Username"
                  className="form-control"
                  validators={{
                     required, minLength: minLength(1), maxLength: maxLength(15)
                  }}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="form-group mb-2">
              <Col>
                <Label htmlFor="telnum">Tel Num: </Label>
                <Control.text
                  model=".telnum"
                  id="telnum"
                  placeholder="telnum"
                  className="form-control"
                  validators={{
                    required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                  }}
                  onChange={(e) => setTelNum(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="form-group mb-2">
              <Col>
                <Label htmlFor="email">Email: </Label>
                <Control.text
                  model=".email"
                  id="email"
                  placeholder="email"
                  className="form-control"
                  validators={{
                    required, validEmail
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="feedback">Feedback: </Label>
                <Control.textarea
                  rows="12"
                  model=".feedback"
                  id="feedback"
                  placeholder="feedback"
                  className="form-control"
                  validators={{
                     required, minLength: minLength(1), maxLength: maxLength(15)
                  }}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </Col>
            </Row>
            <br />
            <Button type="submit" className="bg-primary">
              Submit
            </Button>
          </LocalForm>
        </div>
      </div>
    </div>
  );

}

export default Contact;