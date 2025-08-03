interface AuthButtonProps {
  buttonText: string;
  bgColor: string;
}

const AuthButton = ({ buttonText, bgColor }: AuthButtonProps) => {
  const buttonStyles = `${bgColor} px-4 py-1 rounded-md cursor-pointer`;

  return <button className={buttonStyles}>{buttonText}</button>;
};

export default AuthButton;
