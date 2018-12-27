import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * This function returns the RateIndicator component to be rendered. It uses
 * the parameters to construct a string showing the to and from currency, as
 * well as the exchange rate.
 * @param	{string}	from	The currency to exchange from
 * @param	{string}	to		The currency to exchange to
 * @param	{number}	rate	The exchange rate between 'from' and 'to'
 * @returns	{jsx}				Returns the RateIndicator component
 */
function RateIndicator({ from, to, rate }) {
	let string = '';

	// Determine which string to render
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

// Verify the passed through Props
RateIndicator.propTypes = {
	rate: PropTypes.number.isRequired,
	from: PropTypes.string,
	to: PropTypes.string,
};

// Define the default PropTypes
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
