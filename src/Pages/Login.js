import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../Assets/Images/trackit.png";
import UserContext from "../UserContext";
import { ThreeDots } from "react-loader-spinner";

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

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(UserContext);
    const userAuxObject = { email: "", password: "" };
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    function handleLogin() {
        if (email && password) {
            userAuxObject.email = email;
            userAuxObject.password = password;
            const promisse = axios.post(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
                userAuxObject
            );
            promisse.then((response) => {
                user.name = response.data.name;
                user.image = response.data.image;
                setUser(user);
                localStorage.setItem("token", `${response.data.token}`);
                navigate("/hoje");
                setDisabled(true);
            });
            promisse.catch((error) => {
                alert(
                    `Erro: ${error.response.status}\nRevise se seu email e senha estão corretos ou crie uma uma nova conta caso não possua uma ainda!`
                );
            });
        } else {
            alert("Preencha o campo de email e senha para continuar");
        }
    }
    return (
        <Container>
            <img src={logo} alt="trackit logo" />
            <div>
                <input
                    type="text"
                    placeholder="email"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    placeholder="senha"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button onClick={handleLogin} disabled={disabled}>
                    {disabled ? (
                        <ThreeDots
                            height="15"
                            width="200"
                            radius="9"
                            color="#FFFFFF"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{ marginTop: 15 }}
                            wrapperClassName=""
                            visible={true}
                            style={{ marginTop: 10 }}
                        />
                    ) : (
                        "Entrar"
                    )}
                </button>
            </div>
            <Link to="/cadastro" relative="path">
                <h2>Não tem uma conta? Cadastre-se!</h2>
            </Link>
        </Container>
    );
}

export default Login;
