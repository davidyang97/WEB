import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { setGlobalUser } from '../../globalLoginStateMaintain';
import { reqLogin } from '../../api';

class LoginForm extends Component {

    state = {
        redirect: false,
        refresh: false
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/profile' />
        }
    }

    handleSubmit = event => {
        // 阻止网页提交，当录入没能通过校验
        event.preventDefault();

        // 校验所有表单输入
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { username, password } = values;
                const p = reqLogin(username, password).then(val => {
                    if(val.data.success){
                        setGlobalUser(username);
                        this.setRedirect();
                    }
                    else{
                        alert('User name or password is not correct!');
                    }
                });
            } else{
                
            }
        });
    };

    handleWrongPassword = () => {

    };

    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <React.Fragment>
                {this.renderRedirect()}

                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h2>Log in</h2>
                    <Form.Item>
                        <br />
                        {
                            getFieldDecorator('username', {
                                // 验证规则： 必填
                                rules: [
                                    { required: true, message: 'User name required!' },
                                    { min: 4, message: 'Min length is 4.'},
                                    { max: 20, message: 'Max length is 20.'}
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />
                            )
                        }
                        <br />
                    </Form.Item>
                    <Form.Item>
                        <br />
                        {
                            getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: 'Password required!' },
                                    { min: 6, message: 'Min length is 6.'},
                                    { max: 36, message: 'Max length is 36.'},
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />
                            )
                        }
                        <br />
                    </Form.Item>
                    <Form.Item>
                        <br />
                        {
                            getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox className="login-remember">Remember me</Checkbox>)
                        }
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a><br />
                        <br />
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <a href="" className="login-register"> Register now!</a>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );
    }
}

// 给 LoginForm 组件添加 'form' 属性， 生成 'WrappedLoginForm' 组件
const WrappedLoginForm = Form.create()(LoginForm);

export default WrappedLoginForm;