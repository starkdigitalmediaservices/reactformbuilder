import { Button, Form } from "react-bootstrap";

export default function ButtonComponent(props) {
  const {
    name,
    href,
    type,
    containerClass,
    className,
    disable,
    variant,
    target,
    onClick,
    label,
  } = props;

  return (
    <>
      <Form.Group className={containerClass}>
        {label ? <Form.Label>{label}:</Form.Label> : null}
        {type == "link" && variant == "link"  ? (
          <Button
            className={className}
            href={href}
            variant={variant}
            target={target}
          >
            {name}
          </Button>
        ) : (
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
        )}
      </Form.Group>
    </>
  );
}
