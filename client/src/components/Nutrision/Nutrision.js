import React, { useState } from "react";
import { Container, Row, Col, Card, Button, ProgressBar, Table, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { createMeal } from "../../utils/API";

const NutritionTracker = () => {

  const userdetails =JSON.parse( localStorage.getItem("user"))
  const [meals, setMeals] = useState([
    { id: 1, name: "Oatmeal & Fruits", calories: 250,date:"12-04-2024" },
    { id: 2, name: "Grilled Chicken & Salad", calories: 400,date:"12-04-2024" },
    { id: 3, name: "Protein Shake", calories: 200,date:"12-04-2024" },
  ]);
  
  const [newMeal, setNewMeal] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(new Date());
  const [formattedDate,setform] =useState( `${String(date.getDate()).padStart(2, "0") }-${ String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`);
console.log(formattedDate);

  const dailyGoal = 2000;
  const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);
  
  const handleAddMeal = async () => {
    if (newMeal && calories) {

      const data = {
        userId:userdetails._id,
        name:newMeal,
        calories:parseInt(calories),
        date:formattedDate

      }

    const response= await createMeal(data)

      if ( response.ok
      ) {
        alert("meal Added")
      }
     
      console.log(meals );
      

      setMeals([...meals,data]);
      setNewMeal("");
      setCalories("");
    }
  };
  
  const handleDeleteMeal = (id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this meal?",
      buttons: [
        { label: "Yes", onClick: () => setMeals(meals.filter((meal) => meal.id !== id)) },
        { label: "No" },
      ],
    });
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">🥗 Nutrition Tracker</h2>

      {/* Date Picker */}
      <div className="text-center mb-4">
        <Form.Label className="fw-bold">Select Date:</Form.Label>
        <DatePicker selected={date} onChange={(date) => setDate(date)} className="form-control d-inline w-auto mx-2" />
      </div>

      <Row>
        {/* Meal Log Section */}
        <Col md={6}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Title className="text-center fw-bold">Logged Meals</Card.Title>
              <Table striped bordered hover responsive className="mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Meal</th>
                    <th>Calories</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {meals.filter(meal=>meal.date===formattedDate).map((meal, index) => (
                    <tr key={meal.id}>
                      <td>{index + 1}</td>
                      <td>{meal.name}</td>
                      <td>{meal.calories} kcal</td>
                      <td>{meal.date}</td>
                      <td>
                        <Button variant="danger" size="sm" onClick={() => handleDeleteMeal(meal.id)}>🗑️</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Add Meal & Calorie Summary */}
        <Col md={6}>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <Card.Title className="text-center fw-bold">Add New Meal</Card.Title>
              <Form className="mt-3">
                <Form.Group className="mb-3">
                  <Form.Label>Meal Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter meal name" value={newMeal} onChange={(e) => setNewMeal(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Calories</Form.Label>
                  <Form.Control type="number" placeholder="Calories (e.g., 300)" value={calories} onChange={(e) => setCalories(e.target.value)} />
                </Form.Group>
                <Button variant="success" className="w-100" onClick={handleAddMeal}>➕ Add Meal</Button>
              </Form>
            </Card.Body>
          </Card>

          {/* Calorie Progress */}
          <Card className="shadow-lg border-0 mt-4">
            <Card.Body>
              <Card.Title className="text-center fw-bold">Daily Calorie Progress</Card.Title>
              <p className="text-center fw-semibold">Total Calories: {totalCalories} / {dailyGoal} kcal</p>
              <ProgressBar now={(totalCalories / dailyGoal) * 100} label={`${((totalCalories / dailyGoal) * 100).toFixed(1)}%`} variant="warning" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NutritionTracker;
