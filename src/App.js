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
			exchangeRates: null,
		};
	}

	/**
	 * 
	 */
	componentDidMount() {
		this.setExchangeRates();
		const intervalID = setInterval(this.setExchangeRates, 10000);
		this.setState({ intervalID });
	}

	/**
	 * 
	 */
	componentWillUnmount() {
		const { intervalID } = this.state;
		clearInterval(intervalID);
	}

	setExchangeRates = () => {
		const { exchangeFromCurrency } = this.state;
		getLatestExchangeRates(exchangeFromCurrency).then((result) => {
			this.setState({
				exchangeRates: result,
			});
		});
	}

	handleFromChange = (to, from, event) => {
		const { exchangeToCurrency } = this.state;

		const { value } = event.target;

		this.setState({
			[from]: value,
		}, () => {
			const { exchangeRates } = this.state;
			const tempExchange = value * exchangeRates.rates[exchangeToCurrency];
			this.setState({
				[to]: tempExchange === 0 ? '' : tempExchange.toFixed(2),
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

	changeCurrency = (currency, value) => {
		const { exchangeFromCurrency } = this.state;

		let base = null;
		const currencies = ['EUR', 'GBP', 'USD'];
		const currentCurrencyIndex = currencies.indexOf(value);
		const nextIndex = currentCurrencyIndex === 2 ? 0 : currentCurrencyIndex + 1;
		if (currency === 'exchangeFromCurrency') {
			base = currencies[nextIndex];
		} else {
			base = exchangeFromCurrency;
		}
		getLatestExchangeRates(base).then((result) => {
			console.log(result);
			this.setState({
				exchangeRates: result,
				[currency]: currencies[nextIndex],
			});
		});
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
			exchangeRates,
		} = this.state;

		return (
			<Wrapper>
				<CurrencyWrapper>
					<CurrencyInput
						changeCurrency={() => this.changeCurrency('exchangeFromCurrency', exchangeFromCurrency)}
						handleOnChange={this.handleFromChange}
						value={exchangeFromAmount}
						currency={exchangeFromCurrency}
						to={'exchangeToAmount'}
						from={'exchangeFromAmount'}
						style={{
							color: '#FFFFFF',
						}}
					/>
					{exchangeRates
						? (
							<RateIndicator
								from={exchangeFromCurrency}
								to={exchangeToCurrency}
								rate={exchangeRates.rates[exchangeToCurrency]}
							/>
						)
						: (null)
					}
					<CurrencyInput
						changeCurrency={() => this.changeCurrency('exchangeToCurrency', exchangeToCurrency)}
						handleOnChange={this.handleFromChange}
						value={exchangeToAmount}
						type={'exchangeToAmount'}
						currency={exchangeToCurrency}
						to={'exchangeFromAmount'}
						from={'exchangeToAmount'}
						style={{
							color: '#FFFFFF',
							background: 'transparent',
						}}
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
