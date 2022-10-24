import { useState } from "react";
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

function DayButtonCreating({ weekday, habitObject, setHabitObject }) {
    const weekdaysLetter = ["D", "S", "T", "Q", "Q", "S", "S"];
    const [isSelected, setselected] = useState(false);
    function handleClick() {
        setselected(!isSelected);
        if (isSelected) {
            const habit = { ...habitObject };
            habit.days.splice(habit.days.indexOf(weekday), 1);
            setHabitObject(habit);
        } else {
            const habit = { ...habitObject };
            habit.days.push(weekday);
            setHabitObject(habit);
        }
    }
    return (
        <Container>
            <DayButtonStyled
                isSelected={isSelected}
                onClick={() => handleClick()}
            >
                <h2>{weekdaysLetter[weekday]}</h2>
            </DayButtonStyled>
        </Container>
    );
}

export default DayButtonCreating;
