import React, { FC } from 'react';
import { ButtonSize, DefaultButton } from '../Button';
import { IconName } from '../Icon/index';
import { LabelProps, LabelSize } from './index';
import { Tooltip } from '../Tooltip';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';
import { mergeClasses } from '../../shared/utilities';

import styles from './label.module.scss';

export const Label: FC<LabelProps> = ({
    classNames,
    colon = false,
    htmlFor,
    labelIconButtonProps,
    size = LabelSize.Medium,
    text,
    ...rest
}) => {
    const htmlDir: string = useCanvasDirection();

    const sizeClassNames: string = mergeClasses([
        { [styles.large]: size === LabelSize.Large },
        { [styles.medium]: size === LabelSize.Medium },
        { [styles.small]: size === LabelSize.Small },
    ]);
    const labelClassNames: string = mergeClasses([
        styles.fieldLabel,
        sizeClassNames,
        classNames,
    ]);
    const labelTextClassNames: string = mergeClasses([
        styles.textStyle,
        sizeClassNames,
    ]);
    const iconButtonClassNames: string = mergeClasses([
        styles.fieldLabelIconButton,
        sizeClassNames,
    ]);
    return (
        <div {...rest} className={labelClassNames}>
            {text && (
                <label className={labelTextClassNames} htmlFor={htmlFor}>
                    {colon && htmlDir === 'rtl' && ':'}
                    {text}
                    {colon && htmlDir === 'ltr' && ':'}
                </label>
            )}
            {labelIconButtonProps?.show && (
                <span className={iconButtonClassNames}>
                    <Tooltip
                        content={labelIconButtonProps?.toolTipContent}
                        placement={
                            labelIconButtonProps?.toolTipPlacement || 'top'
                        }
                        positionStrategy={
                            labelIconButtonProps?.toolTipPositionStrategy
                        }
                        theme={labelIconButtonProps?.toolTipTheme}
                    >
                        <DefaultButton
                            allowDisabledFocus={
                                labelIconButtonProps?.allowDisabledFocus
                            }
                            ariaLabel={labelIconButtonProps?.ariaLabel}
                            classNames={styles.labelIconButton}
                            disabled={labelIconButtonProps?.disabled}
                            iconProps={{
                                ...labelIconButtonProps,
                                path:
                                    labelIconButtonProps?.iconProps?.path ||
                                    IconName.mdiInformation,
                            }}
                            onClick={
                                !labelIconButtonProps?.allowDisabledFocus
                                    ? labelIconButtonProps?.onClick
                                    : null
                            }
                            size={ButtonSize.Small}
                        />
                    </Tooltip>
                </span>
            )}
        </div>
    );
};
