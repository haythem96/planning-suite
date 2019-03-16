import React from 'react'
import PropTypes from 'prop-types'
import getDisplayName from 'react-display-name'

export const networkContextType = PropTypes.shape({
  etherscanBaseUrl: PropTypes.string,
  name: PropTypes.string,
})

export const provideNetwork = Component => {
  const GetNetwork = (props, context) => <Component {...context} {...props} />
  GetNetwork.contextTypes = {
    network: networkContextType,
  }
  GetNetwork.displayName = `GetNetwork(${getDisplayName(Component)})`
  return GetNetwork
}
