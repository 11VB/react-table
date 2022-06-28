import "./mode_selector.scss";

const ModeSelector = ({ onSelect }) =>  (
    <div id="mode-selector">
        <button onClick={() => onSelect()} className="btn">32 elements</button>
        <button onClick={() => onSelect(true)} className="btn">1000 elements</button>
    </div>
);

export default ModeSelector;