import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import { useCartContext } from 'common/context/cart';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const { quantityState } = useCartContext();
  const navigate = useNavigate();

  return (
    <Nav>
      <Logo />
      <IconButton
        disabled={quantityState === 0}
        onClick={() => navigate('/carrinho')}
      >
        <Badge
          color="primary"
          badgeContent={quantityState}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}