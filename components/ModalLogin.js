import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert, Animated, Dimensions, AsyncStorage } from 'react-native'
import { BlurView } from 'expo-blur'
import Success from './Success'
import Loading from './Loading'
import { connect } from 'react-redux'
import firebase from './Firebase'
import { saveState } from './AsyncStorage'


const screenHeight = Dimensions.get('window').height

function mapStateToProps (state) {
    return { action: state.action }
}

function mapDispatchToProps (dispatch) {
    return {
        closeLogin: () => {
            dispatch({
                type: 'CLOSE_LOGIN'
            })
        },
        updateName: (name) => {
            dispatch({
                type: 'UPDATE_NAME',
                name
            })
        },
        updateAvatar: (avatar) => {
            dispatch({
                type: 'UPDATE_AVATAR',
                avatar
            })
        }
    }
}
class ModalLogin extends React.Component {
    state = {
        email: '',
        password: '',
        iconEmail: require('../assets/ios-email.png'),
        iconPassword: require('../assets/ios-lock.png'),
        isSuccessful: false,
        isLoading: false,
        top: new Animated.Value(screenHeight),
        scale: new Animated.Value(1.3),
        translateY: new Animated.Value(0),
    }

    componentDidMount () {
        this.retrieveName()
    }

    componentDidUpdate () {
        if (this.props.action === 'openLogin') {
            Animated.timing(this.state.top, {
                toValue: 0,
                duration: 0
            }).start()
            Animated.spring(this.state.scale, { toValue: 1 }).start()
            Animated.spring(this.state.translateY, { toValue: 0, duration: 0 }).start()
        }

        if (this.props.action === 'closeLogin') {
            setTimeout(() => {
                Animated.timing(this.state.top, {
                    toValue: screenHeight,
                    duration: 0
                }).start()
                Animated.spring(this.state.scale, { toValue: 1.3 }).start()
            }, 500)
            Animated.spring(this.state.translateY, { toValue: 1000, duration: 500 }).start()
        }
    }

    storeName = async name => {
        try {
            await AsyncStorage.setItem('name', name)
        }
        catch (err) {
            console.log(err)
        }

    }

    retrieveName = async () => {
        try {
            const name = await AsyncStorage.getItem('name')
            if (name !== null) {
                // console.log(name)
                this.props.updateName(name)
            }
        }
        catch (err) { }
    }

    handleLogin = () => {
        // console.log(this.state.email, this.state.password)
        this.setState({ isLoading: true })

        const email = this.state.email
        const password = this.state.password

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(err => {
                Alert.alert('Error', err.message)
            })
            .then(res => {
                // console.log(res)
                this.setState({ isLoading: false })
                if (res) {
                    this.setState({ isSuccessful: true })

                    Alert.alert('Congrats', "You've logged successfully!")

                    // this.storeName(res.user.email)
                    this.fetchUser()
                    this.props.updateName(res.user.email)

                    setTimeout(() => {
                        this.props.closeLogin()
                        this.setState({ isSuccessful: false })
                    }, 1000)
                }
            })
    }

    fetchUser = () => {
        fetch('https://randomuser.me/api/')
            .then(res => res.json())
            .then(res => {
                const name = res.results[0].name.first
                const avatar = res.results[0].picture.medium
                console.log(name, avatar)

                saveState({ name, avatar })
                this.props.updateName(name)
                this.props.updateAvatar(avatar)
            })
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
        this.props.closeLogin()
    }

    render () {
        return (
            <AnimatedContainer style={{ top: this.state.top }}>
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
                <AnimatedModal style={{ transform: [{ scale: this.state.scale }, { translateY: this.state.translateY }] }}>
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
                </AnimatedModal>
                <Success isActive={this.state.isSuccessful} />
                <Loading isActive={this.state.isLoading} />
            </AnimatedContainer>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin)

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

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Modal = styled.View`
    width: 335px;
    height: 375px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,.15);
    align-items: center;
`

const AnimatedModal = Animated.createAnimatedComponent(Modal)

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
