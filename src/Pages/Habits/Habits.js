import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import CreatingHabit from "./CreatingHabit";
import CreatedHabit from "./CreatedHabit";
import Popup from "./Popup";
import axios from "axios";
import UserContext from "../../UserContext";
import LoadingPage from "../LoadingPage";

const Container = styled.div`
    margin-top: 70px;
    padding-top: 28px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #e5e5e5;
    height: calc(100vh - 228px);
    overflow-y: scroll;
`;

const HabitsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 340px;
`;

const HabitsHeader = styled.div`
    display: flex;
    width: 100%;
    max-width: 340px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    > h2 {
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        color: #126ba5;
    }
    > button {
        width: 40px;
        height: 35px;
        background: #52b6ff;
        border-radius: 5px;
        color: #ffffff;
        border: none;
        font-size: 26px;
    }
`;

function Habits() {
    const [isLoaded, setLoaded] = useState(false);
    const [hasData, setHasData] = useState(false);
    const [isCreatingHabit, setCreatingHabit] = useState(false);
    const [habits, setHabits] = useState([]);
    const [isShowingPopup, setShowingPopup] = useState(false);
    const [isSubmiting, setSubmiting] = useState(false);
    const [habitName, setHabitName] = useState("");
    const { user, setUser } = useContext(UserContext);
    const [habitObject, setHabitObject] = useState({ name: "", days: [] });
    const [haveDeletedHabit, setDeletedHabit] = useState(false);
    useEffect(() => {
        user.name = localStorage.getItem("name");
        user.image = localStorage.getItem("image");
        setUser(user);
        if (isSubmiting) {
            habitObject.name = habitName;
            habitObject.days.sort((a, b) => a - b);
            const config = {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            };
            const promisse = axios.post(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
                habitObject,
                config
            );
            promisse.then((response) => {
                setSubmiting(false);
                setCreatingHabit(false);
                const auxHabit = [...habits, response.data];
                setHabits(auxHabit);
            });
            promisse.catch((error) => {
                alert(
                    `Erro: ${error.response.status}\nOcorreu algum erro!\nTente novamente mais tarde`
                );
            });
        }
        const config = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        };
        const promisse = axios.get(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            config
        );
        promisse.then((response) => {
            setLoaded(true);
            setHabits(response.data);
            if (response.data.length) {
                setHasData(true);
            }
        });
        promisse.catch((error) => {
            alert(
                `Erro: ${error.response.status}\nOcorreu algum erro!\nTente novamente mais tarde`
            );
        });
        if (haveDeletedHabit) setDeletedHabit(false);
    }, [isSubmiting, haveDeletedHabit]);
    if (!isLoaded) {
        return <LoadingPage text="Carregando todas as suas tarefas!" />;
    } else {
        return (
            <>
                <Header />
                <Container>
                    <HabitsHeader>
                        <h2>Meus hábitos</h2>
                        <button onClick={() => setCreatingHabit(true)}>
                            +
                        </button>
                    </HabitsHeader>
                    {isCreatingHabit ? (
                        <CreatingHabit
                            submiting={isSubmiting}
                            setCreating={setCreatingHabit}
                            setShowingPopup={setShowingPopup}
                            setHabitName={setHabitName}
                            habitObject={habitObject}
                            setHabitObject={setHabitObject}
                        />
                    ) : null}
                    {hasData ? (
                        <HabitsContainer>
                            {habits.map((habit) => (
                                <CreatedHabit
                                    key={habit.id}
                                    habit={habit}
                                    setDeletedHabit={setDeletedHabit}
                                />
                            ))}
                        </HabitsContainer>
                    ) : (
                        <h2>
                            Você não tem nenhum hábito cadastrado ainda.
                            Adicione um hábito para começar a trackear!
                        </h2>
                    )}
                    <Popup
                        show={isShowingPopup}
                        setShow={setShowingPopup}
                        setSubmit={setSubmiting}
                    />
                </Container>
                <Footer />
            </>
        );
    }
}

export default Habits;
