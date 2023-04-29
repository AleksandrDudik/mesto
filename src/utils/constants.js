import l1 from '../images/dedovsk.jpg';
import l2 from '../images/istra.jpg';
import l3 from '../images/moscow.jpg';
import l4 from '../images/nakhabino.jpg';
import l5 from '../images/ekaterinburg.jpg';
import l6 from '../images/zelenograd.jpg';

export const initialCards = [
  {
    city: 'Дедовск',
    link: l1
  },
  {
    city: 'Истра',
    link: l2
  },
  {
    city: 'Москва',
    link: l3
  },
  {
    city: 'Нахабино',
    link: l4
  },
  {
    city: 'Екатеринбург',
    link: l5
  },
  {
    city: 'Зеленоград',
    link: l6
  }
];

export const configuration = {inputSelector: '.popup__input', submitButtonSelector: '.popup__button', inactiveButtonClass: 'popup__button_disabled', inputErrorClass: 'popup__input_type_error', errorClass: 'popup__error_visible'};
