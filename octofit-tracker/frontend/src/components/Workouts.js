
import React, { useEffect, useState } from 'react';
import { Button, Table, Card, Modal } from 'react-bootstrap';

const Workouts = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        console.log('Workouts API endpoint:', endpoint);
        console.log('Fetched data:', json);
        setData(json.results || json);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);

  const handleShowModal = (item) => {
    setModalData(item);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  return (
    <Card className="mb-4">
      <Card.Header as="h2">Workouts</Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {data[0] && Object.keys(data[0]).map((key) => (
                <th key={key}>{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.map((item, idx) => (
              <tr key={item.id || idx}>
                {data[0] && Object.keys(data[0]).map((key, i) => (
                  <td key={i}>{item[key]}</td>
                ))}
                <td>
                  <Button variant="info" size="sm" onClick={() => handleShowModal(item)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" href="/workouts" className="me-2">Refresh</Button>
      </Card.Body>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Workout Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalData && (
            <pre>{JSON.stringify(modalData, null, 2)}</pre>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};
export default Workouts;
