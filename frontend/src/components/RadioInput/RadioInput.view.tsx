import "./RadioInput.css";

type RadioInputProps = {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  onSelect: (value: string) => void;
};

const RadioInput = (props: RadioInputProps) => {
  const { label, value, onSelect, checked = false, disabled = false } = props;

  // TODO: something is wrong with the input's logic
  return (
    <div className="radioInput" data-testid="radio-input-container">
      <label>
        <input
          data-testid="radio-input-control"
          className="radio"
          type="radio"
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onSelect((e.target as HTMLInputElement).value)}
        />
        <span>{value}</span>
      </label>
    </div>
  );
};

export default RadioInput;
