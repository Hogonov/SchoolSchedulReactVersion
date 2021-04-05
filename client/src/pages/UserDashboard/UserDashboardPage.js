import React from "react";
import {Loader} from "../../components/Loader";
import {useHttp} from "../../hooks/http.hook";


export const UserDashboardPage = () => {
    const {loading} = useHttp();

    if (loading) {
        return <div>
            <Loader/>
        </div>
    }
    else {
        return (
            <div>
            </div>
        )
    }
};