import React from 'react';

import qs from 'qs';
import Skeleton from '../assets/loader';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import {
    selectFilter,
    setCategoryId,
    setCurrentPage,
    setFilters,
} from '../Redux/slices/filterSlice';
import { fetchPizzas, selectPizza, TParams } from '../Redux/slices/pizzasSlice';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../Redux/store';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
    const { status, items } = useSelector(selectPizza);
    const sortType = sort.sortProperty;

    const onChangeCategory = React.useCallback((idx: number) => {
        dispatch(setCategoryId(idx));
    }, []);

    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const fetchData = async () => {
        const sortBy = sortType.replace('-', '');
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? String(categoryId) : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                search,
                currentPage,
            }),
        );
    };
    React.useEffect(() => {
        // if (!isSearch.current) {
        fetchData();
        // }
        // isSearch.current = false;

        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    // React.useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId,
    //             currentPage,
    //         });
    //         navigate(`?${queryString}`);
    //     }
    //     isMounted.current = true;
    // }, [categoryId, sortType, currentPage]);

    const filterPizza = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="content">
            <div className="container">
                <div className="content__top">
                    <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                    <Sort value={sort} />
                </div>
                <h2 className="content__title">
                    {searchValue ? `Поиск по: ${searchValue}` : 'Все пиццы'}
                </h2>
                <div className="content__items">
                    {status === 'loading' ? skeleton : filterPizza}
                </div>
                <Pagination onChangePage={onChangePage} />
            </div>
        </div>
    );
};

export default Home;
