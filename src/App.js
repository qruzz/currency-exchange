import React from 'react';
import styled from 'styled-components';

import Button from './components/Button';
import CurrencyInput from './components/CurrencyInput';
import RateIndicator from './components/RateIndicator';

import { getLatestExchangeRates } from './services/api';

/**
 * 
 */
class App extends React.PureComponent {
	/**
	 * 
	 * @param {*} props 
	 */
	constructor(props) {
		super(props);

		this.state = {
			exchangeFromCurrency: 'GBP',
			exchangeFromAmount: '',
			exchangeToCurrency: 'EUR',
			exchangeToAmount: '',
		};
	}

	handleFromChange = (to, from, event) => {
		const {
			exchangeFromCurrency,
			exchangeToCurrency,
		} = this.state;

		const { value } = event.target;

		this.setState({
			[from]: value,
		}, () => {
			getLatestExchangeRates(exchangeFromCurrency).then((result) => {
				const { rates } = result;
				const tempExchange = value * rates[exchangeToCurrency];
				this.setState({
					[to]: tempExchange === 0 ? '' : tempExchange.toFixed(2),
				});
			});
		});
	}

	handleOnChange = (type, event) => {
		const { value } = event.target;
		this.setState({ [type]: value });
	}

	canExcange = () => {
		const { exchangeFromAmount, exchangeToAmount } = this.state;

		if (exchangeFromAmount === '' || exchangeToAmount === '') {
			return (false);
		}

		return (true);
	}

	/**
	 * 
	 */
	render() {
		const {
			exchangeFromAmount,
			exchangeFromCurrency,
			exchangeToAmount,
			exchangeToCurrency,
		} = this.state;
		return (
			<Wrapper>
				<CurrencyWrapper>
					<CurrencyInput
						handleOnChange={this.handleFromChange}
						value={exchangeFromAmount}
						currency={exchangeFromCurrency}
						to={'exchangeToAmount'}
						from={'exchangeFromAmount'}
						style={{
							color: '#FFFFFF',
						}}
					/>
					<RateIndicator
						from={exchangeFromCurrency}
						to={exchangeToCurrency}
						rate={'1,01'}
					/>
					<CurrencyInput
						handleOnChange={this.handleOnChange}
						value={exchangeToAmount}
						currency={exchangeToCurrency}
						type={'exchangeToAmount'}
					/>
				</CurrencyWrapper>
				<Button
					title={'Exchange'}
					active={this.canExcange()}
				/>
			</Wrapper>
		);
	}
}

const Wrapper = styled.div`
	background: #E8E9EC;
	height: 100%;
	width: 100%;
`;

const CurrencyWrapper = styled.div`
	position: relative;
`;

export default App;
