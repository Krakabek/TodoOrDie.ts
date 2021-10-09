import { TodoOrDie } from "./index";

describe("TodoOrDie", () => {
  const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();
  beforeEach(() => {
    jest.useFakeTimers("modern");
    [consoleErrorMock].forEach(m => m.mockReset());
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("setting deadlines", () => {
    it("does nothing if it's too early", () => {
      jest.setSystemTime(new Date("1996-09-11").getTime());
      TodoOrDie("Drop the experiment check by 10.10.2020", new Date("2020-10-10"));
      expect(consoleErrorMock).not.toBeCalled();
    });

    it("displays error in console if time has come", () => {
      jest.setSystemTime(new Date("2020-10-11").getTime());
      TodoOrDie("Drop the experiment check", new Date("2020-10-10"));
      expect(consoleErrorMock).toBeCalledWith("TODO: 'Drop the experiment check' is overdue. Do it!");
    });

    it("accepts date string as second argument", () => {
      jest.setSystemTime(new Date("2020-10-11").getTime());
      TodoOrDie("Drop the experiment check", "2020-10-10");
      expect(consoleErrorMock).toBeCalledWith("TODO: 'Drop the experiment check' is overdue. Do it!");
    });
  });
  describe("custom trigger", () => {
    it("accepts function as second argument", () => {
      expect(() => {
        TodoOrDie("Drop the experiment check", () => false);
      }).not.toThrow();
    });
    it("displays error in console if custom trigger returns true", () => {
      TodoOrDie("Drop the experiment check", () => true);
      expect(consoleErrorMock).toBeCalledWith("TODO: 'Drop the experiment check' is overdue. Do it!");
    });
    it("does not display error in console if custom trigger returns false", () => {
      TodoOrDie("Drop the experiment check", () => true);
      expect(consoleErrorMock).not.toBeCalledWith();
    });
  });
});
