import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';

interface DropdownProps {
  trigger: React.ReactElement;
  menu: React.ReactElement<MenuItemProps>[];
  keepOpen?: boolean;
  isOpen?: boolean;
  onOpen?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  minWidth?: number;
}

// eslint-disable-next-line react/display-name
const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  (
    {
      trigger,
      menu,
      keepOpen: keepOpenGlobal = false,
      isOpen: controlledIsOpen,
      onOpen: onControlledOpen,
      minWidth = 0,
    },
    ref
  ) => {
    const [isInternalOpen, setInternalOpen] = useState<null | HTMLElement>(null);

    const isOpen = controlledIsOpen ?? isInternalOpen;

    const anchorRef = useRef<HTMLButtonElement>(null);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (menu.length && !controlledIsOpen) {
        setInternalOpen(event.currentTarget);
      }

      if (onControlledOpen) {
        onControlledOpen(event.currentTarget);
      }
    };

    const handleClose = (event: React.MouseEvent<Document>) => {
      event.stopPropagation();

      if (anchorRef.current?.contains(event.target as Node)) {
        return;
      }

      handleForceClose();
    };

    const handleForceClose = () => {
      if (onControlledOpen) {
        onControlledOpen(null);
      } else {
        setInternalOpen(null);
      }
    };

    const renderMenu = (menuItem: React.ReactElement<MenuItemProps>, index: number) => {
      const { keepOpen: keepOpenLocal = false, ...props } = menuItem.props;

      const extraProps: Partial<MenuProps> = props.menu ? { parentMenuOpen: isOpen } : {};

      const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
        event.stopPropagation();

        if (!keepOpenGlobal && !keepOpenLocal) {
          handleClose(event);
        }

        if (props.onClick) {
          props.onClick(event);
        }
      };

      return (
        <MenuItem key={index} {...props} {...extraProps} onClick={handleClick}>
          {props.menu ? React.Children.map(props.menu, renderMenu) : props.children}
        </MenuItem>
      );
    };

    return (
      <>
        {React.cloneElement(trigger, {
          onClick: isOpen ? handleForceClose : handleOpen,
          ref: (node: HTMLButtonElement) => {
            if (ref) {
              if (typeof ref === 'function') {
                ref(node);
              } else {
                ref.current = node;
              }
            }

            anchorRef.current = node;
          },
        })}

        <Menu sx= {{ minWidth, display:'flex', flexDirection:'column' }} anchorEl={isOpen} open={!!isOpen} onClose={handleClose}>
          {React.Children.map(menu, renderMenu)}
        </Menu>
      </>
    );
  }
);

const DropdownMenuItem = styled(MenuItem)`
  display: flex;
  justify-content: space-between !important;

  & > svg {
    margin-left: 32px;
  }
`;

export { Dropdown, DropdownMenuItem };