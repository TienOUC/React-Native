import React from 'react'
import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, StatusBar, Linking, ScrollView } from 'react-native'
// import { WebView } from 'react-native-webview'
import Markdown from 'react-native-showdown'
class SectionScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
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
            <ScrollView>
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
                    <Content>
                        {/* <WebView
                        source={{ html: section.content + htmlStyles }}
                        scalesPageToFit={false}
                        scrollEnabled={false}
                        ref='webview'
                        onNavigationStateChange={event => {
                            if (event.url != 'about:blank') {
                                this.refs.webview.stopLoading()
                                Linking.openURL(event.url)
                            }
                        }}
                    /> */}
                        <Markdown
                            body={section.content}
                            pureCSS={htmlStyles}
                            scalesPageToFit={false}
                            scrollEnabled={false}
                        />
                    </Content>
                </Container>
            </ScrollView>
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

const Content = styled.View`
    height: 2000px;
    padding: 10px;
`

// const htmlContent = `
//     <h2>This is a Title</h2>
//     <p>This is a <a href="http://www.baidu.com">link</a></p>
//     <img src="https://tva1.sinaimg.cn/large/007S8ZIlly1gfm2awl7njj30jy0l6mxw.jpg" />
// `

const htmlStyles = `
        *{
            font-family: -apple-system, Roboto;
            margin: 0;
            padding: 0;
            font-size: 17px;
            font-weight: normal;
            color: #3c4560;
            line-height: 24px;
        }
        img{
            width: 100%;
            border-radius: 10px;
            margin-top: 20px;
        }
        pre{
            padding: 20px;
            background: #212c4f;
            overflow: hidden;
            word-wrap: break-word;
            border-radius: 10px;
            margin-top: 20px;
        }
        code{
            color: #fff;
        }
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

