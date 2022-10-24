import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

const LoadingPageStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    gap: 20px;
    h2 {
        font-weight: 400;
        font-size: 23px;
        color: #52b6ff;
        margin-top: 24px;
    }
`;

function LoadingPage({ text }) {
    return (
        <LoadingPageStyled>
            <ThreeDots
                height="25"
                width="200"
                radius="9"
                color="#52b6ff"
                ariaLabel="three-dots-loading"
                wrapperStyle={{ marginTop: 15 }}
                wrapperClassName=""
                visible={true}
                style={{ marginTop: 10 }}
            />
            <h2>{text}</h2>
        </LoadingPageStyled>
    );
}

export default LoadingPage;
