import shortid from 'shortid';
import * as types from '../actions/types';

const flashMessages = (state = [], action) => {
  switch (action.type) {
    case types.ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text
        }
      ];
    default:
      return state;
  }
};

export default flashMessages;
