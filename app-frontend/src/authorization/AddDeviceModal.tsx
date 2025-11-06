import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import type {AddDeviceModalProps} from "../interace/device.ts";
import {AddDeviceAPI} from "../api/DeviceApi.ts";


export const AddDeviceModal: React.FC<AddDeviceModalProps> = ({show, onHide, onDeviceAdded}) => {
    const [formData, setFormData] = useState({
        name: '',
        consumptionValue: '',
        type: '',
        price: '',
        userId: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async () => {
        const authId = localStorage.getItem("authId")
        const token = localStorage.getItem("JWT")
        const devicePayload = {
            ...formData,
            userId: authId
        }
       await AddDeviceAPI(token, devicePayload)
        alert('Device added successfully!');

        setFormData({
            name: '',
            consumptionValue: '',
            type: '',
            price: '',
            userId: ''
        });

        if (onDeviceAdded) {
            onDeviceAdded();
        }

        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Device</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Device Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., Smart Thermostat"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Consumption Value (W)</Form.Label>
                        <Form.Control
                            type="number"
                            name="consumptionValue"
                            value={formData.consumptionValue}
                            onChange={handleChange}
                            step="0.01"
                            placeholder="0.00"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Device Type</Form.Label>
                        <Form.Select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        >
                            <option value="">Select a type</option>
                            <option value="Appliance">Appliance</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Climate Control">Climate Control</option>
                            <option value="Lighting">Lighting</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Price ($)</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
                            placeholder="0.00"
                        />
                    </Form.Group>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Add Device
                </Button>
            </Modal.Footer>
        </Modal>
    );
};