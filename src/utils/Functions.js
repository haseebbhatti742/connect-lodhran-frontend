import { PAYMENT_METHODS } from './Constants';

export const getPaymentMethodNameByKey = (key) => {
    return PAYMENT_METHODS.find((item) => item.key === key).value;
};
