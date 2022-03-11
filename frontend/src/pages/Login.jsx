import React,{ useState} from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Card, Space } from 'antd';
import { Link } from 'react-router-dom'

export const Login = (props) => {
    const [formDate, setFormDate] = useState({
        email: '',
        password: '',
      })

      const onValuesChange = (allValues) => {
        setFormDate(allValues)
        }
    
        const onFinish = (values) => {
          console.log('Success:', values);
        };
      
        const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };
      
  return (
<Card style={{width: '800px', margin: '0 auto', top: '100px'}}>

    <Form
      name="basic"
      style={{width: '600px', margin: '0 auto', paddingTop: '100px'}}
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
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
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
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
          <Space size={30}>

        <Button type="primary" htmlType="submit">
          Login
        </Button>
        <Link to='/register'><Button type="primary" htmlType="submit">
          Register me
        </Button></Link>
          </Space>
      </Form.Item>
    </Form>
</Card>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Login)