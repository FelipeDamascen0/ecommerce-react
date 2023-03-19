import { Button } from '@material-ui/core';
import {
  Container,
  Titulo,
  InputContainer
} from './styles';
import {
  Input,
  InputLabel,
  InputAdornment 
} from '@material-ui/core';
import { useContext } from 'react';
import { UserContext } from 'common/context/user';
import { useNavigate } from 'react-router-dom';

function Login() {

  const {name, setName, balance, setBalance} = useContext(UserContext);
  const history = useNavigate();

  return (
    <Container>
      <Titulo>
        Insira o seu nome
      </Titulo>
      <InputContainer>
        <InputLabel>
          Nome
        </InputLabel>
        <Input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>
          Saldo
        </InputLabel>
        <Input
          type="number"
          value={balance}
          onChange={(event) => setBalance(event.target.value)}
          startAdornment={
            <InputAdornment position="start">
              R$
            </InputAdornment>
          }
        />
      </InputContainer>
        <Button
          variant="contained"
          color="primary"
          disabled={!name.length > 0}
          onClick={() => history('/feira')}
        >
          Avançar
        </Button>
    </Container>
  )
};

export default Login;