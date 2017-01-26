import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Menu, Form, Icon, Input } from 'antd'
import { Link } from 'react-router'
import '../assets/styles/header.css'
import { fetchNodesIfNeeded } from '../actions'
const FormItem = Form.Item;

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
      <div>
        <div className="header-logo">
        <Link className="header-brand" to="/" ><b>Ruby</b>&nbsp;China</Link>
        </div>
        <div className="header-others">
          <div className="header-search">
            <Form inline onSubmit={this.handleSubmit} >
              <FormItem className="form-group">
              <Input className="search-input" addonBefore={<Link to="/"><Icon type="search" /></Link>}  placeholder="搜索本站内容" />
              </FormItem>
            </Form>
          </div>
          <div className="header-user-group" >
            <li className="header-user-signup" onClick={this.handleClick}>
            <Link to="/">注册</Link>
            </li>
            <li className="header-user-login" onClick={this.handleClick}>
            <Link  to="/">登录</Link>
            </li>
          </div>
        </div>
        
        <Menu selectedKeys={[this.state.current]}
          mode="horizontal"
          id="nav">
          <Menu.Item key="/topics">
            <Link to="/topics">社区</Link>
          </Menu.Item>
          <Menu.Item key="/wiki">
            <Link to="/wiki">Wiki</Link>
          </Menu.Item>
          <Menu.Item key="/sites">
            <Link to="/sites">酷站</Link>
          </Menu.Item>
          <Menu.Item key="/homeland">
            <Link to="/homeland">Homeland</Link>
          </Menu.Item>
          <Menu.Item key="/jobs">
            <Link to="/jobs">招聘</Link>
          </Menu.Item>
          <Menu.Item>
            <a href="https://gems.ruby-china.org" target="_blank" rel="noopener">Gems</a>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  const {pathname} = state.routing.locationBeforeTransitions;
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
