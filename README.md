# React Choreograph
[![CircleCI](https://img.shields.io/circleci/project/github/jonmcgill/react-choreograph/master.svg?logo=circleci&style=flat-square)](https://circleci.com/gh/jonmcgill/react-choreograph/tree/master)
[![Codecov](https://img.shields.io/codecov/c/github/jonmcgill/react-choreograph.svg?logo=codecov&style=flat-square)](https://codecov.io/gh/jonmcgill/react-choreograph)

```
npm i -S react-choreograph
```

`react-choreograph` is a tiny wrapper component that gives you a simple interface for toggling CSS class names on/off components. All you do is set it up, and turn it on and off.

## Basic Idea
```jsx
<Choreograph
  trigger={this.state.active}
  on={[{ box: 'is-active' }]}
  off={[{ box: 'is-active', delay: 200 }]}
>
  {setRef => <div ref={setRef('box')} />}
</Choreograph>
```

## Props
**`trigger`** Boolean value that will trigger class manipulation when toggled.

**`on`** Array of objects modeling which refs should receive which classes when activated.

**`off`** Array of objects modeling which refs should have which classes removed when deactivated.

## On/Off Objects
The on/off arrays take this shape:
```jsx
const moves = [
  { ref1: 'class-name-1' },
  { ref2: 'class-name-2', delay: 200 },
]
```
The first key should always be the name of the ref and its value the name of the class to apply. The second (optional) key, `delay`, instructs the component to delay class manipulation for the set number of milliseconds.

## Render Function
The `Choreograph` component takes a render function as its only child. The function exposes the `setRef` method which allows you to apply refs to arbitrary children. The value passed to each `setRef` call should be a valid ref name from the on/off objects.

## Example
```jsx
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { active: false }
  }
  render() {
    return (
      <Choreograph
        trigger={this.state.active}
        on={[{ box: 'is-active' }]}
        off={[{ box: 'is-active' }]}
      >
        {setRef => (
          <>
            <div ref={setRef('box')} className="box" />
            <button
              onClick={() => this.setState(state => ({
                active: !state.active
              }))}
            >
              Toggle Transition
            </button>
          </>
        )}
      </Choreograph>
    );
  }
}
```
