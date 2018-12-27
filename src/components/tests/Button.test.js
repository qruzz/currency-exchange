import React from 'react';
import { shallow } from '../../enzyme';

import Button from '../Button';

/* eslint no-undef: 0 */

describe('Button tests', () => {
	it('should be defined', () => {
		expect(Button).toBeDefined();
	});

	it('renders a button', () => {
		const wrapper = shallow(<Button />);
		expect(wrapper.find(Button)).toMatchSnapshot();
	});

	it('should call mock funciton when active is true', () => {
		const mockFn = jest.fn();
		const wrapper = shallow(<Button active onClick={mockFn} />);
		wrapper.simulate('click');
		expect(mockFn).toHaveBeenCalled();
	});

	it('should not call mock function when active is false', () => {
		const mockFn = jest.fn();
		const wrapper = shallow(<Button onClick={mockFn} />);
		wrapper.simulate('click');
		expect(mockFn).not.toHaveBeenCalled();
	});
});
