import axios from 'axios';
import jwt from 'jsonwebtoken';
import toastr from 'toastr';
import * as types from './types';
import setAuthorizationToken from '../utils/setAuthorizationToken';


export const addRecipe = recipe => (dispatch) => {
  return axios.post('http://localhost:5000/api/v1/recipes', recipe).then((response) => {
    toastr.success('Recipe Successfully Created');
    console.log(response.data);
    dispatch({
      type: types.CREATE_RECIPE,
      payload: recipe
    });
  });
};
