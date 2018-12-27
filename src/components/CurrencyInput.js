import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * This function returns a CurrencyInput component to be rendered. The component
 * is controlled by the arguments, handling only the rendering of the information.
 * @param	{string}	to				The currency to convert to
 * @param	{string}	from			The currency to convert from
 * @param	{string}	value			The value of the input field
 * @param	{func}		handleOnChange	The function to be fired on input change
 * @param	{string}	currency		The currency shorthand (eg. GBP)
 * @param	{func}		changeCurrency	The function to be fired changing the currency
 * @param	{object}	balance			The object containing the account balances
 * @param	{object}	style			The style object containing specific styles
 * @returns	{jsx}						Returns the CurrencyInput component
 */
function CurrencyInput({
	to,
	from,
	value,
	handleOnChange,
	currency,
	changeCurrency,
	balance,
	style,
}) {
	// Dynamic import of the icon based on which currency is used
	const icon = require(`../resources/icons/${currency}.svg`);

	// Disable the 'to' input
	const disabled = to === 'exchangeFromAmount';

	// Initiate the actual balance
	let actualBalance = 0;

	// If a balance is passed through, set the actual balance based on the currency in use
	if (balance) {
		actualBalance = balance[currency];
	}

	return (
		<Wrapper style={style}>
			<InnerWrapper>
				<Indicator>
					<IndicatorButton onClick={changeCurrency}>
						<Icon size={'large'} src={icon} />
						<p>{currency}</p>
					</IndicatorButton>
					<Balance>Balance: {actualBalance}</Balance>
				</Indicator>
				<Input
					type={'number'}
					placeholder={'0'}
					value={value}
					disabled={disabled}
					onChange={(event) => {
						handleOnChange(to, from, event);
					}}
				/>
			</InnerWrapper>
		</Wrapper>
	);
}

// Verify the passed through Props
CurrencyInput.propTypes = {
	value: PropTypes.string.isRequired,
	handleOnChange: PropTypes.func.isRequired,
	to: PropTypes.string.isRequired,
	from: PropTypes.string.isRequired,
	changeCurrency: PropTypes.func.isRequired,
	currency: PropTypes.string,
	balance: PropTypes.shape({
		GBP: PropTypes.string,
		EUR: PropTypes.string,
		USD: PropTypes.string,
	}),
	style: PropTypes.shape({
		background: PropTypes.string,
		color: PropTypes.string,
	}),
};

// Define the default PropTypes
CurrencyInput.defaultProps = {
	currency: 'GBP',
	balance: null,
	style: {
		background: '#FFFFFF',
		color: 'transparent',
	},
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 10vh;
	background: ${props => props.style.color};
	padding: 5% 0;

	@media (min-width: 700px) {
		width: 45%;
	}
`;

const InnerWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
	padding: 0 4%;
`;

const Icon = styled.img`
	width: 100%;
	margin-right: 15px;
	height: ${props => (props.size === 'small' ? '10%' : '30%')}
`;

const Input = styled.input`
	width: 100%;
	font-size: 3rem; 
	appearance: none;
	margin: 0;
	background-color: transparent;
	text-align: right;
`;

const Indicator = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 30px;
`;

const IndicatorButton = styled.button`
	display: flex;
	align-items: center;
	height: 100%;
	background-color: transparent;
	cursor: pointer;
`;

const Balance = styled.div`
	width: 20vw;
	color: black;
`;

export default CurrencyInput;
