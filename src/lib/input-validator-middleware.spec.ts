import 'reflect-metadata';
import { faker } from '@faker-js/faker';
import { IsInt, IsString } from 'class-validator';
import { validateAndTransform } from './input-validator-middleware';

class TestUserClass {
  @IsString()
  name!: string;

  @IsString()
  email!: string;

  @IsInt()
  age!: number;
}

const doneFn = jest.fn();

const resWrapper = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};

describe('ValidatorMiddleware', () => {
  afterEach(() => {
    doneFn.mockReset();
    resWrapper.status.mockClear();
    resWrapper.json.mockClear();
  });

  it('should validate and transform the request body', async () => {
    expect.assertions(2);

    const testUser = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      age: faker.number.int(),
    };
    const req = { body: testUser };
    const result = validateAndTransform({ body: TestUserClass });

    await result(req as never, resWrapper as never, doneFn);

    expect(req.body).toBeInstanceOf(TestUserClass);
    expect(doneFn).toHaveBeenCalledTimes(1);
  });

  it('should return a 400 error if the request body is invalid', async () => {
    expect.assertions(2);

    const testUser = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      age: faker.number.float(),
    };
    const req = { body: testUser };
    const result = validateAndTransform({ body: TestUserClass });

    await result(req as never, resWrapper as never, doneFn);

    expect(resWrapper.status).toHaveBeenCalledWith(400);
    expect(resWrapper.json).toHaveBeenCalledTimes(1);
  });
});
