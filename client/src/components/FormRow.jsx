/* eslint-disable react/prop-types */
const FormRow = ({ type, name, labelText, defaultValue, onChange }) => {
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
        onChange={onChange}
      />
    </div>
  );
};
export default FormRow;
