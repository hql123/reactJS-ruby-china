import React, { Component } from 'react'
import '../assets/styles/siderbar.css'
import {Button} from 'antd'
import { browserHistory, Link } from 'react-router'
class Siderbar extends Component {
  
  render() {
    return (
      <div className="sider">
        <div className="panel">
          <div className="panel-body">
          <Button type="primary" onClick={() => browserHistory.push('/topics/new')}>发布新话题</Button>
          </div>
        </div>
        <div className="panel">
          <div className="panel-title">小贴士</div>
          <div className="panel-body">本站是开源的哦，访问 http://gethomeland.com 获得更多信息
          </div>
        </div>
        <div className="panel">
          <div className="panel-title">推荐Ruby资源</div>
          <div className="panel-body">
          <ul className="sider-ul">
          <li><Link to="/wiki/ruby-mirror">Ruby 镜像</Link></li>
          <li><a href="https://gems.ruby-china.org" target="_blank">RubyGems 镜像</a></li>
          <li><a href="http://railscasts.com" target="_blank" rel="nofollow">Rails 视频教程</a></li>
          <li><a href="http://guides.ruby-china.org">Rails Guides 中文版</a></li>
          <li><a href="https://railstutorial-china.org">Ruby on Rails 教程</a></li>
          </ul>
          </div>
        </div>
        <div className="panel">
          <div className="panel-title">友情社区</div>
          <div className="panel-body">
          <ul className="sider-ul">
            <li style={{textAlign: 'center',}}><a href="http://cnodejs.org" rel="nofollow" title="CNode 社区" target="_blank"><img alt="1" src="//ruby-china-files.b0.upaiyun.com/photo/2016/d427ef3efd33b57721df152c2aa1735e.png" style={{width:'130px',}} /></a></li>
            <li style={{textAlign: 'center',}}><a href="http://golangtc.com/" rel="nofollow" title="Golang 中国" target="_blank"><img alt="2" src="//ruby-china-files.b0.upaiyun.com/photo/2016/3b0fc569b40157a397143d121fea7e6f.png" style={{width:'130px',}} /></a></li>
            <li style={{textAlign: 'center',}}><a href="https://laravel-china.org" target="_blank" rel="nofollow"><img alt="3" src="//ruby-china-files.b0.upaiyun.com/photo/2016/d7782871f3fac7e85a95d20c74046909.png" style={{width:'130px',}} /></a></li>
            <li style={{textAlign: 'center',}}><a href="http://elixir-cn.com" target="_blank" rel="nofollow"><img alt="4" src="//ruby-china-files.b0.upaiyun.com/photo/2015/f65fb5a10d3392a1db841c85716dd8f6.png" style={{width:'130px',}}/></a></li>
            <li style={{textAlign: 'center',}}><a href="http://ionichina.com/" target="_blank" rel="nofollow"><img alt="5" src="//ruby-china-files.b0.upaiyun.com/photo/2016/62e5d33d4f90ead9e798e3f8ae085f16.png" style={{width:'130px',}} /></a></li>
            <li style={{textAlign: 'center',}}><a href="https://testerhome.com/" target="_blank" rel="nofollow"><img alt="6" src="//ruby-china-files.b0.upaiyun.com/photo/2016/5cd78b730062ab3c768bcc2592c5c7fa.png" style={{width:'130px',}} /></a></li>        
          </ul>
          </div>
        </div>
        <div className="panel">
          <div className="panel-title">统计信息</div>
          <div className="panel-body">
          <ul className="sider-ul">
          <li>社区会员: 30232 人</li>
          <li>帖子数: 32156 个</li>
          <li>回帖数: 313960 条</li>
          </ul>
          </div>
        </div>
      </div>
      
    );
  }
}

export default Siderbar