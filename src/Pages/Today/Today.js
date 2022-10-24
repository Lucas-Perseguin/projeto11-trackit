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
    padding-top: 28px;
    margin-bottom: 100px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #e5e5e5;
    height: calc(100vh - 228px);
    overflow-y: scroll;
`;

const HabitsContainer = styled.div`
    width: 100%;
    max-width: 340px;
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

const TodayHabits = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

function Today() {
    const { user, setUser } = useContext(UserContext);
    const today = dayjs().format("dddd, DD/MM");
    const [isLoaded, setLoaded] = useState(false);
    const [hasData, setHasData] = useState(false);
    const [data, setData] = useState([]);
    const [hasCompleted, setHasCompleted] = useState(false);
    const [completionPercentage, setCompletionPercentage] = useState(0);
    const [toggleDone, setToggleDone] = useState(false);
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
            let completedHabits = 0;
            setLoaded(true);
            if (response.data.length) {
                setHasData(true);
                response.data.forEach((habit) => {
                    if (habit.done) completedHabits++;
                });
                setCompletionPercentage(
                    ((100 * completedHabits) / response.data.length).toFixed(0)
                );
            }
            if (completedHabits > 0) setHasCompleted(true);
            setData(response.data);
        });
        promisse.catch((error) => {
            alert(
                `Erro: ${error.response.status}\nOcorreu algum erro!\nTente novamente mais tarde`
            );
        });
        if (toggleDone) setToggleDone(false);
    }, [toggleDone]);
    if (!isLoaded) {
        return <LoadingPage text="Carregando tarefas do dia!" />;
    } else {
        return (
            <>
                <Header />
                <Container>
                    <HabitsContainer>
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
                                    Você ainda não possui hábitos cadastrados
                                    para hoje
                                </NoData>
                            )}
                        </div>
                        <TodayHabits>
                            {hasData ? (
                                data.map((habit) => (
                                    <TodayHabit
                                        habit={habit}
                                        key={habit.id}
                                        setToggleDone={setToggleDone}
                                    />
                                ))
                            ) : (
                                <></>
                            )}
                        </TodayHabits>
                    </HabitsContainer>
                </Container>
                <Footer />
            </>
        );
    }
}

export default Today;
