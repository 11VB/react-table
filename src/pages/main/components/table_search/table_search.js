import { useState, memo } from "react";
import "./table_search.scss";

const TableSearch =  memo(({ onSearch }) => {
    const [value, setValue] = useState("");

    const valueChangeHandler = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className="input-group mb-3 mt-3">
            <div className="input-group-prepend">
                <button className="btn" onClick={() => onSearch(value)}>
                    Search
                </button>
            </div>
            <input 
                type="text" 
                className="form-control"
                onChange={valueChangeHandler}
                value={value}
            />
        </div>
    );
});

export default TableSearch;