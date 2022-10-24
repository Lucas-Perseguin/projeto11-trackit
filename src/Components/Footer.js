import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
`;

const HojeButton = styled.div`
    width: 90px;
    height: 90px;
    background: #52b6ff;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: calc(50% - 90px / 2);
    text-align: center;
    h2 {
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        color: #ffffff;
        line-height: 90px;
        text-decoration: none;
    }
`;

const GreyBar = styled.div`
    width: 100%;
    height: 10px;
    background: none;
    border: none;
`;

const MenuBar = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    box-sizing: border-box;
    padding: 0 32px;
    h2 {
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        color: #52b6ff;
    }
    a:link,
    a:visited {
        text-decoration: none;
    }
`;

function Footer() {
    return (
        <Container>
            <Link to="/hoje" relative="path">
                <HojeButton>
                    <h2>Hoje</h2>
                </HojeButton>
            </Link>
            <GreyBar></GreyBar>
            <MenuBar>
                <Link to="/habitos" relative="path">
                    <h2>Hábitos</h2>
                </Link>
                <Link to="/historico" relative="path">
                    <h2>Histórico</h2>
                </Link>
            </MenuBar>
        </Container>
    );
}

export default Footer;
