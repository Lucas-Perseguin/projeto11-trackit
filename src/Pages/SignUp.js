import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../Assets/Images/trackit.png";
import UserContext from "../UserContext";
import { ThreeDots } from "react-loader-spinner";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
        color: #000000;
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

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const { user, setUser } = useContext(UserContext);
    const userAuxObject = { email: "", name: "", image: "", password: "" };
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    function validateUrl(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
            value
        );
    }
    function handleLogin() {
        if (email && password && name && validateUrl(image)) {
            userAuxObject.email = email;
            userAuxObject.password = password;
            userAuxObject.image = image;
            userAuxObject.name = name;
            const promisse = axios.post(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
                userAuxObject
            );
            promisse.then((response) => {
                user.name = response.data.name;
                user.image = response.data.image;
                localStorage.setItem("name", `${response.data.name}`);
                localStorage.setItem("image", `${response.data.image}`);
                setUser(user);
                localStorage.setItem("token", `${response.data.token}`);
                navigate("/hoje");
                setDisabled(true);
            });
            promisse.catch((error) => {
                alert(
                    `Erro: ${error.response.status}\nAlgo deu errado, espere um pouco e tente de novo ou acesse nosso FAQ e procure pelo código do erro presente!`
                );
            });
        } else {
            alert("Preencha todos os campos para continuar");
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
                <input
                    type="text"
                    placeholder="nome"
                    onChange={(event) => setName(event.target.value)}
                />
                <input
                    type="url"
                    placeholder="foto"
                    onChange={(event) => setImage(event.target.value)}
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
                        "Cadastrar"
                    )}
                </button>
            </div>
            <Link to="/" relative="path">
                <h2>Já tem uma conta? Faça Login!</h2>
            </Link>
        </Container>
    );
}

export default SignUp;
