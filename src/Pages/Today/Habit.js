import { toBeChecked } from "@testing-library/jest-dom/dist/matchers";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 94px;
    width: 90%;
    max-width: 340px;
    border-radius: 4px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    ion-icon {
        color: ${(props) => (done ? "green" : "lightgrey" || null)};
    }
    h2 {
        font-weight: 300;
        font-size: 16px;
        font-style: normal;
        color: #000000;
    }
`;

const Title = styled.h2`
    font-weight: 400;
    font-size: 20px;
    font-style: normal;
    color: #000000;
    word-wrap: break-word;
`;

function Habit({ habit }) {
    const [done, setDone] = useState(habit.done);
    const [isChanging, setChanging] = useState(false);
    function handleClick() {
        setDone(!done);
        setChanging(true);
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };
        const auxLink = done ? "uncheck" : "check";
        const promisse = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/${auxLink}`,
            config
        );
        promisse.then((response) => {
            setChanging(false);
        });
        promisse.catch((error) => {
            alert(
                `Erro: ${error.response.status}\nAlgo deu errado tente novamente mais tarde!`
            );
        });
    }
    return (
        <Container done={done}>
            <div>
                <Title>{habit.name}</Title>
                <br />
                <h2>{habit.currentSequence}</h2>
                <h2>{habit.highestSequence}</h2>
            </div>
            <ion-icon
                onClick={() => {
                    isChanging ? null : handleClick();
                }}
                name="checkbox"
            ></ion-icon>
        </Container>
    );
}

export default Habit;
