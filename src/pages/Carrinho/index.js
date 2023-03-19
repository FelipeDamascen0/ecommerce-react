import { Button, Snackbar, InputLabel, Select, MenuItem } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useCartContext } from 'common/context/cart';
import { usePaymentContext } from 'common/context/payment';
import { UserContext } from 'common/context/user';
import Produto from 'components/Produto';
import { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { cart, total, makePurchase } = useCartContext();
  const { balance = 0 } = useContext(UserContext);
  const { paymentMethod, paymentsType, changePaymentMethod } = usePaymentContext();
  const totalBalance = useMemo(() => balance - total, [balance, total]);
  const navigate = useNavigate();

  return (
    <Container>
      <Voltar 
        onClick={() => navigate(-1)}
      />
      <h2>
        Carrinho
      </h2>
      {
        cart.map((itemCart) => {
          return(
            <Produto key={itemCart.id} {...itemCart}/>
          );

        })
      }
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select 
          value={paymentMethod.id} 
          onChange={(event) => changePaymentMethod(event.target.value)}
        >
          {
            paymentsType.map((typePayment) => {
              return(
                <MenuItem value={typePayment.id} key={typePayment.id}>
                  {typePayment.name}
                </MenuItem>
              )
            })
          }
        </Select>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R$ {total} </span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {balance}</span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ {totalBalance}</span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          makePurchase();
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
        disabled={totalBalance < 0 || cart.length === 0}
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;