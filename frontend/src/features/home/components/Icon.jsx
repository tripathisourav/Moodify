const Icon = ({ d, sz = 16, fill = "currentColor" }) => (
    <svg
        viewBox="0 0 24 24"
        style={{
            width: sz,
            height: sz,
            fill,
            display: "block",
            flexShrink: 0,
        }}
    >
        <path d={d} />
    </svg>
);

export default Icon;