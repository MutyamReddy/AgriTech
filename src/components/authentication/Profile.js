import React, { useState } from "react";
import { Button, Card, Alert, Container } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Profile() {
    const [error, setError] = useState();
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout(e) {
        setError("");

        try {
            await logout();
            history.push("/login");
        } catch {
            setError("Failed to Log Out");
        }
    }

    return (
        <>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ marginTop: "130px" }}
            >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">PROFILE</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {currentUser.email}
                            <Link
                                to="/update-profile"
                                className="btn btn-secondary w-100 mt-3"
                            >
                                Update Profile
                            </Link>
                        </Card.Body>
                    </Card>
                    <Button
                        className="btn btn-primary w-100 mt-3"
                        onClick={handleLogout}
                    >
                        LOG OUT
                    </Button>
                </div>
            </Container>
        </>
    );
}
