
import request from 'supertest';
import chai from 'chai';
import faker from 'Faker';
import app from '../../src/app';
import models from '../../src/models';
import fakeData from '../helpers/fakeData';

const expect = chai.expect;
let userToken;
let newUser;
let recipe1;
let recipe2;

