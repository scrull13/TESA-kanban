import React, { useEffect, useState } from "react";
import {
  Calendar,
  CheckSquare,
  List,
  Tag,
  Trash,
  Type,
  X,
} from "react-feather";
import Modal from "../../Modal/Modal";
import Editable from "../../Editabled/Editable";
import "./CardInfo.css";

function CardInfo(props) {
  const { updateCard, boardId, onClose, card } = props;

  const colors = [
    "#a8193d",
    "#4fcc25",
    "#1ebffa",
    "#8da377",
    "#9975bd",
    "#cf61a1",
    "#240959",
  ];

  const [selectedColor, setSelectedColor] = useState("");
  const [values, setValues] = useState({
    ...card,
    labels: card.labels || [],
    tasks: card.tasks || [],
    desc: card.desc || "",
  });

  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const updateDesc = (value) => {
    setValues({ ...values, desc: value });
  };

  const addLabel = (label) => {
    const index = values.labels.findIndex((item) => item.text === label.text);
    if (index > -1) return;

    setSelectedColor("");
    setValues({
      ...values,
      labels: [...values.labels, label],
    });
  };

  const removeLabel = (label) => {
    const tempLabels = values.labels.filter((item) => item.text !== label.text);
    setValues({
      ...values,
      labels: tempLabels,
    });
  };

  const removeTask = (id) => {
    const tempTasks = values.tasks.filter((item) => item.id !== id);
    setValues({
      ...values,
      tasks: tempTasks,
    });
  };

  const updateTask = (id, value) => {
    const updatedTasks = values.tasks.map((item) =>
      item.id === id ? { ...item, completed: value } : item
    );
    setValues({
      ...values,
      tasks: updatedTasks,
    });
  };

  const calculatePercent = () => {
    if (!values.tasks?.length) return 0;
    const completed = values.tasks.filter((item) => item.completed).length;
    return (completed / values.tasks.length) * 100;
  };

  const updateDate = (date) => {
    if (!date) return;
    setValues({
      ...values,
      date,
    });
  };

  useEffect(() => {
    if (updateCard) {
      updateCard(boardId, values.id, values);
    }
  }, [values, updateCard, boardId]);

  return (
    <Modal onClose={onClose}>
      <div className="cardinfo">
        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Type />
            <p>Имя задачи</p>
          </div>
          <Editable
            defaultValue={values.title}
            text={values.title}
            placeholder="Enter Title"
            onSubmit={updateTitle}
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <List />
            <p>Описание задачи</p>
          </div>
          <div className="cardinfo_description_preview">
            {values.desc || <em>No description added</em>}
          </div>
          <Editable
            defaultValue={values.desc}
            text="Edit Description"
            placeholder="Enter description"
            onSubmit={updateDesc}
            buttonText="Save"
            displayMode="button"
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Calendar />
            <p>Дата</p>
          </div>
          <div className="cardinfo_date_container">
            <div className="cardinfo_date_input_wrapper">
              <input
                type="date"
                defaultValue={values.date}
                min={new Date().toISOString().substr(0, 10)}
                onChange={(event) => updateDate(event.target.value)}
              />
              {values.date && (
                <span className="cardinfo_date_label">
                  {new Date(values.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <Tag />
            <p>Теги</p>
          </div>
          <div className="cardinfo_box_labels">
            {values.labels?.map((item, index) => (
              <label
                key={index}
                style={{ backgroundColor: item.color, color: "#fff" }}
              >
                {item.text}
                <X onClick={() => removeLabel(item)} />
              </label>
            ))}
          </div>
          <ul className="cardinfo_color_palette">
            {colors.map((item, index) => (
              <li
                key={index + item}
                style={{ backgroundColor: item }}
                className={selectedColor === item ? "li_active" : ""}
                onClick={() => setSelectedColor(item)}
              />
            ))}
          </ul>
          <Editable
            text="Добавить тег"
            placeholder="Название тега"
            onSubmit={(value) =>
              addLabel({ color: selectedColor, text: value })
            }
            buttonText="Добавить"
          />
        </div>

        <div className="cardinfo_box">
          <div className="cardinfo_box_title">
            <CheckSquare />
            <p>Задача</p>
            <span className="cardinfo_tasks_progress">
              {Math.round(calculatePercent())}% completed
            </span>
          </div>
          <div className="cardinfo_box_progress-bar">
            <div
              className="cardinfo_box_progress"
              style={{
                width: `${calculatePercent()}%`,
                backgroundColor:
                  calculatePercent() === 100 ? "limegreen" : "#1ebffa",
              }}
            />
          </div>
          <div className="cardinfo_box_task_list">
            {values.tasks?.map((item) => (
              <div key={item.id} className="cardinfo_box_task_checkbox">
                <input
                  type="checkbox"
                  defaultChecked={item.completed}
                  onChange={(event) =>
                    updateTask(item.id, event.target.checked)
                  }
                />
                <p className={item.completed ? "completed" : ""}>{item.text}</p>
                <Trash onClick={() => removeTask(item.id)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CardInfo;
