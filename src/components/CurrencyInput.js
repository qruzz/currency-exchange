import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * 
 * @param {*} param0 
 */
class CurrencyInput extends React.PureComponent {
	/**
	 * 
	 */
	render() {
		const {
			to,
			from,
			value,
			handleOnChange,
			currency,
			changeCurrency,
			style,
		} = this.props;
		const icon = require(`../resources/icons/${currency}.svg`);
		const balance = 400;
		return (
			<Wrapper style={style}>
				<InnerWrapper>
					<Indicator>
						<IndicatorButton onClick={changeCurrency}>
							<Icon size={'large'} src={icon} />
							<p>{currency}</p>
						</IndicatorButton>
						<Balance>Balance: {balance}</Balance>
					</Indicator>
					<Input
						type={'number'}
						placeholder={'0'}
						value={value}
						onChange={(event) => {
							handleOnChange(to, from, event);
						}}
					/>
				</InnerWrapper>
			</Wrapper>
		);
	}
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 10vh;
	background: ${props => props.style.color};

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
	height: ${props => props.size === 'small' ? '10%' : '30%'}
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
`;

// Verify the passed through Props
CurrencyInput.propTypes = {
	value: PropTypes.string.isRequired,
	handleOnChange: PropTypes.func.isRequired,
	to: PropTypes.string.isRequired,
	from: PropTypes.string.isRequired,
	currency: PropTypes.string,
	style: PropTypes.shape({
		color: PropTypes.string,
	}),
};

// Define the default PropTypes
CurrencyInput.defaultProps = {
	currency: 'GBP',
	style: {
		color: 'transparent',
	},
};

export default CurrencyInput;
