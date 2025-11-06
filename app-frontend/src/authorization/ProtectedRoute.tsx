import { Navigate } from 'react-router-dom';
import { decodeJwtPayload } from '../utils/jwtUtils';
import React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const token = localStorage.getItem('JWT');

    // Check if user is authenticated
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decodedPayload = decodeJwtPayload(token);

        if (decodedPayload.exp && decodedPayload.exp * 1000 < Date.now() ) {
            localStorage.removeItem('JWT');
            return <Navigate to="/login" replace />;
        }

        if (allowedRoles && allowedRoles.length > 0) {
            const userRole = decodedPayload.role;

            if (userRole === 'admin') {
                return <>{children}</>;
            }

            if (!allowedRoles.includes(userRole)) {
                return <Navigate to="/unauthorized" replace />;
            }
        }

        return <>{children}</>;
    } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('JWT');
        return <Navigate to="/login" replace />;
    }
};
