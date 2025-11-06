import "./App.css"
import {Route, Routes} from 'react-router'
import {Welcome} from "./authorization/Welcome.tsx";
import {Login} from "./authentication/Login.tsx";
import {Register} from "./authentication/Register.tsx";
import {Unauthorized} from "./authorization/Unauthorized.tsx";
import {Navigate} from "react-router-dom";
import {ProtectedRoute} from "./authorization/ProtectedRoute.tsx";
import {AdminDashboard} from "./authorization/AdminDashboard.tsx";
import {DevicesPage} from "./authorization/DevicesPage.tsx";
import {AvailableDevicesPage} from "./authorization/UnassignedDevices.tsx";


export const App = () => {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace/>}/>
                <Route path="/unauthorized" element={<Unauthorized/>} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                <Route path="/welcome" element={<ProtectedRoute> <Welcome/> </ProtectedRoute>}/>
                <Route path="/devices" element={<ProtectedRoute><DevicesPage/></ProtectedRoute>}/>
                <Route path="/empty_devices" element={<ProtectedRoute><AvailableDevicesPage/></ProtectedRoute>}/>
                <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}> <AdminDashboard/></ProtectedRoute>}/>

            </Routes>
        </div>
    )
}