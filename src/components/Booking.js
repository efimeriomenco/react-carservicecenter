import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { CSSTransition } from 'react-transition-group';
import { Table } from "react-bootstrap";
import moment from "moment";
import { BiEdit } from 'react-icons/bi';
import {RiDeleteBin6Line} from "react-icons/ri";
import {AiOutlinePlusCircle} from "react-icons/ai";
import {Animated} from "react-animated-css";

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  useEffect(() => {
    fetch(process.env.REACT_APP_API + "Bookings")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      });
  }, []);
 
  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const openBookingInModal = (booking) => {
    setCurrentBooking(booking);
    setModalIsOpenToTrue();
  };

  return (
    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}> 
    <div>
    <div className="title-enquiries d-flex justify-content-center mt-3">
    <p className="text-light text-dark rounded fw-light h1">Bookings</p>
    </div>
    <div className="d-flex justify-content-center h1 mt-5">
            <a href="/AddEnquiry"><AiOutlinePlusCircle/></a>
        </div>
  <Table className="table mt-4" striped bordered hover size="sm">   
    <thead className="table-dark">
      <tr>
        <th className="table-enquiry-id "><h3 className="d-flex justify-content-center fw-bold">Id</h3></th>
             <th><h3>Start Day</h3></th>
             <th><h3>End Day</h3></th>
             <th><h3>Completion Date</h3></th>
        <th><h3 className="d-flex justify-content-center">Status</h3></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {bookings.map((booking) => (
        <tr>
          <td className="bg-light">
              <p className="d-flex justify-content-center mt-3 fw-bold">
              {booking.id}
            </p>
        </td>
          <td>
              <h4 className="d-flex justify-content-center mt-3">
              <td>{booking.startDay = moment(booking.startDay).format("LL")}</td>
              </h4>
          </td>
            <td>
              <h4 className="d-flex justify-content-center mt-3">
              <td>{booking.startDay = moment(booking.startDay).format("LL")}</td>
              </h4>
          </td>
          <td>
              <h4 className="d-flex justify-content-center mt-3">
              <td>{booking.completionDate = moment(booking.completionDay).format("LL")}</td>
              </h4>
          </td>
          {booking.status === "Empty" ? (
                 <td className="text-secondary text-uppercase fw-bold">
                     <h4 className="d-flex justify-content-center mt-3">
                     {booking.status}
                     </h4>
                 </td>
               ) : booking.status === "Started" ? (
                <td className="text-warning text-uppercase fw-bold table-success">
                <h4 className="d-flex justify-content-center mt-3">
                {booking.status}
                </h4>
            </td>
               ) : booking.status === "Completed" ? (
                <td className="text-success text-uppercase fw-bold table-success">
                <h4 className="d-flex justify-content-center mt-3">
                {booking.status}
                </h4>
            </td>
              ) : (
                <td className="text-secondary text-uppercase fw-bold">
                <h4 className="d-flex justify-content-center mt-3">
                {booking.status}
                </h4>
            </td>
               )}
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
      </div>
      </Animated>
  );
  }
 export default Booking;

// const BookingModal = ({ booking, modalIsOpen, onClose }) => {
//     if (!modalIsOpen) return null;
//     return (
//         <CSSTransition in={modalIsOpen} timeout={300}>
//       <Modal key={booking.id} isOpen={modalIsOpen} backdrop="static">
//         <Table className=" mt-4" striped bordered hover size="sm">
//           <thead>
//               <div className="d-flex justify-content-between">
//             <h1 className="fst-italic">
//               Id: {booking.id}, {booking.customerDetails.firstName}{" "}
//               {booking.customerDetails.lastName}
//             </h1>
//             {booking.status === "Empty" ?
//             (
//                <div className="d-flex fst-italic"> 
//                <h1>
//               Enquiry Status:
//                </h1>
//                <div className="bg-secondary rounded m-1"></div>
//                <h1 className="text-light fw-bold">
//                {booking.status}
//                </h1>
//               </div>
//             ): booking.status === "Booked" || booking.status === "Submitted" ?
//             (
//               <div className="d-flex fst-italic">
//                 <h1 className="mr-1">
//               Enquiry Status: 
//                </h1>
//                <div className="bg-success rounded m-1">
//                <h1 className="text-light fw-bold">
//                 {booking.status}
//                 </h1>
//                </div>
//               </div>
//             ): booking.status === "Rejected" ?
//             (
//               <div className="d-flex fst-italic">
//               <h1 className="mr-1">Enquiry Status: 
//               </h1>
//               <div className="bg-danger rounded"> 
//               <h1 className="text-light fw-bold m-1">
//               {booking.status}
//               </h1>
//               </div>
//               </div>
//             ):
//             (
//               <div className="d-flex fst-italic"> 
//               <h1 className="mr-1"> 
//              Enquiry Status: 
//               </h1>
//               <div className="bg-secondary rounded"> 
//               <h1 className="text-light fw-bold m-1">
//                   {booking.status}
//               </h1>
//               </div>
//               </div>
//             )
//             }
//             </div>
//             <hr className="mb-5" />
//             <h3>Customer details</h3>
//             <tr>
//               <th>First name</th>
//               <th>Second name</th>
//               <th>Email Address</th>
//               <th>Phone number</th>
//             </tr>
//           </thead>
//           <tbody className="fw-normal">
//             <td>{booking.customerDetails.firstName}</td>
//             <td>{booking.customerDetails.lastName}</td>
//             <td>{booking.customerDetails.emailAddress}</td>
//             <td>{booking.customerDetails.phoneNumber}</td>
//           </tbody>
//         </Table>
//         <Table className="mt-4" striped bordered hover size="sm">
//           <thead>
//             <h3>Car details</h3>
//             <tr>
//               <th>Model</th>
//               <th>Year</th>
//               <th>Description of problem</th>
//             </tr>
//           </thead>
//           <tbody className="fw-normal">
//             <td>{booking.carDetails.model}</td>
//             <td>{booking.carDetails.year}</td>
//             <td>{booking.carDetails.descriptionoftheproblem}</td>
//           </tbody>
//         </Table>
//         <button
//           className="btn text-white fw-bold bg-danger rounded"
//           onClick={onClose}
//         >
//           Close
//         </button>
  
//       </Modal>
//       </CSSTransition>
//     );
//   };

