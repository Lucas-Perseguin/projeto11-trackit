import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 94px;
    width: 100%;
    border-radius: 4px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #ffffff;
    border-radius: 5px;
    ion-icon {
        color: ${(props) => (props.done ? "green" : "lightgrey" || null)};
    }
    ion-icon {
        width: 80px;
        height: 80px;
    }
`;

const Title = styled.h2`
    font-weight: 400;
    font-size: 20px;
    font-style: normal;
    color: #000000;
    word-wrap: break-word;
`;

const Sequence = styled.h2`
    font-weight: 300;
    font-size: 16px;
    font-style: normal;
    color: #000000;
    white-space: nowrap;
`;

const Emphasis = styled.strong`
    color: ${(props) => (props.emphasis ? "#8fc549" : "#000000" || null)};
    font-size: inherit;
    font-weight: inherit;
    display: inline-block;
    font-family: "Lexend Deca", sans-serif;
`;

function TodayHabit({ habit, disabled = false }) {
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
        let auxLink = undefined;
        if (done) {
            auxLink = "uncheck";
        } else {
            auxLink = "check";
        }
        const promisse = axios.post(
            `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/${auxLink}`,
            null,
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
    function handleClickHabit() {
        if (isChanging) return null;
        else return handleClick();
    }
    let emphasisCurrent = undefined;
    if (habit.currentSequence >= 4) {
        emphasisCurrent = true;
    } else {
        emphasisCurrent = false;
    }
    let emphasisRecord = undefined;
    if (habit.highestSequence >= 4) {
        emphasisRecord = true;
    } else {
        emphasisRecord = false;
    }
    return (
        <Container done={done}>
            <div>
                <Title>{habit.name}</Title>
                <br />
                <Sequence>
                    Sequência atual de dias:{" "}
                    <Emphasis emphasis={emphasisCurrent}>
                        {habit.currentSequence} dias
                    </Emphasis>
                </Sequence>
                <Sequence>
                    Seu recorde:{" "}
                    <Emphasis emphasis={emphasisRecord}>
                        {habit.highestSequence} dias
                    </Emphasis>
                </Sequence>
            </div>
            <ion-icon
                onClick={
                    disabled
                        ? null
                        : () => {
                              handleClickHabit();
                          }
                }
                name="checkbox"
            ></ion-icon>
        </Container>
    );
}

export default TodayHabit;
