import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 100;
`;

const Panel = styled.div`
    background-color: white;
    position: absolute;
    width: 100%;
    max-width: 340px;
    height: 100px;
    left: calc(50vw - 170px);
    top: calc(50vh - 140px);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 14px;
    z-index: 110;
    > div {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        gap: 10px;
    }
`;

function Popup({ show, setShow, setSubmit }) {
    function handleSubmit() {
        setShow(false);
        setSubmit(true);
    }
    if (!show) {
        <></>;
    } else {
        return (
            <Container>
                <Panel>
                    <h2>Confirmar criação do hábito</h2>
                    <div>
                        <button onClick={() => setShow(false)}>
                            <h2>Cancelar</h2>
                        </button>
                        <button onClick={() => handleSubmit()}>
                            <h2>Confirmar</h2>
                        </button>
                    </div>
                </Panel>
            </Container>
        );
    }
}

export default Popup;
