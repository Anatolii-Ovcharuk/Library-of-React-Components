/* "PrivateRoute component", v. 0.2 - 10.11.2024 | MIT License | Made by Anatolii Ovcharuk - https://github.com/Anatolii-Ovcharuk */
/* Description: This is JSX Component for React (with "react-router-dom"). */

    /* INSTALLATION */
/* Add string in application: import PrivateRoute from './privateRoute_v.0.2'; */
/* Example to use component in "react-router-dom": 
    <Route path="login" element={<PrivateRoute access={true/false} redirectTo="/contacts" />} >
        <Route index element={<Login />} /> 
    </Route>
*/

import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ access = false, redirectTo = '/' }) {
    return access ? <Outlet /> : <Navigate to={redirectTo} />;
};
