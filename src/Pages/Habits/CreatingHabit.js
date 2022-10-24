import styled from "styled-components";
import DayButtonCreating from "./DayButtonCreating";
import { ThreeDots } from "react-loader-spinner";

const Container = styled.div`
    width: 100%;
    max-width: 340px;
    background: #ffffff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    > div {
        width: calc(100% - 36px);
        > input {
            height: 45px;
            width: 100%;
            margin-top: 18px;
            margin-bottom: 8px;
            border-color: lightgrey;
            font-size: 18px;
            font-weight: 300;
        }
    }
`;

const Weekdays = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    gap: 4px;
    margin-bottom: 30px;
`;

const Buttons = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    margin-bottom: 15px;
`;

const CancelButton = styled.button`
    width: 84px;
    height: 35px;
    background-color: #ffffff;
    color: #52b6ff;
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 35px;
    border: none;
`;

const SubmitButton = styled.button`
    width: 84px;
    border: none;
    height: 35px;
    background-color: #52b6ff;
    color: #ffffff;
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 35px;
`;

function CreatingHabit({
    submiting,
    setCreating,
    setShowingPopup,
    setHabitName,
    habitObject,
    setHabitObject,
}) {
    const weekdayAuxArr = [0, 1, 2, 3, 4, 5, 6];
    function handleClick() {
        setShowingPopup(true);
    }
    return (
        <Container>
            <div>
                <input
                    placeholder="Nome do hábito"
                    onChange={(event) => setHabitName(event.target.value)}
                ></input>
                <Weekdays>
                    {weekdayAuxArr.map((weekday) => (
                        <DayButtonCreating
                            key={weekday}
                            weekday={weekday}
                            habitObject={habitObject}
                            setHabitObject={setHabitObject}
                        />
                    ))}
                </Weekdays>
                <Buttons>
                    <CancelButton onClick={() => setCreating(false)}>
                        <h2>Cancelar</h2>
                    </CancelButton>
                    <SubmitButton
                        onClick={() => handleClick()}
                        disabled={submiting}
                    >
                        {submiting ? (
                            <ThreeDots
                                height="10"
                                width="200"
                                radius="9"
                                color="#FFFFFF"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{ marginTop: 10 }}
                                wrapperClassName=""
                                visible={true}
                            />
                        ) : (
                            <h2>Salvar</h2>
                        )}
                    </SubmitButton>
                </Buttons>
            </div>
        </Container>
    );
}

export default CreatingHabit;
