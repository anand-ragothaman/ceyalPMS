import { CircularProgress, Grid2 } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import config from "../config";

const Loader = () => {
    return (
        <Grid2
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
        >
            <Grid2 item xs={3}>
                <CircularProgress />
            </Grid2>
        </Grid2>
    )
}


const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        axios
            .get(`${config.apiUrl}profile/get-profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then((response) => {
                if (response.data.id) {
                    setIsAuthenticated(true);
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, []);

    if (isAuthenticated === null) return <Loader />;

    return isAuthenticated ? children : <Navigate to="/sign-in" />;
};

const PublicRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        axios
            .get(`${config.apiUrl}profile/get-profile`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then((response) => {
                if (response.data.id) {
                    setIsAuthenticated(true);
                }
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, []);

    if (isAuthenticated === null) return <Loader />;

    return isAuthenticated ? <Navigate to="/" /> : children;
};

export { PrivateRoute, PublicRoute };

