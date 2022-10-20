import styled from "styled-components";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

const Container = styled.div`
    margin-top: 70px;
    padding-top: 28px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #e5e5e5;
`;

function History() {
    return (
        <>
            <Header />
            <Container></Container>
            <Footer />
        </>
    );
}

export default History;
