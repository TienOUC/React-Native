import React from 'react'
import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, StatusBar } from 'react-native'

class SectionScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    componentWillMount () {
        StatusBar.setBarStyle('dark-content', true)
    }

    componentDidMount () {
        StatusBar.setBarStyle('light-content', true)
    }



    render () {
        const { navigation } = this.props
        const section = navigation.getParam('section')

        return (
            <Container>
                <StatusBar hidden />
                <Cover>
                    <Image source={section.image} />
                    <Wrapper>
                        <Logo source={section.logo} />
                        <Subtitle>{section.subtitle}</Subtitle>
                    </Wrapper>
                    <Title>{section.title}</Title>
                    <Caption>{section.caption}</Caption>
                </Cover>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}
                    style={{
                        position: 'absolute',
                        top: 20,
                        right: 20
                    }}
                >
                    <CloseView>
                        <Ionicons
                            name='ios-close'
                            size={36}
                            color='#4775f2'
                            style={{ marginTop: -2 }}
                        />
                    </CloseView>
                </TouchableOpacity>
            </Container>
        )
    }
}

export default SectionScreen

const Container = styled.View`
    flex: 1;
`
const Cover = styled.View`
    height: 375px;
`
const CloseView = styled.View`
    width: 32px;
    height: 32px;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .15);
    justify-content: center;
    align-items: center;
`

const Wrapper = styled.View`
    flex-direction: row;
    position: absolute;
    top: 40px;
    left: 20px;
    align-items: center;
`

const Logo = styled.Image`
    width: 24px;
    height: 24px;
`

const Subtitle = styled.Text`
    font-size: 15px;
    font-weight: 600;
    color: rgba(255, 255, 255, .8);
    margin-left: 5px;
    text-transform: uppercase;
`

const Image = styled.Image`
    width: 100%;
    height: 100%;
    position: absolute;
`

const Title = styled.Text`
    font-size: 24px;
    color: #fff;
    font-weight: bold;
    position: absolute;
    width: 170px;
    top: 78px;
    left: 20px;
`

const Caption = styled.Text`
    color: #fff;
    font-size: 17px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 300px;
`

