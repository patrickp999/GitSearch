import React from 'react';

function Select({ options, selectValue, selectName, handleSelected }) {
  return (
    <select
      name={selectName}
      className='select'
      value={selectValue}
      onChange={(e) => handleSelected(e.target.value)}
    >
      {Object.keys(options).map((item, index) => (
        <option key={index} value={item}>
          {options[item]}
        </option>
      ))}
    </select>
  );
}

export default Select;
