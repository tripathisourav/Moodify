import Icon from "./Icon";

const CtrlBtn = ({ d, onClick }) => (
    <button
        onClick={onClick}
        style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,.4)",
            display: "flex",
            padding: "4px",
            transition: "color .15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(255,255,255,.4)")
        }
    >
        <Icon d={d} />
    </button>
);

export default CtrlBtn;