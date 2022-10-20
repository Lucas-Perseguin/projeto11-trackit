import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../UserContext";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 18px;
    position: fixed;
    top: 0;
    left: 0;
    height: 70px;
    background: #126ba5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    img {
        width: 51px;
        height: 51px;
        border-radius: 98px;
    }
    h1 {
        font-style: normal;
        font-weight: 400;
        font-size: 38px;
        color: #ffffff;
    }
`;

function Header() {
    const { user } = useContext(UserContext);
    console.log(user);
    return (
        <Container>
            <Link to="/hoje" relative="path">
                <h1>TrackIt</h1>
            </Link>
            <img src={user.image} alt="Imagem do usuário" />
        </Container>
    );
}

export default Header;
