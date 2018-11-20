import React from 'react'
import PropTypes from 'prop-types'

const mutateClasses = (mutation, operation) => obj => {
  if (!obj.delay) {
    mutation(obj, operation)
  } else {
    setTimeout(() => mutation(obj, operation), obj.delay)
  }
}

export class Choreographer extends React.PureComponent {
  constructor (props) {
    super(props)
    this.Refs = {}
    this.trigger = this.props.trigger
    this.changeClassList = this.changeClassList.bind(this)
    this.setRef = this.setRef.bind(this)
  }

  changeClassList (obj, fn) {
    this
      .Refs[Object.keys(obj)[0]]
      .classList[fn](Object.values(obj)[0])
  }

  setRef (name) {
    return n => (this.Refs[name] = n)
  }

  componentDidUpdate () {
    const { changeClassList, active } = this
    const { trigger, on, off } = this.props

    if (active !== trigger) {
      if (trigger) {
        on.forEach(mutateClasses(changeClassList, 'add'))
      } else {
        off.forEach(mutateClasses(changeClassList, 'remove'))
      }
      this.active = trigger
    }
  }

  render () {
    return this.props.children(this.setRef)
  }
}

Choreographer.propTypes = {
  children: PropTypes.func.isRequired,
  trigger: PropTypes.bool.isRequired,
  on: PropTypes.arrayOf(PropTypes.object).isRequired,
  off: PropTypes.arrayOf(PropTypes.object).isRequired,
}
