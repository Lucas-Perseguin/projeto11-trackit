import styled from "styled-components";
import Header from "../../Components/Header";

const Container = styled.div`
    margin-top: 70px;
    margin-top: 70px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

function Habits() {
    return (
        <>
            <Header />
            <Container></Container>
        </>
    );
}

export default Habits;
