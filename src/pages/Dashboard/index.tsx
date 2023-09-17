import { useAuth } from '../../contexts/AuthContext';
import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const { user } = useAuth();
    const [displayName, setDisplayname] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        setDisplayname(user?.displayName || "");
    }, [user])

    return (
        <>
            <h1>Welcome, { displayName }!</h1>
            <Button label="Play" handleClick={() => navigate("/play")}/>
        </>
    )
}