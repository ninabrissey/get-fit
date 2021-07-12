import { expect } from 'chai';
import User from '../src/User';

describe('User', () => {
  let user;
  let data;

  beforeEach(() => {
    data = {
      id: 1,
      name: 'Nina Rachel',
      address: '1500 Hotgirl Street, Denver, CO 80030',
      email: 'ladies@hotmail.com',
      strideLength: 4.1,
      dailyStepGoal: 10000,
      friends: [5, 2, 14],
    };

    user = new User(data);
  });

  it('should be a function', function () {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user).to.be.instanceOf(User);
  });

  it('should have a key of name', () => {
    expect(user.name).to.equal('Nina Rachel');
  });

  it('should have a key of address', () => {
    expect(user.address).to.equal('1500 Hotgirl Street, Denver, CO 80030');
  });

  it('should have a key of email', () => {
    expect(user.email).to.equal('ladies@hotmail.com');
  });

  it('should have a key of stride length', () => {
    expect(user.strideLength).to.equal(4.1);
  });

  it('should save stride as a number', () => {
    expect(user.strideLength).to.be.a('number');
  });

  it('should have a key of daily step goal', () => {
    expect(user.dailyStepGoal).to.equal(10000);
  });

  it('should have a key of friends', () => {
    expect(user.friends).to.be.a('array');
    expect(user.friends[0]).to.equal(5);
  });

  it('should be able to return a first name', () => {
    let firstName = user.getFirstName();

    expect(firstName).to.equal('Nina');
  });

  it('should return a greeting if a user has not entered a first name', () => {
    let noNameData = {
      id: 1,
      name: '',
      address: '1500 Hotgirl Street, Denver, CO 80030',
      email: 'ladies@hotmail.com',
      strideLength: 4.1,
      dailyStepGoal: 10000,
      friends: [5, 2, 14],
    };
    let userNoName = new User(noNameData);

    let firstName = userNoName.getFirstName();

    expect(firstName).to.equal('Hello');
  });
});
