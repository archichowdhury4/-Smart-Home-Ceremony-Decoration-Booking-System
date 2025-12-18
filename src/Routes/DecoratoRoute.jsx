import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/UseRole';
import LoadingPage from '../Componants/LoadingPage';
import ForbiddenPage from '../Componants/ForbiddenPage';


const DecoratoRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || !user || roleLoading) {
        return <LoadingPage></LoadingPage>
    }

    if (role !== 'decorator') {
        return <ForbiddenPage></ForbiddenPage>
    }

    return children;
};

export default DecoratoRoute;