import React from 'react'
import PropTypes from "prop-types"

const Landing = ({username}) => {
  return (
    <div>{username}</div>
  )
}

Landing.propTypes = {
  username : PropTypes.string
}
export default Landing