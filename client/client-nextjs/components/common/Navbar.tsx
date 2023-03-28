import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button } from '@material-ui/core';
import Link from 'next/link';
import { Dropdown, DropdownMenuItem } from './../ui/dropdown/Dropdown';
import { NavLinks } from '@/lib/Links/NavLinks';

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [isAuthenticated, setIsAuthenticated] = React.useState<Boolean>(false)
  const [open, setOpen] = React.useState<Boolean>(false)



  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );




  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: '#fff' }}>
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="span"
            color={'#000'}
            sx={{ display: { xs: 'none', sm: 'block' }, textDecoration: 'none' }}
          >
            Byte Trivia
          </Typography>

          <Box sx={{ display: 'flex', gap: '30px', marginLeft: '100px' }}>
            {
              NavLinks.map((link, index) => {
                if (!link.dropdown) {
                  return (
                    <Link key={link.id} href={link.href}>
                      <Typography
                        variant="body1"
                        noWrap
                        component="span"
                        color={'#000'}
                        sx={{ textDecoration: 'none' }}
                      >
                        {link.title}
                      </Typography>
                    </Link>
                  )

                }
                else if (link.dropdown) {

                  return (


                    <Dropdown
                      key={link.id}
                      keepOpen
                      open={open}
                      trigger={(
                        <Link href={'#'}>
                          <Typography
                            variant="body1"
                            noWrap
                            component="span"
                            color={'#000'}

                          >
                            {link.title}
                          </Typography>
                        </Link>
                      )}
                      menu={link.dropdown.map((dropdownItem, i) => <DropdownMenuItem key={dropdownItem.id} >{dropdownItem.title} </DropdownMenuItem>)}
                    />
                  )
                }

              })
            }

          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '20px' }}>

            {
              isAuthenticated ? (
                <>
                  <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </>
              ) : (
                <>

                  <Button variant="text">Sign In</Button>
                  <Button variant="outlined">Sign Up</Button>
                </>

              )
            }
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}