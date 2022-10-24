import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import styled from "styled-components";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import UserContext from "../../UserContext";
import LoadingPage from "../LoadingPage";
import "react-calendar/dist/Calendar.css";
import TodayHabit from "../Today/TodayHabit";

const Container = styled.div`
    margin-top: 70px;
    padding-top: 28px;
    width: 100%;
    height: calc(100vh - 198px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #e5e5e5;
`;

const DataContainer = styled.div`
    width: 100%;
    max-width: 340px;
`;

const Title = styled.h2`
    color: #126ba5;
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    margin-bottom: 10px;
`;

const Day = styled.h2`
    margin-top: 20px;
    font-size: 18px;
    font-weight: 400;
    color: #000000;
`;

const DayHabits = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

function History() {
    const { user, setUser } = useContext(UserContext);
    const [hasData, setHasData] = useState(false);
    const [isLoaded, setLoaded] = useState(false);
    const [habits, setHabits] = useState([]);
    const [date, setDate] = useState(new Date());
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    useEffect(() => {
        user.name = localStorage.getItem("name");
        user.image = localStorage.getItem("image");
        setUser(user);
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };
        const promisse = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily",
            config
        );
        promisse.then((response) => {
            setLoaded(true);
            if (response.data.length) {
                setHabits(response.data);
                setHasData(true);
            }
        });
        promisse.catch((error) => {
            alert(
                `Erro: ${error.response.status}\nOcorreu algum erro!\nTente novamente mais tarde`
            );
        });
    }, []);
    function dateFormat(date) {
        return Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date);
    }
    if (!isLoaded) {
        return <LoadingPage text="Carregando seu histórico de tarefas!" />;
    } else {
        return (
            <>
                <Header />
                <Container>
                    <DataContainer>
                        <Title>Histórico</Title>
                        {hasData ? (
                            <>
                                <Calendar onChange={setDate} value={date} />
                                <Day>
                                    {date.toLocaleDateString("pt-BR", options)}
                                </Day>
                                <DayHabits>
                                    {habits
                                        .filter(
                                            (day) => dateFormat(date) == day.day
                                        )
                                        .map((day) =>
                                            day.habits.map((habit) => {
                                                return (
                                                    <TodayHabit
                                                        key={habit.id}
                                                        habit={habit}
                                                        disabled={true}
                                                    />
                                                );
                                            })
                                        )}
                                </DayHabits>
                            </>
                        ) : (
                            <h2>
                                Você não tem ainda nenhum hábito cadastrado!
                            </h2>
                        )}
                    </DataContainer>
                </Container>
                <Footer />
            </>
        );
    }
}

export default History;
