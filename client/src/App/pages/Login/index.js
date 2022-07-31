import { useState, useContext } from "react";
import { Button, Card, Col, Form, Input, Row, Typography,Alert} from "antd";
import { UserContext } from "../../../Contexts/userContext";

import axios from "axios";
import { API_URL } from "../../../Constants";

function Login() {


    const {setUserDetail,setLoggedIn} = useContext(UserContext)
    const [form] = Form.useForm();

    const [successMsg, setSuccessMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const [errMsg, setErrorMsg] = useState('')
    const [isError, showErrorMsg] = useState(false)
    




  
      



    function authorize (values) {
        showErrorMsg(false)
      
        if(!values.email || !values.password){
            setErrorMsg("Email and password required!")
            showErrorMsg(true)
            
            
            return
        }


       


        axios.post(`${API_URL}/api/v1/auth/login`, {

            email:values.email,
            password:values.password
    
          }, {
            headers: {
              'Content-Type': 'application/json'
            },
             withCredentials: true 
          })
            .then(function (response) {
             
              if(response && response.data.user){
                setUserDetail(response.data.user)

                
                setSuccessMsg('Login successful')
                setSuccess(true)
                setLoggedIn(true)
                localStorage.setItem("refreshToken",response.data.refreshToken )
                window.location.href = "/dashboard"
              }
              
              
              
              
      
            }).catch(err => {
              

              if(err.response.status === 404){
                setErrorMsg(err.response.data.message)
              }else{
                setErrorMsg("Failed to login.")
              }
              
              showErrorMsg(true)
           
            })
      

    }


    return (
        <Row className="full-height" align="middle" justify="center">
           
            <Col xxl={6} xl={9} lg={12} md={12} sm={18} xs={22}>
                <Card>
                    <Card.Grid className="full-width rounded">
                        <Row>
                            <Col span={24}>
                                <Typography.Text className="medium fs-28px dark-green">Login</Typography.Text>
                            </Col>
                        </Row>
                        <Row className="m-t-10">
                            <Col span={24}>
                            { success && <Alert message={successMsg} type="success" showIcon />}
                                <Form
                                    layout="vertical"
                                    form={form}
                                    requiredMark={true} onFinish={authorize}>
                                    <Form.Item
                                        label={<span className="muli semi-bold">Email</span>}
                                        name='email'
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please provide an email!',
                                            }
                                            
                                            ]}
                                    
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label={<span className="muli semi-bold">Password</span>}
                                        name='password'
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please provide a password!',
                                            }
                                            
                                            ]}
                                        
                                        >
                                        <Input.Password />
                                    </Form.Item>
                                    {
                                        isError && 
                                        <Alert message={errMsg} type="error" showIcon  />
                                      
                                    }
                                   
                                     <a href="/signup" style={{color:"#004f59", fontSize:"16px"}} className="left-align-text">Or Sign Up ?</a>
                                    <Button  type="primary" htmlType="submit" className="right-align-text">Login</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Grid>
                </Card>
            </Col>
        </Row>
    );
}

export default Login;