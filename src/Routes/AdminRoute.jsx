import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/UseRole';
import LoadingPage from '../Componants/LoadingPage';
import ForbiddenPage from '../Componants/ForbiddenPage';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <LoadingPage></LoadingPage>
    }

    if (role !== 'admin') {
        return <ForbiddenPage></ForbiddenPage>
    }

    return children;
};

export default AdminRoute;