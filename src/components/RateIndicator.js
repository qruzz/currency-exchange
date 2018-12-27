import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * 
 */
function RateIndicator({ from, to, rate }) {
	let string = '';

	if (from && to && rate) {
		if (from !== to) {
			string = `${from}1 = ${to}${rate.toFixed(2)}`;
		} else {
			string = `${from}1 = ${to}${1}`;
		}
	} else {
		string = `${from}1 = ${to}${1}`;
	}

	return (
		<Wrapper>
			{string}
		</Wrapper>
	);
}

RateIndicator.propTypes = {
	rate: PropTypes.number.isRequired,
	from: PropTypes.string,
	to: PropTypes.string,
};

RateIndicator.defaultProps = {
	from: 'GBP',
	to: 'EUR',
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	background: #FFFFFF;
	border: 1px solid #E8E9EC;
	border-radius: 100px;
	padding: 1% 5%;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	color: #2372C5;
	font-weight: 600;
`;

export default RateIndicator;
