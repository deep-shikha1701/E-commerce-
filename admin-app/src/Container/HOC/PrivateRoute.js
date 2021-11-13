import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router'

function PrivateRoute({ component: Component, ...rest }) {
    return <Route {...rest} component={(props) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            return <Component{...props} />
        } else {
            return <Redirect to={`/signin`} />
        }
    }}
    />
}


export default PrivateRoute

