import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 180px;
    height: 180px;
    margin-bottom: 32px;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    width: 100%;
    max-width: 300px;
    margin-bottom: 25px;
  }
  input {
    height: 45px;
    width: 100%;
    background: #ffffff;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    color: #dbdbdb;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
  }
  button {
    background: #52b6ff;
    border-radius: 5px;
    width: 100%;
    height: 45px;
    color: #ffffff;
    border: none;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
  }
  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #52b6ff;
  }
`;

function SignUp () {
    return(
        <Container>
            
        </Container>
    );
}

export default SignUp;