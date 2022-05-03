import { ButtonProps } from '../Button';
import { Placement, Strategy } from '@floating-ui/react-dom';
import { TooltipTheme } from '../Tooltip';

export enum LabelSize {
    Large = 'large',
    Medium = 'medium',
    Small = 'small',
}

export interface LabelIconButtonProps
    extends Omit<
        ButtonProps,
        | 'buttonWidth'
        | 'checked'
        | 'htmlType'
        | 'onContextMenu'
        | 'shape'
        | 'size'
        | 'split'
        | 'splitButtonChecked'
        | 'splitButtonProps'
        | 'toggle'
    > {
    /**
     * The label icon button is shown.
     * @default false
     */
    show?: boolean;
    /**
     * Content to show on the tooltip
     */
    toolTipContent?: React.ReactNode | string;
    /**
     * Theme of the tooltip
     * @default light
     */
    toolTipTheme?: TooltipTheme;
    /**
     * Placement of the tooltip
     * @default top
     */
    toolTipPlacement?: Placement;
    /**
     * Positioning strategy for the tooltip
     * @default absolute
     */
    toolTipPositionStrategy?: Strategy;
}

export interface LabelProps {
    /**
     * The label class names.
     */
    classNames?: string;
    /**
     * The label element name.
     */
    htmlFor?: string;
    /**
     * The label icon button props.
     */
    labelIconButtonProps?: LabelIconButtonProps;
    /**
     * The label size.
     */
    size?: LabelSize;
    /**
     * The label text.
     */
    text?: string;
}