import {Container, Row, Col, Card, Accordion, Badge, Button} from "react-bootstrap";
import {useState, useEffect} from "react";
import type {Device} from "../interace/device.ts";
import {DeleteDeviceAPI, GetUserDevicesAPI} from "../api/DeviceApi.ts";
import {LinkDeviceModal} from "./LinkDeviceModal.tsx";


export const DevicesPage = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem("JWT")
        const authId = localStorage.getItem("authId")
        GetUserDevicesAPI(authId, token)
            .then(data => setDevices(data))
            .catch(error => console.error("Error fetching devices:", error))
    }, [refresh]);

    const getTypeColor = (type: string) => {
        switch (type) {
            case "Appliance":
                return "primary";
            case "Entertainment":
                return "success";
            case "Climate Control":
                return "warning";
            default:
                return "secondary";
        }
    };

    const handleDelete = async (deviceId: number) => {
        const token = localStorage.getItem("JWT");
        if (!token) {
            console.error("Authentication token not found.");
            return;
        }

        try {
            await DeleteDeviceAPI(token, deviceId);
            setRefresh(prev => prev + 1);
        } catch (error) {
            console.error("Error deleting device:", error);
        }
    };

    return (
        <Container className="my-4">
            <h1 className="mb-4">My Devices</h1>
            <Row>
                <Col lg={12}>
                    <Accordion>
                        {devices.map((device) => (
                            <Accordion.Item eventKey={device.id.toString()} key={device.id}>
                                <Accordion.Header>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%',
                                        paddingRight: '1rem'
                                    }}>
                                        <div style={{flex: 1}}>
                                            <strong>{device.name}</strong>
                                            <Badge bg={getTypeColor(device.type)} className="ms-2">
                                                {device.type}
                                            </Badge>
                                        </div>
                                        <span className="text-muted" style={{flexShrink: 0, marginLeft: '1rem'}}>
                                            {device.consumptionValue}W
                                        </span>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col md={6}>
                                            <Card className="border-0 bg-light mb-3">
                                                <Card.Body>
                                                    <h6 className="text-muted mb-2">Device Information</h6>
                                                    <p className="mb-1">
                                                        <strong>Device ID:</strong> {device.id}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>Name:</strong> {device.name}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>Type:</strong> {device.type}
                                                    </p>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={6}>
                                            <Card className="border-0 bg-light mb-3">
                                                <Card.Body>
                                                    <h6 className="text-muted mb-2">Usage & Cost</h6>
                                                    <p className="mb-1">
                                                        <strong>Consumption:</strong> {device.consumptionValue}W
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>Price:</strong> ${device.price.toFixed(2)}
                                                    </p>
                                                    <p className="mb-1">
                                                        <strong>User ID:</strong> {device.userId}
                                                    </p>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <div className="d-flex gap-2 mt-3">
                                        <Button variant="primary" size="sm">Edit</Button>
                                        <Button variant="danger" size="sm" onClick={() => handleDelete(device.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Col>
            </Row>

            {devices.length === 0 && (
                <div className="text-center mt-5">
                    <p className="text-muted">No devices found. Add your first device!</p>
                </div>
            )}

            <Button variant="primary" className="mt-3" onClick={() => {
                setShowModal(true)
            }}>
                Link device
            </Button>
            <LinkDeviceModal show={showModal} onHide={() => setShowModal(false)}
                             onDeviceAdded={() => setRefresh(prev => prev + 1)}/>


        </Container>
    );
};;