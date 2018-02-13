import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import DeleteRecipe from '../../../src/components/modals/DeleteRecipeModal';


const props = {
  onClick: sinon.spy(() => new Promise((cb) => {
    cb();
  }))
};

const shallowWrapper = shallow(<DeleteRecipe {...props} />);

describe('Delete Recipe Modal test suite', () => {
  it('renders delete recipe modal without crashing', () => {
    expect(shallowWrapper).toBeDefined();
  });

  it('should match component snapshot', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
