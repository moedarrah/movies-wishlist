import React from 'react'
import { Menu } from 'antd'

export default function Header() {
    const logout = (event) => {
        console.log(event)
    }
  return (
    <Menu mode="horizontal" theme='dark' onClick={logout}>
      <Menu.Item key="login">Logout</Menu.Item>
    </Menu>
  )
}
