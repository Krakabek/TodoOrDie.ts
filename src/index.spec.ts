import { TodoOrDie } from "./index";

const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

describe('basic test', ()=>{
  it('should print an error', ()=>{
    TodoOrDie('this is a test');
    expect(consoleErrorMock).toBeCalledWith('this is a test');
  })
});