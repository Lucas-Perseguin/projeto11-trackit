import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../UserContext";

const Container = styled.div`
    display: flex;
    justify-content: space-around;
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
    h2 {
        font-style: normal;
        font-weight: 400;
        font-size: 38px;
        color: #ffffff;
    }
`;

function Header() {
    const { user } = useContext(UserContext);
    return (
        <Container>
            <h1>TrackIt</h1>
            <img src={user.image} alt="Imagem do usuário" />
        </Container>
    );
}

export default Header;
