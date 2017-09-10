import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import { login, logout, setMenuItem } from 'actions/app';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: 430,
    marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${ drawerWidth }px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  flex: {
    flex: 1,
  },
  logout: {
    marginLeft: 'auto',
  },
  drawerPaper: {
    position: 'relative',
    height: 'auto',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  content: {
    width: '100%',
    marginLeft: -drawerWidth,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      },
    },
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

@connect(state => ({
  currentUser: state.app.get('currentUser'),
  menuItems: state.app.get('menuItems'),
  currentItem: state.app.get('currentItem'),
}))

export default withStyles(styles)(class Test extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    currentUser: PropTypes.string,
    currentItem: PropTypes.number,
    menuItems: PropTypes.array,
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(login({ user: this.props.currentUser }));
  }

  logout() {
    const { dispatch } = this.props;

    dispatch(logout());
    localStorage.removeItem('user');
  }

  selectMenuItem(index) {
    const { dispatch } = this.props;

    dispatch(setMenuItem(index));
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const classes = this.props.classes;

    if (!this.props.currentUser) {
      return <Redirect to='/login' />;
    }

    let items;
    if (this.props.menuItems.length) {
      items = this.props.menuItems.map((item, index) => {
        let selected = false;
        if (index === this.props.currentItem) {
          selected = true;
        }
        return (
          <ListItem key={ item.name } selected={ selected } button onClick={ this.selectMenuItem.bind(this, index) }>
            <ListItemText className={ selected === true ? 'active' : '' } primary={ item.name } />
          </ListItem>
        );
      });
    }

    let pageContent;
    if (this.props.menuItems.length) {
      pageContent = <p key={ 1 }>This is page for user { this.props.menuItems[this.props.currentItem].name }</p>;
    } else {
      pageContent = "This user doesn't have content";
    }

    return (
      <div className={ classes.root }>
        <div className={ classes.appFrame }>
          <AppBar className={ classNames(classes.appBar, this.state.open && classes.appBarShift) }>
            <Toolbar disableGutters={ !this.state.open }>
              <IconButton
                color='contrast'
                aria-label='open drawer'
                onClick={ this.handleDrawerOpen }
                className={ classNames(classes.menuButton, this.state.open && classes.hide) }
              >
                <MenuIcon />
              </IconButton>
              <Typography type='title' color='inherit' className={ classes.flex }>
                { this.props.currentUser }
              </Typography>
              <Button className={ classes.logout } color='contrast' onClick={ this.logout.bind(this) }>Logout</Button>
            </Toolbar>
          </AppBar>
          <Drawer
            type='persistent'
            classes={ {
              paper: classes.drawerPaper,
            } }
            open={ this.state.open }
          >
            <div className={ classes.drawerInner }>
              <div className={ classes.drawerHeader }>
                <IconButton onClick={ this.handleDrawerClose }>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>
                { items }
              </List>
              <Divider />
            </div>
          </Drawer>
          <main className={ classNames(classes.content, this.state.open && classes.contentShift) }>
            <span>
              { pageContent }
            </span>
          </main>
        </div>
      </div>
    );
  }
});
