import React, {useContext, useState} from 'react'
import axios from 'axios'
import { UserContext } from '../../../Contexts/userContext';
import { Button, Card, Col, Form, Input, Row, Typography , Alert} from "antd";
import { API_URL } from '../../../Constants';

function Register() {

    const {setUserDetail,setLoggedIn} = useContext(UserContext)
    const [form] = Form.useForm();

    const [successMsg, setSuccessMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const [errMsg, setErrorMsg] = useState('')
    const [isError, showErrorMsg] = useState(false)


    function signUp(values){
        console.log(values)

        axios.post(`${API_URL}/api/v1/auth/signup`, {
            name: values.fullname,
            email:values.email,
            password:values.password,
            passwordConfirm:values.confirm
    
          }, {
            headers: {
              'Content-Type': 'application/json'
            },
             withCredentials: true 
          })
            .then(function (response) {
             
              if(response && response.data.user){
                setUserDetail(response.data.user)

               
                setSuccessMsg('Sign Up successful')
                setSuccess(true)
                setLoggedIn(true)
                localStorage.setItem("refreshToken",response.data.refreshToken )
                window.location.href = "/dashboard"
              }
              
              
              
              
      
            }).catch(err => {
              
                console.log(err)

              if(err.response.status === 422){
                setErrorMsg(err.response.data.message)
              }else{
                setErrorMsg("Failed to sign up.")
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
                                <Typography.Text className="medium fs-28px dark-green">sign Up</Typography.Text>
                            </Col>
                        </Row>
                        <Row className="m-t-10">
                            <Col span={24}>
                            { success && <Alert message={successMsg} type="success" showIcon />}
                                <Form
                                    layout="vertical"
                                    form={form}
                                    requiredMark={false} onFinish={signUp} >
                                    <Form.Item
                                        label={<span className="muli semi-bold">Fullname</span>}
                                        name='fullname'
                                        rules={[
                                            {
                                            required: true,
                                            message: 'Please provide a name!',
                                            }
                                            
                                            ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label={<span className="muli semi-bold">Email</span>}
                                        name='email'
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'Please provide a valid email!',
                                              },
                                            {
                                            required: true,
                                            message: 'Please provide an email!',
                                            },
                                           
                                           
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
                                            },
                                            {min:8, message:'Password must be 8 characters or more'}
                                           
                                            ]}
                                        
                                        >
                                            
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item
                                        label={<span className="muli semi-bold">Confirm Password</span>}
                                        name='confirm'

                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                        {
                                        required: true,
                                        message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                        validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                            }
                                        return Promise.reject(new Error('Passwords do not match!'));
                                        },
                                        }),
                                        ]}
                                        
                                        >
                                        <Input.Password />
                                    </Form.Item>
                                    {
                                        isError && 
                                        <Alert message={errMsg} type="error" showIcon  />
                                      
                                    }
                                   <a href="/" style={{color:"#004f59", fontSize:"16px"}} className="left-align-text">Or Login ?</a>
                                    <Button type="primary" htmlType="submit" className="right-align-text">Register</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Card.Grid>
                </Card>
            </Col>
        </Row>
    );
}

export default Register;