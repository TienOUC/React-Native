import React from 'react'
import styled from 'styled-components'
import { Animated, TouchableOpacity, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import MenuItem from './MenuItem'
import { connect } from 'react-redux'

function mapStateToProps (state) {
    return { action: state.action }
}

function mapDispatchToProps (dispatch) {
    return {
        closeMenu: () => dispatch({
            type: 'CLOSE_MENU'
        })
    }
}

const screenHeight = Dimensions.get('window').height

class Menu extends React.Component {
    state = {
        top: new Animated.Value(screenHeight)
    }

    componentDidMount () {
        this.toggleMenu()
    }

    componentDidUpdate () {
        this.toggleMenu()
    }

    toggleMenu = () => {

        if (this.props.action == 'openMenu') {
            Animated.spring(this.state.top, {
                toValue: 50
            }).start()
        }

        if (this.props.action == 'closeMenu') {
            Animated.spring(this.state.top, {
                toValue: screenHeight
            }).start()
        }
    }

    render () {
        return (
            <AnimatedContainer style={{ top: this.state.top }}>
                <Cover>
                    <Image source={require('../assets/wallpaper3.jpg')}></Image>
                    <Title>Tien</Title>
                    <Subtitle>React</Subtitle>
                </Cover>
                <TouchableOpacity
                    onPress={this.props.closeMenu}
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
                        <MenuItem
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            text={item.text}
                        />
                    ))}
                </Content>
            </AnimatedContainer>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

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
        title: 'Acount',
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
        text: 'start'
    },
    {
        icon: 'ios-exit',
        title: 'Log out',
        text: 'see you soon!'
    }
]
