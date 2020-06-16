import React from 'react'
import { ScrollView, SafeAreaView, TouchableOpacity, Animated, Easing, StatusBar } from 'react-native'
import styled from 'styled-components'
import Card from '../components/Card'
// import Notification from '../components/Icons'  // 自定义icon
import Logo from '../components/Logo'
import Course from '../components/Course'
import Menu from '../components/Menu'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import Avatar from '../components/Avatar'

function mapStateToProps (state) {
    return {
        action: state.action,
        name: state.name
    }
}

function mapDispatchToProps (dispatch) {

    return {
        openMenu: () => dispatch({
            type: 'OPEN_MENU'
        })
    }
}

class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    state = {
        scale: new Animated.Value(1),
        opacity: new Animated.Value(1)
    }

    componentDidMount () {
        StatusBar.setBarStyle('dark-content', true)
    }

    componentDidUpdate () {
        this.toggleMenu()
    }

    toggleMenu = () => {
        if (this.props.action == 'openMenu') {
            Animated.timing(this.state.scale, {
                toValue: 0.9,
                duration: 300,
                easing: Easing.in()

            }).start()
            Animated.spring(this.state.opacity, {
                toValue: 0.5
            }).start()

            StatusBar.setBarStyle('light-content', true)
        }

        if (this.props.action == 'closeMenu') {
            Animated.timing(this.state.scale, {
                toValue: 1,
                duration: 300,
                easing: Easing.in()
            }).start()
            Animated.spring(this.state.opacity, {
                toValue: 1
            }).start()

            StatusBar.setBarStyle('dark-content', true)
        }
    }

    render () {
        return (
            <RootView>
                <Menu />
                <AnimatedContainer
                    style={{
                        transform: [{ scale: this.state.scale }],
                        opacity: this.state.opacity
                    }}
                >
                    <SafeAreaView>
                        <ScrollView style={{ height: '100%' }}>
                            <TitleBar>
                                <TouchableOpacity
                                    onPress={this.props.openMenu}
                                    style={{ position: 'absolute', top: 0, left: 0 }}
                                >
                                    <Avatar />
                                </TouchableOpacity>
                                <Title>Welcome! </Title>
                                <Name>{this.props.name}</Name>
                                <Ionicons
                                    name="ios-notifications"
                                    size={24}
                                    color='#4775f2'
                                    style={{ position: 'absolute', right: 20, top: 5 }}
                                />
                                {/* <Notification style={{ position: 'absolute', right: 20, top: 5 }} /> */}
                            </TitleBar>
                            <ScrollView
                                style={{
                                    flexDirection: 'row',
                                    padding: 20,
                                    paddingLeft: 12,
                                    paddingTop: 30
                                }}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >
                                {logos.map((logo, index) => (
                                    <Logo
                                        key={index}
                                        image={logo.image}
                                        text={logo.text}
                                    />
                                ))}
                            </ScrollView>
                            <Subtitle>Continue Leaning</Subtitle>
                            <ScrollView
                                horizontal={true}
                                style={{ paddingBottom: 30 }}
                                showsHorizontalScrollIndicator={false}
                            >
                                {cards.map((card, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            this.props.navigation.push('Section', {
                                                section: card
                                            })
                                        }}
                                    >
                                        <Card
                                            title={card.title}
                                            image={card.image}
                                            caption={card.caption}
                                            logo={card.logo}
                                            subtitle={card.subtitle}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <Subtitle>Popular Courses</Subtitle>
                            {courses.map((course, index) => (
                                <Course
                                    key={index}
                                    image={course.image}
                                    title={course.title}
                                    subtitle={course.subtitle}
                                    logo={course.logo}
                                    author={course.author}
                                    avatar={course.avatar}
                                    caption={course.caption}
                                />
                            ))}
                        </ScrollView>
                    </SafeAreaView>
                </AnimatedContainer>
            </RootView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const RootView = styled.View`
    background-color: #000;
    flex: 1;
`

const Container = styled.View`
  flex: 1;
  background-color: #f1f2f3;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`
const AnimatedContainer = Animated.createAnimatedComponent(Container)

const TitleBar = styled.View`
  width: 100%;
  margin-top: 10px;
  padding-left: 80px;
`

const Title = styled.Text`
  color: #b8bece;
  font-size: 16px;
  font-weight: 500;
`

const Name = styled.Text`
  font-size: 20px;
  font-weight: bold;
`

const Subtitle = styled.Text`
  color: #b8bece;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 10px;
  margin-left: 20px;
`

const logos = [
    {
        image: require('../assets/logo-figma.png'),
        text: 'Figma'
    },
    {
        image: require('../assets/logo-framer.png'),
        text: 'Framer'
    },
    {
        image: require('../assets/logo-swift.png'),
        text: 'Swift'
    },
    {
        image: require('../assets/logo-xcode.png'),
        text: 'Xcode'
    },
    {
        image: require('../assets/logo-sketch.png'),
        text: 'Sketch'
    }
]

const cards = [
    {
        title: 'React Native for Designer',
        image: require('../assets/wallpaper.jpg'),
        subtitle: 'React Native',
        caption: '1 of 12 sections',
        logo: require('../assets/logo-react.png')
    },
    {
        title: 'Props and Icons',
        image: require('../assets/wallpaper2.jpg'),
        subtitle: 'Swift',
        caption: '2 of 12 sections',
        logo: require('../assets/logo-swift.png')
    },
    {
        title: 'Static Data & Loop',
        image: require('../assets/wallpaper3.jpg'),
        subtitle: 'Sketch',
        caption: '3 of 12 sections',
        logo: require('../assets/logo-sketch.png')
    },
    {
        title: 'Styled Components',
        image: require('../assets/wallpaper.jpg'),
        subtitle: 'React Native',
        caption: '1 of 12 sections',
        logo: require('../assets/logo-invision.png')
    }
]

const courses = [
    {
        title: 'Prototype in Invision Studio',
        subtitle: '10 sections',
        image: require('../assets/wallpaper4.jpg'),
        logo: require('../assets/logo-react.png'),
        author: 'Tien',
        avatar: require('../assets/logo-figma.png'),
        caption: 'Design and interactive prototype'
    },
    {
        title: 'Prototype in Invision Studio',
        subtitle: '10 sections',
        image: require('../assets/wallpaper2.jpg'),
        logo: require('../assets/logo-figma.png'),
        author: 'Tien',
        avatar: require('../assets/logo-figma.png'),
        caption: 'Design and interactive prototype'
    },
    {
        title: 'Prototype in Invision Studio',
        subtitle: '10 sections',
        image: require('../assets/wallpaper.jpg'),
        logo: require('../assets/logo-swift.png'),
        author: 'Tien',
        avatar: require('../assets/logo-figma.png'),
        caption: 'Design and interactive prototype'
    },
    {
        title: 'Prototype in Invision Studio',
        subtitle: '10 sections',
        image: require('../assets/wallpaper3.jpg'),
        logo: require('../assets/logo-sketch.png'),
        author: 'Tien',
        avatar: require('../assets/logo-figma.png'),
        caption: 'Design and interactive prototype'
    }
]
