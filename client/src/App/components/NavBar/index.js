import {useContext} from 'react'
import { UserContext } from '../../../Contexts/userContext';
import logo from '../../../logo.png'
import { Avatar, Col, Row, Space, Tabs, Dropdown, Menu  } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import user from './store/images/Ellipse_12@2x.png';
import { logout } from '../../../APIs';


const menu = (
    <Menu
      items={[
        {
          label: <a onClick={logout}>Logout</a>,
          key: '0',
        },
      
    
       
      ]}
    />
  );

function NavBar() {

    const {userDetail, isLoggedIn} = useContext(UserContext)
    


    return (
        <Row>
            <Col span={3}>
                <div className="logo"><img src={logo} alt='logo' /></div>
            </Col>
            <Col span={15}>
                <Tabs size='large' className='m-t-4'>
                        <Tabs.TabPane 
                        key={0}
                        tab={<span className='fs-18px medium'>Wallet Dashboard</span>} />
                </Tabs>
            </Col>
            
            <Col span={6}>
                <Space size="small">
                   { isLoggedIn && userDetail &&  <span>Welcome {userDetail.name.split(" ")[0]}</span>}   
                    <Avatar icon={<UserOutlined />} src={user} size={42} />
                    <Dropdown overlay={menu} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                     <Space>
                 
                     <DownOutlined />
                </Space>
                </a>
                </Dropdown>

                </Space>
            </Col>
        </Row>
    )
}
export default NavBar;