import styled from "styled-components";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import dayjs from "dayjs";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext";
import LoadingPage from "../LoadingPage";
import TodayHabit from "./TodayHabit";

const Container = styled.div`
    margin-top: 70px;
    width: 100%;
    height: calc(100vh - 170px);
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #e5e5e5;
    box-sizing: border-box;
    padding: 28px 0 20px 18px;
    > div {
        width: 100%;
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        color: #126ba5;
        margin-bottom: 28px;
    }
`;

const Completed = styled.h2`
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: #8fc549;
`;

const Incomplete = styled.h2`
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: #bababa;
`;

const NoData = styled.h2`
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: #bababa;
`;

const HabitsContainer = styled.div``;

function Today() {
    const { user, setUser } = useContext(UserContext);
    const today = dayjs().format("dddd, DD/MM");
    const [habtisNum, setHabitsNum] = useState(0);
    const [completedHabits, setCompletedHabits] = useState(0);
    const [isLoaded, setLoaded] = useState(false);
    const [hasData, setHasData] = useState(false);
    const [data, setData] = useState([]);
    let hasCompleted = false;
    const [completionPercentage, setCompletionPercentage] = useState(0);
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
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
            config
        );
        promisse.then((response) => {
            setLoaded(true);
            if (response.data.length) {
                setHasData(true);
                setHabitsNum(response.data.length);
                response.data.foreach((habit) => {
                    if (habit.done) setCompletedHabits(completedHabits + 1);
                });
                setCompletionPercentage(
                    ((100 * completedHabits) / habtisNum).toFixed(0)
                );
            }
            if (completionPercentage > 0) hasCompleted = true;
            setData(response.data);
        });
        promisse.catch((error) => {
            alert(
                `Erro: ${error.response.status}\nOcorreu algum erro!\nTente novamente mais tarde`
            );
        });
    }, []);
    if (!isLoaded) {
        return <LoadingPage text="Carregando tarefas do dia!" />;
    } else {
        return (
            <>
                <Header />
                <Container>
                    <div>
                        <h2>{today}</h2>
                        {hasData ? (
                            hasCompleted ? (
                                <Completed>
                                    {completionPercentage}% dos hábitos
                                    concluídos
                                </Completed>
                            ) : (
                                <Incomplete>
                                    Nenhum hábito conluído ainda
                                </Incomplete>
                            )
                        ) : (
                            <NoData>
                                Você ainda não possui hábitos cadastrados para
                                hoje
                            </NoData>
                        )}
                    </div>
                    <HabitsContainer>
                        {hasData ? (
                            data.map((habit) => (
                                <TodayHabit habit={habit} key={habit.id} />
                            ))
                        ) : (
                            <></>
                        )}
                    </HabitsContainer>
                </Container>
                <Footer />
            </>
        );
    }
}

export default Today;
