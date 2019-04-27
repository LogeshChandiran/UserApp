import styled from 'styled-components';

export const FormGroup = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px;
    input{
        width: 50%;
    }
`;

export const LoaderButton = styled.input`
    padding: 10px;
    border-radius: 10px;
    border: none;
    background-color: cadetblue;
    margin: 10px 10px;
    font-size: 20px;
`;
export const ControlLabel = styled.label`
    padding-right: 10px;
`;

export const Form = styled.form`
    border: none;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 100px;
`;
export const SignInForm = styled.form`
    border: none;
    display: flex;
    flex-direction: column;
    width: 25%;
    padding: 100px;
`;
export const SwitchWraper =styled.div`
    label{
        font-size: 12px;
        padding-top: 3px;
    };
    display: flex;
    justify-content: flex-end;
    padding: 15px;
    margin-top: 15px;
`;

export const SwitchButton = styled.button`
    background-color: cadetblue;
    border: cadetblue;
    padding: 5px 15px;
    border-radius: 10px;
`;

export const Paragraph = styled.p`
    word-break: break-all;
    width: 450px;
    font-size: 15px;
    color: #ff0000b0;
`;

export const SignInWrapper = styled.div`
    text-align: center;
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
`;

export const ErrorMsgWrapper = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
`