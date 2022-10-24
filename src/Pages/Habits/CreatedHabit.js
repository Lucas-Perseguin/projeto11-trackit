import styled from "styled-components";
import DayButtonCreated from "./DayButtonCreated";

const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: 340px;
    background: #ffffff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 18px;
    ion-icon {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    h2 {
        font-size: 20px;
        font-weight: 400;
    }
`;

const Weekdays = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 4px;
`;

function CreatedHabit({ habit }) {
    const weekdays = [0, 1, 2, 3, 4, 5, 6];
    return (
        <Container>
            <div>
                <h2>{habit.name}</h2>
                <Weekdays>
                    {weekdays.map((weekday) => {
                        return (
                            <DayButtonCreated
                                key={weekday}
                                weekday={weekday}
                                days={habit.days}
                            />
                        );
                    })}
                </Weekdays>
            </div>
            <ion-icon name="trash-outline"></ion-icon>
        </Container>
    );
}

export default CreatedHabit;
