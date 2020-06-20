import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { BlurView } from 'expo-blur';

class ModalLogin extends React.Component {
    state = {
        email: '',
        password: '',
        iconEmail: require('../assets/ios-email.png'),
        iconPassword: require('../assets/ios-lock.png')
    }

    handleLogin = () => {
        console.log(this.state.email, this.state.password)
    }

    focusEmail = () => {
        this.setState({
            iconEmail: require('../assets/ios-email-active.png'),
            iconPassword: require('../assets/ios-lock.png')
        })
    }

    focusPassword = () => {
        this.setState({
            iconEmail: require('../assets/ios-email.png'),
            iconPassword: require('../assets/ios-lock-active.png')
        })
    }

    tapBackground = () => {
        Keyboard.dismiss()
    }

    render () {
        return (
            <Container>
                <TouchableWithoutFeedback onPress={this.tapBackground}>
                    <BlurView
                        tint='default'
                        intensity={100}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </TouchableWithoutFeedback>
                <Modal>
                    <Logo source={require('../assets/logo.png')}></Logo>
                    <Text>Stay hungry, Stay foolish</Text>
                    <TextInput
                        placeholder='Email'
                        keyboardType='email-address'
                        onChangeText={email => this.setState({ email })}
                        onFocus={this.focusEmail}
                    />
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={true}
                        onChangeText={password => this.setState({ password })}
                        onFocus={this.focusPassword}
                    />
                    <IconEmail source={this.state.iconEmail} />
                    <IconPassword source={this.state.iconPassword} />
                    <TouchableOpacity onPress={this.handleLogin}>
                        <Button>
                            <ButtonText>Login</ButtonText>
                        </Button>
                    </TouchableOpacity>
                </Modal>
            </Container>
        )
    }
}

export default ModalLogin

const Container = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .75);
    justify-content: center;
    align-items: center;
`

const Modal = styled.View`
    width: 335px;
    height: 375px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,.15);
    align-items: center;
`

const Logo = styled.Image`
    width: 44px;
    height: 44px;
    margin-top: 50px;
`

const Text = styled.Text`
    margin-top: 20px;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    width: 160px;
    text-align: center;
    color: #b8bece;
`

const TextInput = styled.TextInput`
    border: 1px solid #dbdfea;
    width: 295px;
    height: 44px;
    border-radius: 10px;
    font-size: 17px;
    margin-top: 20px;
    color: #3c4560;
    padding-left: 44px;
`

const Button = styled.View`
    background-color: #5263ff;
    width: 295px;
    height: 50px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 10px 20px #c2cbff;
    margin-top: 20px;
`

const ButtonText = styled.Text`
    color: #fff;
    font-weight: 600;
    font-size: 20px;
    /* text-transform: uppercase; */
`

const IconEmail = styled.Image`
    position: absolute;
    top: 179px;
    left: 31px;
    width: 24px;
    height: 16px;
`

const IconPassword = styled.Image`
    position: absolute;
    top: 239px;
    left: 35px;
    width: 18px;
    height: 24px;

`
