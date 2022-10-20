import styled from "styled-components";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";

const Container = styled.div`
    margin-top: 70px;
    margin-top: 70px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #e5e5e5;
`;

function Habits() {
    return (
        <>
            <Header />
            <Container></Container>
            <Footer />
        </>
    );
}

export default Habits;
