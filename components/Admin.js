import React from 'react'
import styled from 'styled-components'
import { Animated, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import MenuItem from './MenuItem'
import { connect } from 'react-redux'


function mapStateToProps (state) {
    return {
        action: state.action,
        name: state.name
    }
}

function mapDispatchToProps (dispatch) {
    return {
        closeAdmin: () => dispatch({
            type: 'CLOSE_ADMIN'
        }),
        updateName: name => {
            dispatch({
                type: 'UPDATE_NAME',
                name
            })
        },
        updateAvatar: avatar => {
            dispatch({
                type: 'UPDATE_AVATAR',
                avatar
            })
        }
    }
}

const screenHeight = Dimensions.get('window').height

class Admin extends React.Component {
    state = {
        top: new Animated.Value(screenHeight)
    }

    componentDidMount () {
        this.toggleAdmin()
    }

    componentDidUpdate () {
        this.toggleAdmin()
    }

    toggleAdmin = () => {

        if (this.props.action == 'openAdmin') {
            Animated.spring(this.state.top, {
                toValue: 50
            }).start()
        }

        if (this.props.action == 'closeAdmin') {
            Animated.spring(this.state.top, {
                toValue: screenHeight
            }).start()
        }
    }

    handleAdmin = (index) => {
        if (index === 3) {
            this.props.closeAdmin()
            this.props.updateName('Admin')
            this.props.updateAvatar('https://tva1.sinaimg.cn/large/007S8ZIlly1gftgvmed8ej303k03k742.jpg')
            AsyncStorage.clear()
        }
    }

    render () {
        return (
            <AnimatedContainer style={{ top: this.state.top }}>
                <Cover>
                    <Image source={require('../assets/login-bg.jpg')}></Image>
                    <Title style={{ color: '#000' }}>{this.props.name}</Title>
                </Cover>
                <TouchableOpacity
                    onPress={this.props.closeAdmin}
                    style={{
                        position: 'absolute',
                        top: 120,
                        left: '50%',
                        marginLeft: -22,
                        zIndex: 1
                    }}
                >
                    <CloseView>
                        <Ionicons
                            name='ios-close'
                            size={40}
                            color='#4775f2' />
                    </CloseView>
                </TouchableOpacity>
                <Content>
                    {items.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                this.handleAdmin(index)
                            }} >
                            <MenuItem
                                key={index}
                                icon={item.icon}
                                title={item.title}
                                text={item.text}
                            />
                        </TouchableOpacity>
                    ))}
                </Content>
            </AnimatedContainer>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)

const Container = styled.View`
    position: absolute;
    background-color: #fff;
    width: 100%;
    height: 100%;
    z-index: 100;
    border-radius: 10px;
    overflow: hidden;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Cover = styled.View`
    height: 142px;
    background-color: #000;
    justify-content: center;
    align-items: center;
`

const Image = styled.Image`
    position: absolute;
    width: 100%;
    height: 100%;
`

const Title = styled.Text`
    color: #fff;
    font-size: 24px;
    font-weight: 600;
`

const Subtitle = styled.Text`
    font-size: 13px;
    color: rgba(255,255,255,.5);
    margin-top: 8px;
`

const CloseView = styled.View`
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .15);
`

const Content = styled.View`
    padding: 50px;
    height: ${screenHeight};
    background-color: #f0f3f5;
`

const items = [
    {
        icon: 'ios-settings',
        title: 'Account',
        text: 'setting'
    },
    {
        icon: 'ios-card',
        title: 'Billing',
        text: 'payments'
    },
    {
        icon: 'ios-compass',
        title: 'Learn More',
        text: 'start learning'
    },
    {
        icon: 'ios-exit',
        title: 'Log out',
        text: 'see you soon'
    }
]
