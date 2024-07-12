import { Button, Form } from "react-bootstrap";

export default function ButtonComponent(props) {
  const {
    name,
    containerClass,
    className,
    disable,
    variant,
    onClick,
    label,
  } = props;

  return (
    <>
      <Form.Group className={containerClass}>
        {label ? <Form.Label>{label}:</Form.Label> : null}
        <Button
          className={className}
          disabled={disable}
          variant={variant}
          onClick={() => {
            if (onClick) onClick();
          }}
        >
          {name}
        </Button>
      </Form.Group>
    </>
  );
}
