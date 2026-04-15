import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://68f676c56b852b1d6f16d028.mockapi.io/items?id=${id}`,
        );
        setPizza(data[0]);
      } catch (error) {
        alert("Ошибка загрузки");
      }
    }
    fetchPizza();
  }, [id]);

  if (!pizza) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container">
      <h2>{pizza.title}</h2>
      <img src={pizza.imageUrl} alt={pizza.title} style={{ width: "300px" }} />
      <p style={{ fontSize: "22px" }}>{pizza.id === 1 && "ENJOY CHEESE"}</p>
      <p>{pizza.price} Руб.</p>
    </div>
  );
};

export default FullPizza;
