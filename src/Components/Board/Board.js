import React from "react";
import Card from "../Card/Card";
import Editable from "../Editabled/Editable";
import "./Board.css";

function Board(props) {
  return (
    <div className="board">
      <div className="board_header">
        <p className="board_header_title">
          {props.board.title}
          <span>{props.board.cards.length}</span>
        </p>
      </div>
      <div className="board_cards">
        {props.board.cards.map((item) => (
          <Card
            key={item.id}
            card={item}
            boardId={props.board.id}
            removeCard={props.removeCard}
            dragEntered={props.dragEntered}
            dragEnded={props.dragEnded}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text="+ Добавить задачу"
          placeholder="Имя задачи"
          displayClass="board_add-card"
          editClass="board_add-card_edit"
          onSubmit={(value) => props.addCard(props.board.id, value)}
        />
      </div>
    </div>
  );
}

export default Board;