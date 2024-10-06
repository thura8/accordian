import { useState } from "react";
import data from "./data.js";

export default function Accordian() {
  const [select, setSelect] = useState(null);
  const [enableMultiple, setEnableMultiple] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSelectChange(getCurrentId) {
    setSelect(getCurrentId === select ? null : getCurrentId);
  }

  function handleMultiple(getCurrentId) {
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

    if (findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentId);
    else cpyMultiple.splice(findIndexOfCurrentId, 1);

    setMultiple(cpyMultiple);
  }

  return (
    <>
      <button onClick={() => setEnableMultiple(!enableMultiple)}>
        Enable Multi Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div key={dataItem.id} className="item">
              <div
                onClick={
                  enableMultiple
                    ? () => handleMultiple(dataItem.id)
                    : () => handleSelectChange(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>

              {select === dataItem.id ||
              multiple.indexOf(dataItem.id) !== -1 ? (
                <div className="answer">{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </>
  );
}
