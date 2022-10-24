import styled from "styled-components";

const Container = styled.div``;

const DayButtonStyled = styled.button`
    width: 30px;
    height: 30px;
    font-size: 16px;
    background-color: ${(props) =>
        props.isSelected ? "#CFCFCF" : "white" || null};
    color: ${(props) => (props.isSelected ? "white" : "#CFCFCF" || null)};
`;

function DayButtonCreated({ weekday, days }) {
    const weekdaysLetter = ["D", "S", "T", "Q", "Q", "S", "S"];
    let isSelected = undefined;
    if (days.includes(weekday)) {
        isSelected = true;
    } else {
        isSelected = false;
    }
    return (
        <Container>
            <DayButtonStyled isSelected={isSelected} disabled={true}>
                <h2>{weekdaysLetter[weekday]}</h2>
            </DayButtonStyled>
        </Container>
    );
}

export default DayButtonCreated;
