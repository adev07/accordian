import { useState } from "react";
import data from "./data";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [multiSelection, setMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }
  console.log(selected);

  function handleMultiSelection(getCurrentId) {
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);

    console.log(findIndexOfCurrentId);
    if (findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentId);
    else cpyMultiple.splice(findIndexOfCurrentId, 1);
    setMultiple(cpyMultiple);
  }

  return (
    <div className="flex flex-col gap-[20px] min-h-[100vh] justify-center items-center bg-[#002244] py-8">
      <button
        className="px-[12px] py-[20px] bg-[#7FFFD4] rounded-[8px] text-[#002244] font-bold text-[20px] cursor-pointer"
        onClick={() => setMultiSelection(!multiSelection)}
      >
        Enable Multi Selection
      </button>
      <div className="w-[500px]">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="bg-[#7FFFD4] mb-[10px] px-[14px] py-[20px] rounded-[8px]">
              <div
                className="text-[#002244] flex justify-between items-center cursor-pointer"
                onClick={
                  multiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
              >
                <h2 className="font-bold">{dataItem.question}</h2>
                <span className="font-bold">+</span>
              </div>
              {multiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="font-semibold text-[#002244] h-auto text-justify mt-2">
                      {dataItem.answer}
                    </div>
                  )
                : selected === dataItem.id && (
                    <div className="font-semibold text-[#002244] h-auto text-justify">
                      {dataItem.answer}
                    </div>
                  )}
              {/* {selected === dataItem.id ? (
                <div className="text-[#ffff] h-auto text-justify mt-2">
                  {dataItem.answer}
                </div>
              ) : null} */}
            </div>
          ))
        ) : (
          <div>No data found !</div>
        )}
      </div>
    </div>
  );
}
