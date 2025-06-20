import React from "react";
import { useHistory } from "react-router-dom";
import "./App.css";

export default function Home() {
  const history = useHistory();

  return (
    <div className="home-container">
      <div className="app_nav">
        <ul className="navigation">
          <li>
            <button className="nav__btn">
              <img src="/logo.png" alt="logo" className="logo" />
            </button>
          </li>
          <li>
            <button className="nav__btn active">Домой</button>
          </li>
          <li>
            <button className="nav__btn" onClick={() => history.push("/projects")}>
              Проекты
            </button>
          </li>
          <li>
            <button className="nav__btn" onClick={() => history.push("/tasks")}>
              Мои задачи
            </button>
          </li>
        </ul>
      </div>

      <div className="home-content">
        <h1>Задачи на досках Kanban в TESA: от постановки до выполнения</h1>
        
        <p>Доска Kanban в TESA помогает командам постоянно оптимизировать время цикла и повышать эффективность работы. Доска Kanban в TESA – это не просто место хранения заданий. Ее задачи гораздо шире.</p>

        <h2>Обеспечение прозрачности</h2>
        <p>Наличие единого источника достоверной информации помогает наладить эффективную коммуникацию в команде. С досками Kanban состояние работы в команде всегда на виду: вы сразу видите самую важную информацию по всем историям, задачам, багам и заданиям.</p>

        <h2>Оптимизация рабочих процессов</h2>
        <p>Доски Kanban помогают наглядно представить работу на разных этапах. С помощью доски Kanban в TESA команды могут создавать и настраивать процессы разной сложности.</p>

        <h2>Эффективное выявление узких мест</h2>
        <p>Объем незавершенной работы (WIP) – это количество историй, которые одновременно могут находиться на одном этапе работы. Определение WIP крайне важно для того, чтобы предотвратить узкие места и спокойно выполнять задачи на протяжении всего рабочего процесса.</p>

        <h2>Постоянное улучшение</h2>
        <p>Agile-отчеты для доски Kanban в TESA в режиме реального времени отображают наглядные показатели, с помощью которых можно отслеживать время цикла и выявлять блокеры рабочих процессов на основе сводной диаграммы процесса.</p>
      </div>
    </div>
  );
}