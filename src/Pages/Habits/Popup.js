import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
    > div {
        background-color: white;
        position: absolute;
        width: 100%;
        max-width: 340px;
        height: 140px;
        left: calc(50vw - 170px);
        top: calc(50vh - 140px);
        z-index: 10;
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
                <div>
                    <h2>Confirmar criação do hábito</h2>
                    <div>
                        <button onClick={() => setShow(false)}>
                            <h2>Cancelar</h2>
                        </button>
                        <button onClick={() => handleSubmit()}>
                            <h2>Confirmar</h2>
                        </button>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Popup;
