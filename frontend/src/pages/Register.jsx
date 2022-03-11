import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset} from '../features/auth/authSlice'
import { Form, Input, Button, Card } from 'antd'

export const Register = () => {
  const [formDate, setFormDate] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  })
  /* const { username, email, password, password2 } = formDate */
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  )
  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if(isSuccess || user){
      navigate('/dashboard')
    }

    dispatch(reset())
    
  }, [user, isError, isSuccess, message, navigate, dispatch ])
  

  const onValuesChange = (allValues) => {
    setFormDate(allValues)
    }

  const onFinish = (values) => {
      if ( values.password !== values.password2 ) {
            alert('Passwords do not match')
        } else {
   const userDate = {
      username: values.username,
      email: values.email,
      password: values.password,
   }
    dispatch(register(userDate))
}
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Card style={{ width: '800px', margin: '0 auto', top: '100px' }}>
      <Form
        name="basic"
        style={{ width: '600px', margin: '0 auto', paddingTop: '100px' }}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
          </Form.Item>
        <Form.Item
          label="Repeat Password"
          name="password2"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
