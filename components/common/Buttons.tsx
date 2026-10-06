import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children: ReactNode;
};
function Button({
  href,
  children,
  className = '',
  variant,
  ...props
}: Props & { variant: string }) {
  const classes = `button ${variant} ${className}`;
  return href ? (
    <Link href={href} className={classes}>
      {children}
    </Link>
  ) : (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
export function PrimaryButton(props: Props) {
  return <Button variant="button-primary" {...props} />;
}
export function SecondaryButton(props: Props) {
  return <Button variant="button-secondary" {...props} />;
}
