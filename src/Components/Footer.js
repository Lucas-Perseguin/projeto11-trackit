import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
`;

const hojeButton = styled.div`
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
    }
`;

const greyBar = styled.div`
    width: 100%;
    height: 10px;
    background: none;
    border: none;
`;

const menuBar = styled.div`
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
`;

function Footer() {
    return (
        <Container>
            <Link to="/hoje" relative="path">
                <hojeButton>
                    <h2>Hoje</h2>
                </hojeButton>
            </Link>
            <greyBar></greyBar>
            <menuBar>
                <Link to="/habitos" relative="path">
                    <h2>Hábitos</h2>
                </Link>
                <Link to="/historico" relative="path">
                    <h2>Histórico</h2>
                </Link>
            </menuBar>
        </Container>
    );
}

export default Footer;
