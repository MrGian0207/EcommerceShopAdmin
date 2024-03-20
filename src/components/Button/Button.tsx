import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

type ButtonProps = {
    type?: string;
    to?: string | null | undefined;
    href?: string;
    className?: string;
    primary?: boolean;
    outline?: boolean;
    text?: boolean;
    disabled?: boolean;
    small?: boolean;
    large?: boolean;
    rounded?: boolean;
    children: React.ReactNode;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

const Button: React.FC<ButtonProps> = ({
    type,
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    disabled = false,
    small = false,
    large = false,
    rounded = false,
    leftIcon,
    children,
    rightIcon,
    className,
    onClick,
    ...moreProps
}) => {
    let Comp: React.ElementType = 'button';

    const props:
        | React.ButtonHTMLAttributes<HTMLButtonElement>
        | React.AnchorHTMLAttributes<HTMLAnchorElement> = {
        onClick,
        ...moreProps,
    };

    // Remove Event Listeners When button is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (
                key.startsWith('on') &&
                typeof (props as any)[key] === 'function'
            ) {
                delete (props as any)[key];
            }
        });
    }

    if (to) {
        (props as any).to = to;
        Comp = Link;
    } else if (href) {
        (props as any).href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className!]: className,
        primary,
        outline,
        small,
        large,
        rounded,
        text,
        disabled,
    });

    return (
        <Comp type={type} className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
};

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    className: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    disabled: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    rounded: PropTypes.bool,
    children: PropTypes.node.isRequired,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
};

export default Button;
