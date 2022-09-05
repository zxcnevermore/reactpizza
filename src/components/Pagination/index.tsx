import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { countPizzaSelector } from '../../Redux/slices/pizzasSlice';

type PaginationProp = {
    onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProp> = ({ onChangePage }) => {
    const countPizza = useSelector(countPizzaSelector);

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onChangePage(event.selected + 1)}
            pageRangeDisplayed={3}
            pageCount={Math.ceil(countPizza / 4)}
            previousLabel="<"
        />
    );
};

export default Pagination;
