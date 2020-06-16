import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-native'

class CoursesScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    render () {
        return (
            <Container>
                <Text>Courses Screen</Text>
                <Button
                    title='close'
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}
                />
            </Container>
        )
    }
}

export default CoursesScreen

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const Text = styled.Text``
