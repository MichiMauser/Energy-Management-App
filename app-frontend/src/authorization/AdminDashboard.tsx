import {useState, useEffect} from 'react';
import {Container, Table, Button, Alert} from 'react-bootstrap';
import {GetAllUsersAPI, DeleteUserAPI} from '../api/UserApi.ts';
import type {User} from "../interace/user.ts";


export const AdminDashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("JWT");
        const authId = localStorage.getItem("authId");

        if (!token) {
            setError("Admin not authenticated.");
            return;
        }

        if (!authId) {
            setError("Could not identify current user.");
            return;
        }

        const currentAdminId = parseInt(authId, 10);
        if (isNaN(currentAdminId)) {
            setError("Invalid user ID.");
            return;
        }

        GetAllUsersAPI(token)
            .then(data => {
                const filteredUsers = data.filter(user => user.id !== currentAdminId);
                setUsers(filteredUsers);
                setError(null);
            })
            .catch(err => {
                console.error("Error fetching users:", err);
                setError("Failed to fetch users.");
            });
    }, [refresh]);

    const handleDelete = async (userId: number) => {
        const token = localStorage.getItem("JWT");
        if (!token) {
            setError("Admin not authenticated.");
            return;
        }

        try {
            await DeleteUserAPI(token, userId);
            setRefresh(prev => prev + 1);
        } catch (err) {
            console.error("Error deleting user:", err);
            setError("Failed to delete user.");
        }
    };

    return (
        <Container className="my-4">
            <h1 className="mb-4">Admin Dashboard: User Management</h1>

            {error && (
                <Alert variant="danger">
                    {error}
                </Alert>
            )}

            <Table striped bordered hover responsive>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.lastName}</td>
                            <td>{user.firstName}</td>
                            <td>{user.mail}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center">
                            No other users found.
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>
        </Container>
    );
};