import React from "react";
import styles from "./Search.module.scss";
import searchLogo from "../../assets/search_icon.svg";
import closeLogo from "../../assets/close_icon.svg";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from '../../redux/slices/filterSlice'

const Search = () => {
  const dispatch = useDispatch()
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef();

  const updSearchValue = React.useMemo(() => {
    return debounce((str)=> {
      dispatch(setSearchValue(str))
    }, 250);
  }, [dispatch]);

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updSearchValue(event.target.value);
  };

    const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue('')
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <img src={searchLogo} alt="Search" className={styles.icon} />
      <input
        ref={inputRef}
        value={value}
        placeholder="Поиск пиццы ..."
        className={styles.input}
        onChange={onChangeInput}
      />
      {value && (
        <img
          src={closeLogo}
          alt="Close"
          className={styles.close}
          onClick={onClickClear}
        />
      )}
    </div>
  );
};

export default Search;
