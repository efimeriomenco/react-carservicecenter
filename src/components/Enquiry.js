import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { CSSTransition } from 'react-transition-group';
import "./css/styles.css"
import { BiEdit } from 'react-icons/bi';
import {RiDeleteBin6Line} from "react-icons/ri";
import { Table } from "react-bootstrap";
import {AiOutlinePlusCircle} from "react-icons/ai";
import {Animated} from "react-animated-css";

function Enquiry() {
  const [enquiries, setEnquiries] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentEnquiry, setCurrentEnquiry] = useState(null);
  useEffect(() => {
    fetch(process.env.REACT_APP_API + "Enquiries")
      .then((response) => response.json())
      .then((data) => {
        setEnquiries(data);
      });
  }, []);

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };
  // const onSubmit = () => {
  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(enquiries),
  //     };
  //     fetch(process.env.REACT_APP_API + "Enquiries")
  //       .then((response) => response.json())
  //       .then((data) => console.log(data));
  //   };

  const openEnquiryInModal = (enq) => {
    setCurrentEnquiry(enq);
    setModalIsOpenToTrue();
  };

  
  return (
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
    <div>
        <div className="title-enquiries d-flex justify-content-center mt-3">
        <p className="text-light text-dark rounded fw-light h1">ENQUIRIES</p>
        </div>
        <div className="d-flex justify-content-center h1 mt-5">
            <a href="/AddEnquiry"><AiOutlinePlusCircle/></a>
        </div>
      <Table className="table mt-4" striped bordered hover size="sm">
          
        <thead className="table-dark">
          <tr>
            <th className="table-enquiry-id "><h3 className="d-flex justify-content-center fw-bold">Id</h3></th>
            <th><h3>First name</h3></th>
            <th><h3>Last name</h3></th>
            <th><h3 className="d-flex justify-content-center">Status</h3></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enq) => (
            <tr>
              <td key={enq.id} onClick={() => openEnquiryInModal(enq)} className="bg-light">
                  <p className="d-flex justify-content-center mt-3 fw-bold">
                      {enq.id}
                </p>
            </td>
              <td key={enq.id} onClick={() => openEnquiryInModal(enq)}>
                  <h4 className="d-flex justify-content-center mt-3">
                  {enq.customerDetails.firstName}
                  </h4>
              </td>
              <td key={enq.id} onClick={() => openEnquiryInModal(enq)}>
                  <h4 className="d-flex justify-content-center mt-3">
                  {enq.customerDetails.lastName}
                  </h4>
              </td>
              {enq.status === "Empty" ? (
                <td className="text-secondary text-uppercase fw-bold table-secondary">
                    <h4 className="d-flex justify-content-center mt-3">
                    {enq.status}
                    </h4>
                </td>
              ) : enq.status === "Booked" || enq.status === "Submitted" ? (
                <td className="text-success text-uppercase fw-bold table-success">
                    <h4 className="d-flex justify-content-center mt-3">
                    {enq.status}
                    </h4>
                </td>
              ) : enq.status === "Rejected" ? (
                <td className="text-danger text-uppercase fw-bold table-danger">
                    <h4 className="d-flex justify-content-center mt-3">
                    {enq.status}
                    </h4>
                </td>
              ) : (
                <td className="text-secondary text-uppercase fw-bold table-secondary">
                  {enq.status}
                </td>
              )
              }
                <td className="w-0">
                    <div className="d-flex justify-content-center">
                        <a type="submit" className="h1"><BiEdit/></a>
                        <a type="submit" className="h1"><RiDeleteBin6Line/></a>
                     </div>
                </td>
            </tr>
          ))}
          
        </tbody>
      </Table>
      <EnquiryModal
        enq={currentEnquiry}
        modalIsOpen={modalIsOpen}
        onClose={setModalIsOpenToFalse}
      />
    </div>
    </Animated>
  );
}

const EnquiryModal = ({ enq, modalIsOpen, onClose }) => {
  if (!modalIsOpen) return null;
  return (

    <Modal key={enq.id} isOpen={modalIsOpen} backdrop="static">
    <Animated animationIn="slideInUp" animationOut="rollOut" isVisible={true} animationOutDuration={3000}>
      <Table className=" mt-4" striped bordered hover size="sm">
        <thead>
            <div className="d-flex justify-content-between">
          <h1 className="fst-italic">
            Id: {enq.id}, {enq.customerDetails.firstName}{" "}
            {enq.customerDetails.lastName}
          </h1>
          {enq.status === "Empty" ?
          (
             <div className="d-flex fst-italic"> 
             <h1>
            Enquiry Status:
             </h1>
             <div className="bg-secondary rounded m-1"></div>
             <h1 className="text-light fw-bold">
             {enq.status}
             </h1>
            </div>
          ): enq.status === "Booked" || enq.status === "Submitted" ?
          (
            <div className="d-flex fst-italic">
              <h1 className="mr-1">
            Enquiry Status: 
             </h1>
             <div className="bg-success rounded m-1">
             <h1 className="text-light fw-bold">
              {enq.status}
              </h1>
             </div>
            </div>
          ): enq.status === "Rejected" ?
          (
            <div className="d-flex fst-italic">
            <h1 className="mr-1">Enquiry Status: 
            </h1>
            <div className="bg-danger rounded"> 
            <h1 className="text-light fw-bold m-1">
            {enq.status}
            </h1>
            </div>
            </div>
          ):
          (
            <div className="d-flex fst-italic"> 
            <h1 className="mr-1"> 
           Enquiry Status: 
            </h1>
            <div className="bg-secondary rounded"> 
            <h1 className="text-light fw-bold m-1">
                {enq.status}
            </h1>
            </div>
            </div>
          )
          }
          </div>
          <hr className="mb-5" />
          <h3>Customer details</h3>
          <tr>
            <th>First name</th>
            <th>Second name</th>
            <th>Email Address</th>
            <th>Phone number</th>
          </tr>
        </thead>
        <tbody className="fw-normal">
          <td>{enq.customerDetails.firstName}</td>
          <td>{enq.customerDetails.lastName}</td>
          <td>{enq.customerDetails.emailAddress}</td>
          <td>{enq.customerDetails.phoneNumber}</td>
        </tbody>
      </Table>
      <Table className="mt-4" striped bordered hover size="sm">
        <thead>
          <h3>Car details</h3>
          <tr>
            <th>Model</th>
            <th>Year</th>
            <th>Description of problem</th>
          </tr>
        </thead>
        <tbody className="fw-normal">
          <td>{enq.carDetails.model}</td>
          <td>{enq.carDetails.year}</td>
          <td>{enq.carDetails.descriptionoftheproblem}</td>
        </tbody>
      </Table>
      <button
        className="btn text-white fw-bold bg-danger rounded"
        onClick={onClose}
      >
        Close
      </button>
      </Animated>   
    </Modal>

  );
};


export default Enquiry;
