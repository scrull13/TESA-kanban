import React, { useState } from "react";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Dropdown from "../Dropdown/Dropdown";
import "./Card.css";
import CardInfo from "./CardInfo/CardInfo";

function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { id, title, desc, date, tasks, labels } = props.card;

  const taskId = `TS-${id.toString().slice(-2)}`;

  const formatDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (!date) return "";

    const months = [
      "Янв",
      "Фев",
      "Мар",
      "Апр",
      "Май",
      "Июнь",
      "Июль",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    return day + " " + month;
  };

  return (
    <>
      {showModal && (
        <CardInfo
          onClose={() => setShowModal(false)}
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
        />
      )}

      <div
        className="card"
        draggable
        onDragEnd={() => props.dragEnded(props.boardId, id)}
        onDragEnter={() => props.dragEntered(props.boardId, id)}
        onClick={() => setShowModal(true)}
      >
        {/* 1. ID задачи в самом верху */}
        <div className="card_task_id">{taskId}</div>

        {/* 2. Название и описание задачи */}
        <div className="card_title">{title}</div>
        {desc && <div className="card_description">{desc}</div>}

        {/* 3. Футер с лейблами, датой и меню */}
        <div className="card_footer">
          <div className="card_footer_left">
            {date && (
              <p className="card_footer_item">
                <Clock className="card_footer_icon" />
                {formatDate(date)}
              </p>
            )}
            {tasks && tasks?.length > 0 && (
              <p className="card_footer_item">
                <CheckSquare className="card_footer_icon" />
                {tasks?.filter((item) => item.completed)?.length}/
                {tasks?.length}
              </p>
            )}
            {labels?.length > 0 && (
              <div className="card_labels">
                {labels.map((item, index) => (
                  <span
                    key={index}
                    className="card_label"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown
                class="board_dropdown"
                onClose={() => setShowDropdown(false)}
              >
                <p onClick={() => props.removeCard(props.boardId, id)}>
                  Delete Card
                </p>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
