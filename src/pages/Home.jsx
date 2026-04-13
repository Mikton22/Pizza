import React, { useEffect, useRef } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import MyLoader from "../components/PizzaBlock/skeleton";
import {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  selectFilter,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzasData } from "../redux/slices/pizzasSlice";
// import pizzas from './assets/pizzas.json';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  const { categoryId, selectedSort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzasData);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onClickSort = (id) => {
    dispatch(setSort(id));
  };

  const onClickPage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : ``;
    const search = searchValue ? `search=${searchValue}` : ``;
    const sortBy = selectedSort.sortProperty.replace('-', '');
    const order = selectedSort.sortProperty.includes('-') ? 'desc' : 'asc';
    /* fetch(
      `https://68149373225ff1af16294cea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortList[selectedSort].sortType}&order=desc&${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        if (arr === 'Not found') {
          arr = [];
        }
        setItems(arr);
        setIsLoading(false);
      });*/
    dispatch(
      fetchPizzas({
        category,
        search,
        sortBy,
        order,
        currentPage,
      }),
    );
  };
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        selectedSort,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, selectedSort, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setFilters({ ...params }));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();
  }, [categoryId, selectedSort, searchValue, currentPage]);

  const pizzas = items.map((pizza) => (
    // <Link></Link>
    <div key={pizza.id} to={`/pizza/${pizza.id}`}>
      <PizzaBlock {...pizza} />
    </div>
  ));

  const skeletons = [...new Array(6)].map((_, index) => (
    <MyLoader key={index} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={selectedSort} onChangeSort={onClickSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content">
          <h2> Ничего не найдено 😕 </h2>
          <p>Не удалось загрузить питсы. Попробуйте позже</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination onChangePage={onClickPage} />
    </>
  );
};

export default Home;
