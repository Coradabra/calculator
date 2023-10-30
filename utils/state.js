const useState = (initValue) => {
  let variable = initValue;

  const setVariable = (updatedValue) => {
    variable = updatedValue;
  };

  return [variable, setVariable()];
};

module.exports = { useState };
