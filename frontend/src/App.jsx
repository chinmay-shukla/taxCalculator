import React, { useState } from 'react';
import { Form, Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BsExclamationCircle } from 'react-icons/bs'; // Import error icon

function App() {
  const [formData, setFormData] = useState({
    grossIncome: '',
    extraIncome: '',
    deductions: '',
    age: '',
  });
  const [tax, setTax] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({
    grossIncome: false,
    extraIncome: false,
    deductions: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate if input is a number
    const isValidNumber = !isNaN(value) && value !== '';

    setFormData({ ...formData, [name]: value });

    // Update error state based on input validation
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !isValidNumber,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      console.log("fired!");

      const response = await fetch('http://localhost:5000/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });


      const data = await response.json();
      setTax(data.tax);
      setShowModal(true);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      grossIncome: '',
      extraIncome: '',
      deductions: '',
      age: '',
    });
    setTax(null);
    setError('');
    setErrors({
      grossIncome: false,
      extraIncome: false,
      deductions: false,
    });
  };


  return (
    <div className="container">
      <h1>Tax Calculator</h1>
      <Form onSubmit={handleSubmit}>

        <Form.Group controlId="grossIncome">
          <Form.Label>Gross Income</Form.Label>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id="tooltip-grossIncome">Invalid input</Tooltip>}
            show={errors.grossIncome}
          >
            <Form.Control
              type="text"
              name="grossIncome"
              value={formData.grossIncome}
              onChange={handleChange}
              isInvalid={errors.grossIncome}
              required
            />
          </OverlayTrigger>

        </Form.Group>

        <Form.Group controlId="extraIncome">
          <Form.Label>Extra Income</Form.Label>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id="tooltip-extraIncome">Invalid input</Tooltip>}
            show={errors.extraIncome}
          >
            <Form.Control
              type="text"
              name="extraIncome"
              value={formData.extraIncome}
              onChange={handleChange}
              isInvalid={errors.extraIncome}
              required
            />
          </OverlayTrigger>
        </Form.Group>

        <Form.Group controlId="deductions">
          <Form.Label>Deductions</Form.Label>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id="tooltip-deductions">Invalid input</Tooltip>}
            show={errors.deductions}
          >
            <Form.Control
              type="text"
              name="deductions"
              value={formData.deductions}
              onChange={handleChange}
              isInvalid={errors.deductions}
              required
            />
          </OverlayTrigger>
        </Form.Group>


        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            as="select"
            name="age"
            value={formData.age}
            onChange={handleChange}
            // isInvalid={!errors.age}
            required
          >
            <option value="">Select Age</option>
            <option value="< 40">&lt; 40</option>
            <option value="≥ 40 & &lt; 60">&ge; 40 &lt; 60</option>
            <option value="≥ 60">&ge; 60</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className='my-4'>
          Calculate Tax
        </Button>
      </Form>


      <p>{error}</p>


      {/* Modal to display tax */}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Tax Calculation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tax !== null ? (
            <>
              <p>Overall Income After Deductions is :</p>
              <h2>{tax}</h2>
            </>
          ) : (
            <p>No tax calculated</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
}

export default App;