import {
  Button as ChakraButton,
  type ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

type ButtonVariant = "primary" | "secondary" | "reject";

interface ButtonProps extends ChakraButtonProps {
  variantType?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, ChakraButtonProps> = {
  primary: {
    bgGradient: "linear-gradient(to left, #6366F1 0%, #A855F7 100%)",
    color: "white",
    boxShadow: "0px 4px 5px -2px rgba(99, 102, 241, 0.25)",
    borderRadius: "16px",
    _hover: { boxShadow: "0px 0px 8px 0px rgba(99, 102, 241, 0.50)" },
  },
  secondary: {
    bg: "transparent",
    color: "#6366F1",
    borderWidth: "1px",
    borderColor: "#6366F1",
    borderRadius: "16px",
    _hover: { bg: "#6366F1", color: "white" },
  },
  reject: {
    bg: "transparent",
    color: "red",
    borderWidth: "1px",
    borderColor: "red",
    borderRadius: "16px",
    _hover: { boxShadow: "0px 0px 8px 0px rgba(255, 0, 0, 0.3)" },
  }
};


const Button: React.FC<ButtonProps> = ({
  children,
  variantType = "primary",
  ...rest
}) => {
  const styles = variantStyles[variantType];

  return (
    <ChakraButton {...styles} {...rest}>
      {children}
    </ChakraButton>
  );
};

export default Button;
