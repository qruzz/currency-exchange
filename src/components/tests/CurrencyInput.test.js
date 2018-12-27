import React from 'react';
import { shallow } from '../../enzyme';

import CurrencyInput from '../CurrencyInput';

/* eslint no-undef: 0 */

describe('CurrencyInput test', () => {
	it('should be defined', () => {
		expect(CurrencyInput).toBeDefined();
	});

	it('renders an input', () => {
		const wrapper = shallow(<CurrencyInput />);
		expect(wrapper.find(CurrencyInput)).toMatchSnapshot();
	});
});
