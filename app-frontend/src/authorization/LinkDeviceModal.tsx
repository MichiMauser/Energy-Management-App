import React, {useState, useEffect} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {GetDevicesAPI, LinkDeviceAPI} from "../api/DeviceApi.ts";
import type {Device} from "../interace/device.ts";

type AddDeviceModalProps = {
    show: boolean;
    onHide: () => void;
    onDeviceAdded: () => void;
};

export const LinkDeviceModal: React.FC<AddDeviceModalProps> = ({show, onHide, onDeviceAdded}) => {
    const [availableDevices, setAvailableDevices] = useState<Device[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<number | ''>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (show) {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("JWT");

            GetDevicesAPI(token)
                .then(data => {
                    const filtered = data.filter((device:Device) => device.userId === null);
                    setAvailableDevices(filtered);
                })
                .catch(error => {
                    console.error("Error fetching available devices:", error);
                    setError("Failed to load available devices.");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setAvailableDevices([]);
            setSelectedDeviceId('');
            setError(null);
        }
    }, [show]);

    const handleSubmit = async () => {
        if (!selectedDeviceId) {
            setError("Please select a device.");
            return;
        }

        const authId = localStorage.getItem("authId");
        const token = localStorage.getItem("JWT");

        if (!authId) {
            setError("User not authenticated. Please log in again.");
            return;
        }

        const deviceToLink = availableDevices.find(d => d.id === selectedDeviceId);

        if (!deviceToLink) {
            setError("Selected device not found. Please refresh.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const numericAuthId = parseInt(authId, 10);
            if (isNaN(numericAuthId)) {
                setError("Invalid user ID. Please log in again.");
                setLoading(false);
                return;
            }

            const updatedDevicePayload: Device = {
                ...deviceToLink,
                userId: numericAuthId
            };

            await LinkDeviceAPI(token, updatedDevicePayload);

            if (onDeviceAdded) {
                onDeviceAdded();
            }
            onHide();
        } catch (err) {
            console.error("Error linking device:", err);
            setError("Failed to link the device. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Existing Device</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Available Device</Form.Label>
                        <Form.Select
                            value={selectedDeviceId}
                            onChange={(e) => setSelectedDeviceId(e.target.value ? parseInt(e.target.value, 10) : '')}
                            disabled={loading}
                        >
                            <option value="">Select a device</option>
                            {availableDevices.length > 0 ? (
                                availableDevices.map(device => (
                                    <option key={device.id} value={device.id}>
                                        {device.name} (ID: {device.id})
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    {loading ? "Loading devices..." : "No available devices found."}
                                </option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} disabled={loading}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={loading || !selectedDeviceId}>
                    {loading ? "Adding..." : "Add Device"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
