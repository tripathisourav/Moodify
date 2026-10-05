const FormGroup = ({type, name, placeholder, setUsername}) => {
    return (
        <input type={type} name={name}
            onChange={(e) => {
                setUsername(e.target.value)
            }} placeholder={placeholder} />
    )
}

export default FormGroup