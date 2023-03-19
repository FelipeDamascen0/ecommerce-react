import { createContext, useContext, useState } from "react";



export const PaymentContext = createContext();
PaymentContext.displayName = 'Pagamento';

export const PaymentProvider = ({ children }) => {

  const paymentsType = [
    {name: 'Boleto', juros: 1, id: 1},
    {name: 'PIX', juros: 1, id: 2},
    {name: 'Cartão de Credito', juros: 1.3, id: 3}
  ];

  const [ paymentMethod, setPaymentMethod ] = useState(paymentsType[0]);
  

  return(
    <PaymentContext.Provider value={{
      paymentsType, paymentMethod, setPaymentMethod
    }}>
      {children}
    </PaymentContext.Provider>
  );
}

export const usePaymentContext = () => {
  const { paymentsType, paymentMethod, setPaymentMethod } = useContext(PaymentContext);

  const changePaymentMethod = (id) => {
    const currentPay = paymentsType.find(payment => payment.id === id);
    console.log(currentPay)
    setPaymentMethod(currentPay);
  }


  return {
    paymentsType, paymentMethod, changePaymentMethod
  }
}