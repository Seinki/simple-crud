import axios from "axios";
import { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useLocalStorageState from "use-local-storage-state";
import FooterComponent from "./FooterComponent";

export default function UserTable() {
  const [users, setUsers] = useLocalStorageState("users", []);

  useEffect(() => {
    if (!users) {
      axios.get("http://localhost:3001/users").then((res) => {
        setUsers(res.data);
      });
    }
    Swal.fire({
      icon: "info",
      title: "Welcome\nTo My Simple CRUD App",
      text: "The data is ready",
      footer:
        '<a href="https://github.com/Seinki?tab=repositories" target="_blank">Check out my other projects</a>',
    });
  }, [users, setUsers]);

  if (!users) {
    return <div>Loading...</div>;
  }

  const addUser = async () => {
    const { value: name } = await Swal.fire({
      title: "Input Your Data",
      input: "text",
      inputLabel: "Your name",
      inputPlaceholder: "Enter your Name",
    });

    const { value: email } = await Swal.fire({
      title: "Input Your Data",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
    });

    const { value: password } = await Swal.fire({
      title: "Input Your Data",
      input: "password",
      inputLabel: "Your password",
      inputPlaceholder: "Enter your password",
    });

    if (name && email && password) {
      axios
        .post("http://localhost:3001/users", { name, email, password })
        .then((response) => {
          Swal.fire("User added successfully", response.data);
          axios.get("http://localhost:3001/users").then((res) => {
            setUsers(res.data);
          });
        })
        .catch((error) => {
          console.error("Error adding user:", error);
        });
    }
  };

  const editUser = async (id) => {
    const { value: name } = await Swal.fire({
      title: "Edit User Data",
      input: "text",
      inputLabel: "Your name",
      inputPlaceholder: "Enter your Name",
      inputValue: users.find((user) => user._id === id).name,
    });

    const { value: email } = await Swal.fire({
      title: "Edit User Data",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
      inputValue: users.find((user) => user._id === id).email,
    });

    const { value: password } = await Swal.fire({
      title: "Edit User Data",
      input: "password",
      inputLabel: "Your password",
      inputPlaceholder: "Enter your password",
      inputValue: users.find((user) => user._id === id).password,
    });

    if (name && email && password) {
      axios
        .put(`http://localhost:3001/users/${id}`, { name, email, password })
        .then((res) => {
          Swal.fire("User Updated successfully", res.data);
          axios.get("http://localhost:3001/users").then((res) => {
            setUsers(res.data);
          });
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };

  return (
    <div className="user_table">
      <Container className="mt-5 mb-5 p-5 shadow">
        <Row className="g-2">
          <Col xs={6}>
            <h3>User Table</h3>
          </Col>
          <Col xs={6} className="text-start text-lg-end">
            <button className="btn btn-primary" onClick={addUser}>
              Add New User
            </button>
          </Col>
        </Row>
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => editUser(user._id)}
                  >
                    Update
                  </button>
                  <Link
                    to={`/deletedUser/${user._id}`}
                    className="btn btn-danger me-2"
                    onClick={(e) => {
                      e.preventDefault();
                      axios
                        .delete(`http://localhost:3001/users/${user._id}`)
                        .then(() => {
                          setUsers(users.filter((u) => u._id !== user._id));
                          Swal.fire("Deleted successfully");
                        });
                    }}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <FooterComponent />
    </div>
  );
}
