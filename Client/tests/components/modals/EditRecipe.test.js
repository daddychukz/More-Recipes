import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import EditRecipe from '../../../src/components/modals/EditRecipeModal';


const props = {
  title: '',
  onChange: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  publicId: '',
  description: '',
  onSubmit: sinon.spy(() => new Promise((cb) => {
    cb();
  })),
  uploadWidget: sinon.spy(() => new Promise((cb) => {
    cb();
  }))
};

const shallowWrapper = shallow(<EditRecipe {...props} />);

describe('Edit Recipe Modal test suite', () => {
  it('renders edit recipe modal without crashing', () => {
    expect(shallowWrapper).toBeDefined();
  });

  it('should match component snapshot', () => {
    expect(shallowWrapper).toMatchSnapshot();
  });
});
