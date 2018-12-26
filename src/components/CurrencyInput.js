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
			type,
			value,
			handleOnChange,
			currency,
		} = this.props;
		const icon = require(`../resources/icons/${currency}.svg`);
		const balance = 400;
		return (
			<Wrapper>
				<InnerWrapper>
					<Icon size={'large'} src={icon} />
					<Input
						type={'number'}
						placeholder={'0'}
						value={value}
						onChange={(event) => {
							handleOnChange(type, event);
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
	height: 6vh;

	@media (min-width: 700px) {
		width: 45%;
	}
`;

const InnerWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
`;

const Icon = styled.img`
	height: ${props => props.size === 'small' ? '40%' : '60%'}
`;

const Input = styled.input`
	width: 100%;
	font-size: 3rem; 
	appearance: none;
	margin: 0; 
}
`;

const Balance = styled.div`

`;

// Verify the passed through Props
CurrencyInput.propTypes = {
	value: PropTypes.number.isRequired,
	handleOnChange: PropTypes.func.isRequired,
	currency: PropTypes.string,
	type: PropTypes.string,
};

// Define the default PropTypes
CurrencyInput.defaultProps = {
	currency: 'GBP',
};

export default CurrencyInput;
