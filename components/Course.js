import React from 'react'
import styled from 'styled-components'

const Course = props => (
    <Container>
        <Cover>
            <Image source={props.image}></Image>
            <Logo source={props.logo} resizeMode='contain'></Logo>
            <Subtitle>{props.subtitle}</Subtitle>
            <Title>{props.title}</Title>
        </Cover>
        <Content>
            <Avatar source={props.avatar}></Avatar>
            <Caption>{props.caption}</Caption>
            <Author>{props.author}</Author>
        </Content>
    </Container>
)

export default Course

const Container = styled.View`
    width: 335px;
    height: 335px;
    background-color: #fff;
    margin: 0 20px 20px;
    border-radius: 14px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, .15);
`

const Cover = styled.View`
    height: 260px;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    overflow: hidden;
    justify-content: flex-end;
`

const Image = styled.Image`
    width: 100%;
    height: 100%;
    border-top-left-radius: 14px;
    border-top-right-radius: 14px;
    position: absolute;
`

const Logo = styled.Image`
    width: 48px;
    height: 48px;
    position: absolute;
    top: 90px;
    left: 50%;
    margin-left: -24px;
`

const Subtitle = styled.Text`
    font-size: 15px;
    font-weight: 500;
    color: rgba(255, 255, 255, .8);
    text-transform: uppercase;
    margin-left: 20px;
`

const Title = styled.Text`
    width: 170px;
    font-size: 24px;
    color: #fff;
    font-weight: 600;
    margin-top: 4px;
    margin-bottom: 20px;
    margin-left: 20px;
`

const Content = styled.View`
    padding-left: 62px;
    height: 75px;
    justify-content: center;
`

const Avatar = styled.Image`
    width: 32px;
    height: 32px;
    position: absolute;
    top: 20px;
    left: 20px;
    border-radius: 16px;

`

const Caption = styled.Text`
    font-size: 14px;
    color: #3c4560;
    font-weight: 500;
    margin-top: 4px;

`

const Author = styled.Text`
    font-size: 13px;
    color: #b8bece;
    font-weight: 500;
    margin-top: 4px;
`
