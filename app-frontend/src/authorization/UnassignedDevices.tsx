import {Container, Row, Col, ListGroup} from "react-bootstrap";
import {useState, useEffect} from "react";
import type {Device} from "../interace/device.ts";
import {GetDevicesAPI} from "../api/DeviceApi.ts";

export const AvailableDevicesPage = () => {
    const [availableDevices, setAvailableDevices] = useState<Device[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("JWT");
        GetDevicesAPI(token)
            .then(data => {
                const filtered = data.filter(device => device.userId === null);
                setAvailableDevices(filtered);
            })
            .catch(error => console.error("Error fetching available devices:", error));
    }, []);

    return (
        <Container className="my-4">
            <h1 className="mb-4">Available Devices</h1>
            <Row>
                <Col lg={8} md={10} sm={12}>
                    {availableDevices.length > 0 ? (
                        <ListGroup variant="flush">
                            {availableDevices.map((device) => (
                                <ListGroup.Item
                                    key={device.id}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <strong>{device.name}</strong>
                                    <span className="text-muted">
                                        ID: {device.id}
                                    </span>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <div className="text-center mt-5">
                            <p className="text-muted">No available devices found.</p>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
