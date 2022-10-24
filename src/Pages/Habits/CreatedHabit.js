import axios from "axios";
import { useState } from "react";
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
        width: 20px;
        height: 20px;
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

const EraseHabit = styled.button`
    background: none;
    border: none;
`;

function CreatedHabit({ habit, setDeletedHabit }) {
    const weekdays = [0, 1, 2, 3, 4, 5, 6];
    const [disabled, setDisabled] = useState(false);
    function deleteHabit() {
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };
        const promisse = axios.delete(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`,
            config
        );
        promisse.then((response) => {
            setDeletedHabit(true);
        });
        promisse.catch((error) => {
            alert(
                `Erro: ${error.response.status}\nOcorreu algum erro!\nTente novamente mais tarde`
            );
        });
    }
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
            <EraseHabit onClick={() => deleteHabit()} disabled={disabled}>
                <ion-icon name="trash-outline"></ion-icon>
            </EraseHabit>
        </Container>
    );
}

export default CreatedHabit;
