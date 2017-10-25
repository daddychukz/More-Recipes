import * as types from './types';

export const addFlashMessage = message => ({
  type: types.ADD_FLASH_MESSAGE,
  message
});
