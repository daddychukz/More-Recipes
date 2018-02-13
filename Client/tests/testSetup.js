import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import $ from 'jquery';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
const result = [{ secure_url: 'http://cloudinary/img/123.png' }];
global.cloudinary = {
  openUploadWidget: (params, cb) => {
    cb(null, result);
  }
};
global.customHistory = {
  push: jest.fn(),
};
global.$ = $;
$.prototype.modal = () => { };

console.error = (message) => {
  throw new Error(message);
};
jest.mock('react-router');
