import axios from 'axios';
import React from 'react';
import { Table } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch';
import RoomModal from './RoomModal';
import UserAvator from "../../assets/images/parson5.png";

const DeleteBtn = ({ data, loading }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${data?._id}`);

      setTimeout(() => {
        window.location.reload();
      }, "2000");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      className="ms-2 btn btn-danger"
      onClick={handleDelete}
      disabled={loading}
    >
      Delete
    </button>
  );
};

const Rooms = () => {

      const { data, loading, error } = useFetch(
        "http://localhost:5000/api/rooms"
    );
    
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4>Rooms Table</h4>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#SL</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Max Capacity</th>
              <th>Total Room</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((room, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{room?.title}</td>
                  <td>{room?.price}</td>
                  <td>{room?.desc ? room?.desc : "Not Available"}</td>
                  <td>{room?.maxPeople} person</td>
                  <td>{room?.roomNumbers.length}</td>
                  <td>
                    <RoomModal data={room} />
                    <DeleteBtn data={room} loading={loading} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
};

export default Rooms;