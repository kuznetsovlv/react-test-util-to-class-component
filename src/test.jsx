import React from 'react';
import {
  renderIntoDocument,
  isCompositeComponent,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag
} from 'react-dom/test-utils';
import reactTestUtilToClassComponent from './index';

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
