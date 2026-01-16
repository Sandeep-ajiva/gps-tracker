export default function Modal({
  children,
  isOpen,
  onClose,
  title,
  position,
  size
}: {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  position?: string;
  size?: string;
}) {
  return <div>Modal Component</div>;
}
