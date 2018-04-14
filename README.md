# react-test-util-to-class-component

As you know it is the best practice to create react component when it is possible as a function component - not a class. But there is a problem to test components-functions: usualy [react test utlis](https://reactjs.org/docs/test-utils.html#overview "Link to react-dom/test-utils documentation") do not work with components-functions. This package presents HOC for components-functions which changes component-function to the same component-class.

## [Content.](#user-content-content "Conten")
- [GitHub.](#user-content-github "Link to GitHub repository")
- [Install.](#user-content-install "Install")
- [Usage.](#user-content-usege "Usage")
- [License](#user-content-license "License")

##GitHub.
[Progect on GitHub.](https://github.com/kuznetsovlv/react-test-util-to-class-component "Link to GitHub repository")

## Install.
```bash
npm install react-test-util-to-class-component --save-dev
```

##Usage.
Import and wrap your component-function. Then test it.
```javascript
import React, { Component } from 'react';
import reactTestUtilToClassComponent from 'react-test-util-to-class-component';
import {
  renderIntoDocument,
  isCompositeComponent,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag
} from 'react-dom/test-utils';

const FunctionComponent = ({
  rootClass = '',
  innerClass = '',
  children = null
}) => (
  <div className={rootClass}>
    <div className={innerClass}>{children}</div>
  </div>
);

const WrappedClassComponent = reactTestUtilToClassComponent(FunctionComponent);

describe('Test for react-test-util-to-class-component', () => {
  it('Try render and test FunctionComponent wrapped to WrappedClassComponent', () => {
    const element = <WrappedClassComponent rootClass="root" innerClass="inner">Wrapped Fucntion Component</WrappedClassComponent>;
    const renderedComponent = renderIntoDocument(element);

    expect(isCompositeComponent(renderedComponent)).toBe(true);

    const divs = scryRenderedDOMComponentsWithTag(renderedComponent, 'div');

    expect(divs.length).toBe(2);

    const roots = scryRenderedDOMComponentsWithClass(renderedComponent, 'root');
    expect(roots.length).toBe(1);

    const inners = scryRenderedDOMComponentsWithClass(renderedComponent, 'inner');
    expect(inners.length).toBe(1);

    const [root] = roots;
    const [inner] = inners;

    expect(root.childNodes.length).toBe(1);
    expect(root.childNodes[0]).toBe(inner);
    expect(inner.textContent).toBe('Wrapped Fucntion Component');
  });
});

```

##License
[MIT](./LICENSE "MIT") Copyright (c) 2018 Kuznetsov Leonid.
