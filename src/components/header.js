import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Navbar, FormControl, FormGroup, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router'
import '../assets/styles/header.css'
import { fetchNodesIfNeeded } from '../actions'

class Header extends Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    fetchNodesIfNeeded: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.getCurrent = this.getCurrent.bind(this);
    this.state = {
      current: this.getCurrent(this.props.pathname),
      focus: false,
    };

    this.handleFocusBlur = this.handleFocusBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  getCurrent(pathname){
    if (pathname.indexOf('topics') > -1) {
      return '/topics';
    }
    return pathname;
  }
  componentDidMount() {
    const { fetchNodesIfNeeded } = this.props
    fetchNodesIfNeeded();
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.getCurrent(nextProps.pathname) !== this.state.current) {
      this.setState({
        current: this.getCurrent(nextProps.pathname),
      })
    }
  }
  
  handleFocusBlur(e) {
    this.state = {
      focus: e.target === document.activeElement,
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    return (
      <Navbar className="navbar-fixed-top" id="navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <Link className="header-brand" to="/" ><b>Ruby</b>&nbsp;China</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <ul id="nav" className="nav navbar-nav">
            <li className={ this.state.current === '/topics' ? "active" : ''} ><Link to='/topics'>社区</Link></li>
            <li className={ this.state.current === '/wiki' ? "active" : '' } ><Link to='/wiki'>Wiki</Link></li>
            <li className={ this.state.current === '/sites' ? "active" : '' } ><Link to='/sites'>酷站</Link></li>
            <li className={ this.state.current === '/homeland' ? "active" : '' }><Link to='/homeland'>Homeland</Link></li>
            <li className={ this.state.current === '/jobs' ? "active" : '' } ><Link to='/jobs' >招聘</Link></li>
            <li><a href='https://gems.ruby-china.org' target="_blank">Gems</a></li>
          </ul>
          <ul className="nav navbar-nav pull-right">
            <li className={ this.state.current === '/account/signup' ? 'active' : ''} ><Link to='/account/signup'>注册</Link></li>
            <li className={ this.state.current === '/account/signin' ? 'active' : ''} ><Link to='/account/signin'>登录</Link></li>
          </ul>
          <Navbar.Form pullRight>
            <div className="header-search">
            <Link to="/"><Glyphicon glyph="search"/></Link>
            <FormGroup>
              <FormControl type="text" placeholder="搜索本站内容" />
            </FormGroup>
            </div>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
const mapStateToProps = (state, props) => {
  let {pathname, hash} = state.routing.locationBeforeTransitions;
  if (hash.indexOf('#') > -1) {
    pathname = hash.slice(1).split('?')[0];
  }
  return {
    pathname,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchNodesIfNeeded: () => dispatch(fetchNodesIfNeeded())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
