/* eslint-disable react/prop-types */
const FormRow = ({ type, name, labelText, defaultValue }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        className="form-input"
        defaultValue={defaultValue}
        type={type}
        id={name}
        name={name}
        required
      />
    </div>
  );
};
export default FormRow;
