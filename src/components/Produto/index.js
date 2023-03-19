import { Container } from './styles';
import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCartContext } from 'common/context/cart';


function Produto({
  nome,
  foto,
  id,
  valor,
  unidade
}) {

  const { cart, addProduct, removeProduct } = useCartContext();
  const itemQuantity = cart.find(itemCart => itemCart.id === id);
  
  return (
      <Container>
        <div>
          <img
            src={`/assets/${foto}.png`}
            alt={`foto de ${nome}`}
          />
          <p>
            {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
          </p>
        </div>
        <div>
          <IconButton
            color="secondary"
            onClick={() => removeProduct(id)}
            disabled={!itemQuantity}
          >
            <RemoveIcon />
          </IconButton> 

          {itemQuantity?.quantity || 0}

          <IconButton
            color='primary'
            onClick={() => addProduct({nome, valor, foto, id})}
          >
            <AddIcon />
          </IconButton>
        </div>
      </Container>
  )
}

export default memo(Produto)