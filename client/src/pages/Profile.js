import React, { useState } from "react";
import { Card, Button, Form, Row, Col, Container } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaEdit } from "react-icons/fa";
import profile from "../assets/images/profile.png"
import { updateUser } from "../utils/API";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const userdetails =JSON.parse( localStorage.getItem("user"))
  const  id_token =localStorage.getItem("id_token")
//   console.log(id_token);
  

  
  
  const [user, setUser] = useState({
    name:userdetails.username ,
    email: userdetails.email,
    phone: "+1 234 567 890",
  });
  console.log(userdetails);
  const handleEdit = async () =>{
    console.log(user);

    const data={
        username:user.name,
        email:user.email
    }
    
   
   
    
     const response=   await updateUser(userdetails._id,data,id_token)
     console.log(response.json());
     if (response.ok) {
        setIsEditing(!isEditing);
     }
     


  }     

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <Card.Body className="text-center">
          <div className="mb-3">
            <img
              src={profile  }
              alt="Profile"
              className="rounded-circle shadow"
            />
          </div>
          <h3 className="fw-bold"><FaUser className="me-2" /> {user.name}</h3>
          <hr />

          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}><FaEnvelope className="text-primary" /> Email</Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                //   readOnly={!isEditing}
                />
              </Col>
            </Form.Group>

           


            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}> <FaUser className="me-2" />  username</Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </Col>
            </Form.Group>

            <Button variant={isEditing ? "success" : "primary"} className="w-100" onClick={handleEdit}>
              {isEditing ? "Save Changes" : <><FaEdit /> Edit Profile</>}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
