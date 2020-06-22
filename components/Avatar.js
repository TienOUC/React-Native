import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native'


function mapStateToProps (state) {
    return {
        name: state.name,
        avatar: state.avatar
    }
}

function mapDispatchToProps (dispatch) {
    return {
        updateName: name => dispatch({
            type: 'UPDATE_NAME',
            name: name
        }),
        updateAvatar: avatar => {
            dispatch({
                type: 'UPDATE_AVATAR',
                avatar
            })
        }
    }
}

class Avatar extends React.Component {
    // state = {
    //     photo: 'https://tva1.sinaimg.cn/large/007S8ZIlly1gftgvmed8ej303k03k742.jpg'
    // }

    componentDidMount () {
        // fetch('https://randomuser.me/api/')
        //     .then(res => res.json())
        //     .then(res => {

        //         this.setState({
        //             photo: res.results[0].picture.medium
        //         })

        //         // this.props.updateName(res.results[0].name.first)
        //     })

        this.loadState()
    }

    loadState = () => {
        AsyncStorage.getItem('state')
            .then(serializedState => {
                const state = JSON.parse(serializedState)

                console.log(state)

                if (state) {
                    this.props.updateName(state.name)
                    this.props.updateAvatar(state.avatar)
                }
            })
    }

    render () {
        return (
            // <Image source={{ uri: this.state.photo }} />
            <Image source={{ uri: this.props.avatar }} />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar)

const Image = styled.Image`
    width: 44px;
    height: 44px;
    border-radius: 22px;
    margin-left: 20px;
`
