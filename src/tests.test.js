import React from 'react'
import Choreograph from './'

describe('tests', () => {
  jest.useFakeTimers()

  const moves = [
    { foo: 'foo' },
    { bar: 'bar', delay: 1 }
  ]

  class Container extends React.Component {
    constructor (props) {
      super(props)
      this.state = { active: false }
    }
    render () {
      return (
        <Choreograph trigger={this.state.active} on={moves} off={moves}>
          {setRef => (
            <div>
              <h1 ref={setRef('foo')} />
              <h2 ref={setRef('bar')} />
            </div>
          )}
        </Choreograph>
      )
    }
  }

  const subject = mount(<Container />)

  test('it mutates classes properly', () => {
    expect(subject.html()).not.toContain('foo')
    expect(subject.html()).not.toContain('bar')
    subject.setState({ active: true })
    subject.setState({ active: true })
    expect(subject.html()).toContain('foo')
    expect(setTimeout).toHaveBeenCalledTimes(1)
    subject.setState({ active: false })
    expect(subject.html()).not.toContain('foo')
    expect(setTimeout).toHaveBeenCalledTimes(2)
  })
})
