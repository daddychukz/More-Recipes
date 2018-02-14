import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import render from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import ConnectedRecipeForm,
{ PureRecipeForm } from '../../../src/components/forms/RecipeForm';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  recipeOperations: {
    pagination: {},
    recipes: []
  }
};
const store = mockStore(initialState);

const props = {
  addRecipe: sinon.spy(() => new Promise(() => {}))
};

const mountedWrapper = mount(
  <BrowserRouter>
    <ConnectedRecipeForm store={store} />
  </BrowserRouter>
);

const shallowWrapper = shallow(<PureRecipeForm {...props} />);
const state = {
  Title: '',
  Description: '',
  ImageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
  PublicId: 'home_gipmmy.jpg',
  error: false,
};
const event = {
  preventDefault: jest.fn(),
  target: {
    Title: 'Yam',
    Description: 'This is how it is prepared',
  }
};

describe('Add recipe test actions', () => {
  it('renders Add recipe component without crashing', () => {
    expect(mountedWrapper).toBeDefined();
    expect(mountedWrapper.find('RecipeForm').length).toBe(1);
  });

  it('should match component snapshot', () => {
    const tree = render.create(
      <BrowserRouter >
        <PureRecipeForm {...props} />
      </BrowserRouter>);
    expect(tree).toMatchSnapshot();
  });

  it('calls onChange event', () => {
    sinon.spy(shallowWrapper.instance(), 'onChange');
    shallowWrapper.instance().onChange(event);
    expect(shallowWrapper.instance().onChange.calledOnce).toEqual(true);
  });

  it('calls onSubmit event', () => {
    sinon.spy(shallowWrapper.instance(), 'onSubmit');
    shallowWrapper.setState(state);
    shallowWrapper.instance().onSubmit(event);
    expect(shallowWrapper.instance().onSubmit.calledOnce).toEqual(true);
  });

  it('calls uploadWidget function when user adds image successfully', () => {
    sinon.spy(shallowWrapper.instance(), 'uploadWidget');
    shallowWrapper.instance().uploadWidget();
    expect(shallowWrapper.instance().uploadWidget.calledOnce).toEqual(true);
  });
});
