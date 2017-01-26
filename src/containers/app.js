import React from 'react'
import HeaderComponent from '../components/header'
import FooterComponent from '../components/footer'
import { Layout, Affix } from 'antd';
import '../assets/styles/app.css';
const { Header, Footer, Content } = Layout;

let App = ({ children }) => {
  return (
    <Layout className='layout'>
      <Affix><Header><HeaderComponent /></Header></Affix>
      <Content style={{ minHeight: 300 }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}><FooterComponent /></Footer>
    </Layout>
  );
}


export default App
