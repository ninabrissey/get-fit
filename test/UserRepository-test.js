import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import User from '../src/User';

describe('User Repository', () => {
  let userRepo;
  let data;

  beforeEach(() => {
    data = [
      {
        id: 1,
        name: 'Nina Rachel',
        address: '1500 Hotgirl Street, Denver, CO 80030',
        email: 'ladies@hotmail.com',
        strideLength: 4.1,
        dailyStepGoal: 10000,
        friends: [2],
      },
      {
        id: 2,
        name: 'Lion Floof',
        address: '45 Hotdamn Street, Westminster, CO 80021',
        email: 'lionFloof@hotmail.com',
        strideLength: 0.00003,
        dailyStepGoal: 100,
        friends: [1, 3],
      },
      {
        id: 3,
        name: 'Jennifer Aniston',
        address: 'Hollywood',
        email: '',
        strideLength: 4.1,
        dailyStepGoal: 20000,
        friends: [6, 9, 100, 90],
      },
    ];
    userRepo = new UserRepository(data);
  });
  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });

  it('should be a instance of UserRepository', () => {
    expect(userRepo).to.be.instanceOf(UserRepository);
  });

  it("should start with an array user's data", () => {
    expect(userRepo.allUsers).to.be.a('array');
  });

  it('should be able to instantiate all Users', () => {
    userRepo.instantiateAllUsers();

    expect(userRepo.allUsers[0]).to.be.instanceOf(User);
    expect(userRepo.allUsers[1].name).to.equal('Lion Floof');
  });

  it('should return requested User object instances', () => {
    userRepo.instantiateAllUsers();

    let userInfo1 = userRepo.getUserInfo(2);
    let userInfo2 = userRepo.getUserInfo(1);

    expect(userInfo1.name).to.equal('Lion Floof');
    expect(userInfo1.strideLength).to.equal(0.00003);
  });

  it('should be able to return the average step goal amongst all users', () => {
    userRepo.instantiateAllUsers();

    let avgStepGoal = userRepo.calculateAverageStepGoal();

    expect(avgStepGoal).to.equal(10033);
  });
  //If the user id passed is invalid (edge case? sad path?)
});
