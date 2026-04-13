import React, { useState } from 'react';

export const sortList = [
  { name: "популярности", sortProperty: "rating" },
  { name: "цене", sortProperty: "price" },
  { name: "алфавиту", sortProperty: "title" },
];

function Sort({ value, onChangeSort }) {
  const [open, setOpen] = useState(false);

  const onClickListItem = (i) => {
    onChangeSort(i);
    setOpen(false);
  };

  const sortRef = React.useRef()

  React.useEffect(() => {
  const handleClick = (event) => {
    if (sortRef.current && sortRef.current.contains(event.target)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  document.body.addEventListener('click', handleClick);
  return () => document.body.removeEventListener('click', handleClick);
}, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label" onClick={() => setOpen(!open)}>
        <b>Сортировка по:</b>
        <span>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(obj)}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;