import ModuleLibrary from "../index";

test("Should register all components when installed", () => {
  const filter = jest.fn();
  const Vue = { filter, prototype: {} };

  ModuleLibrary.install(Vue);

  // Test if a particular component was registered
  expect(filter).toBeCalledWith("moment", expect.any(Function));
  expect(filter).toBeCalledWith("duration", expect.any(Function));

  // Test how many times component got registered
  const totalOfFilters = 2;
  expect(filter).toHaveBeenCalledTimes(totalOfFilters);
});
