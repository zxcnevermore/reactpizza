import React, { FC } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axsios from 'axios';

const FullPizza: FC = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [pizza, setPizza] = React.useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axsios.get(
                    `https://63051ff2697408f7edc23a12.mockapi.io/items/${id}`,
                );
                setPizza(data);
            } catch (error) {
                alert('Ошибка получения пицц');
                navigate('/');
            }
        }

        fetchPizza();
    }, []);

    if (!pizza) {
        return <>Идёт загрузка</>;
    }

    return (
        <div className="content">
            <div className="container">
                <img src={pizza.imageUrl} alt="Pizza" />
                <h1>{pizza.title}</h1>
                <h3>{pizza.price} ₽</h3>
                <Link to="/" className="button button--outline button--add">
                    <span>Назад</span>
                </Link>
            </div>
        </div>
    );
};

export default FullPizza;
