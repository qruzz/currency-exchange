import React from 'react';
import { shallow, expect } from '../../enzyme';

import Button from '../Button';

describe('Button tests', () => {
	it('renders a button', () => {
		const items = ['one', 'two', 'three'];
		const wrapper = shallow(<Button items={items} />);

		// Expect the wrapper object to be defined
		expect(wrapper.find('.list-items')).toBeDefined();
		expect(wrapper.find('.item')).toHaveLength(items.length);
	});

	it('renders a list item', () => {
		const items = ['Thor', 'Loki'];
		const wrapper = shallow(<List items={items} />);

		// Check if an element in the Component exists
		expect(wrapper.contains(<li key='Thor' className="item">Thor</li>)).toBeTruthy();
	});

	it('renders correct text in item', () => {
		const items = ['John', 'James', 'Luke'];
		const wrapper = shallow(<List items={items} />);

		// Expect the child of the first item to be an array
		expect(wrapper.find('.item').get(0).props.children).toEqual('John');
	});
});
