import React from 'react';
import styled from 'styled-components';

import Button from './components/Button';
import CurrencyInput from './components/CurrencyInput';
import RateIndicator from './components/RateIndicator';

import { getLatestExchangeRates } from './services/api';

/**
 * This class represents the whole application. It handles the logic for lower
 * level and stateless components which it inejects into the its render function.
 * The application renders the functionality to exchange a value from one currency
 * to another based exchange rate, updated every 10 seconds.
 * @returns	{jsx}		The App component
 */
class App extends React.PureComponent {
	/**
	 * The constructor initialises the global state three for the application.
	 * It also defines any constants that should be available in the 'this' scope.
	 */
	constructor() {
		super();

		this.state = {
			exchangeFromCurrency: 'GBP',
			exchangeFromAmount: '',
			exchangeToCurrency: 'EUR',
			exchangeToAmount: '',
			exchangeRates: null,
			balance: null,
		};

		// The exchange rate update interval
		this.UPDATE_INTERVAL = 10000;
	}

	/**
	 * After the component is mounted in the DOM, initialise the exchange
	 * rates and the account balances in the global state. If a balance does
	 * not exist, create an arbritraty balance for testing purposes.
	 * @returns {void}
	 */
	componentDidMount() {
		// Initialise the exchange rates
		this.setExchangeRates();

		// Update the exchange rate every 10000 ms (10s)
		const intervalID = setInterval(this.setExchangeRates, this.UPDATE_INTERVAL);

		// Get the stored balance
		let balance = JSON.parse(localStorage.getItem('@user:balance')) || null;

		// If no balance has been stored in the localStorage, create one and store it
		if (!balance) {
			balance = {
				USD: 100,
				EUR: 400,
				GBP: 341,
			};
			localStorage.setItem('@user:balance', JSON.stringify(balance));
		}

		// Set the intervalID and balance in state
		this.setState({
			intervalID,
			balance,
		});
	}

	/**
	 * When the component is about to unmount from the DOM, this function will
	 * stop the execution of the created interval method.
	 * @returns {void}
	 */
	componentWillUnmount() {
		const { intervalID } = this.state;

		// Remove the interval started when the component mounted
		clearInterval(intervalID);
	}

	/**
	 * This function get the lates exchange rates from the API for
	 * 'exchangeFromCurrency', which is stored in state. It then sets the
	 * exchange rates in state.
	 * @returns	{void}
	 */
	setExchangeRates = () => {
		const { exchangeFromCurrency } = this.state;

		// Get the exchange rates from the API and set them in state
		getLatestExchangeRates(exchangeFromCurrency).then((result) => {
			this.setState({
				exchangeRates: result,
			});
		});
	}

	/**
	 * This function is passed to the CurrencyInput components to handle
	 * the logic behind changing the value of the text input.
	 * @param	{string}	to		The input to update based on type
	 * @param	{string}	from	The input to change based on exchange rates
	 * @param	{object}	event	The event with the typed values
	 * @returns	{void}
	 */
	handleFromChange = (to, from, event) => {
		const { exchangeToCurrency } = this.state;
		const { value } = event.target;

		// First set the typed state to not experience lag
		this.setState({
			[from]: value,
		}, () => {
			const { exchangeRates } = this.state;

			// Define a tempExcahnge based on the exchange rates times the typed value
			const tempExchange = value * exchangeRates.rates[exchangeToCurrency];

			// If the tempExchange is 0, make the input empty, else show the exchanged value
			this.setState({
				[to]: tempExchange === 0 ? '' : tempExchange.toFixed(2),
			});
		});
	}

	/**
	 * This function returns a boolean value determining if the exchange
	 * button shold be actionable or not. If the amount is higher than the
	 * balance, if no value is entered, or if the currencies are the same,
	 * the button will be inactive.
	 * @returns	{bool}	The boolean value determining if one can make an exchange
	 */
	canExcange = () => {
		const {
			exchangeFromCurrency,
			exchangeToCurrency,
			exchangeFromAmount,
			exchangeToAmount,
			balance,
		} = this.state;

		// If no value has been entered, no exchange can happen
		if (exchangeFromAmount === '' || exchangeToAmount === '') {
			return (false);
		}

		// If the to and from currency are the same, no exchange can happen
		if (exchangeFromCurrency === exchangeToCurrency) {
			return (false);
		}

		// If the typed value is greater than the balance on the account, no exchange can happen
		if (exchangeFromAmount > balance[exchangeFromCurrency]) {
			return (false);
		}

		return (true);
	}

	
	exchangeBetweenCurrencies = () => {
		const {
			exchangeFromAmount,
			exchangeFromCurrency,
			exchangeToAmount,
			exchangeToCurrency,
			balance,
		} = this.state;

		let newFromBalance = 0;
		let newToBalance = 0;
		const currentFromBalance = balance[exchangeFromCurrency];
		const currentToBalance = balance[exchangeToCurrency];
		if (currentFromBalance > exchangeFromAmount) {
			newFromBalance = currentFromBalance - exchangeFromAmount;
			newToBalance = currentToBalance + Number(exchangeToAmount);

			this.setState(prevState => ({
				balance: {
					...prevState.balance,
					[exchangeFromCurrency]: newFromBalance,
					[exchangeToCurrency]: newToBalance,
				},
			}), () => {
				localStorage.setItem('@user:balance', JSON.stringify(balance));
			});
		}
	}

	/**
	 * This function handles changing the logic behind changing the currencies to
	 * be exchanged. The function is to be attached as a button action, and it
	 * will cycle through the currencies, updating the exchange rates and the
	 * typed inputs. It will apply the updates to the state.
	 * @param	{string}	currency	The state to change
	 * @param	{string}	value		The shorthand of the currency to change
	 * @returns	{void}
	 */
	changeCurrency = (currency, value) => {
		const {
			exchangeFromCurrency,
			exchangeFromAmount,
			exchangeToCurrency,
		} = this.state;

		let base = null;
		const currencies = ['EUR', 'GBP', 'USD'];

		// Find the shorthand for the value to change in the currencies array
		const currentCurrencyIndex = currencies.indexOf(value);

		// Get the next index of the next currency in the currencies array
		const nextIndex = currentCurrencyIndex === 2 ? 0 : currentCurrencyIndex + 1;

		// Set the appropriate base currency for the API call
		if (currency === 'exchangeFromCurrency') {
			base = currencies[nextIndex];
		} else {
			base = exchangeFromCurrency;
		}

		// Get the latest exchange rates for the new base currency
		getLatestExchangeRates(base).then((result) => {
			let exchangedValue = null;

			// Calculate the new 'exchangeToAmount' based on the typed value and the exchange rates
			if (currency === 'exchangeFromCurrency') {
				if (base === exchangeToCurrency) {
					exchangedValue = exchangeFromAmount * 1;
				} else {
					exchangedValue = (exchangeFromAmount * result.rates[exchangeToCurrency]).toFixed(2);
				}
			} else {
				exchangedValue = (exchangeFromAmount * result.rates[currencies[nextIndex]]).toFixed(2);
			}

			// Set the new exchange rates and exchange values in state
			this.setState({
				exchangeRates: result,
				exchangeToAmount: exchangedValue,
				[currency]: currencies[nextIndex],
			});
		});
	}

	/**
	 * This function renders the App and all its children. This can be passed in
	 * as a component to any pre-existing application. It will be reponsive to the
	 * the container in which it is renderd.
	 * @returns	{jsx}	The App component
	 */
	render() {
		const {
			exchangeFromAmount,
			exchangeFromCurrency,
			exchangeToAmount,
			exchangeToCurrency,
			exchangeRates,
			balance,
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
						balance={balance}
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
						currency={exchangeToCurrency}
						to={'exchangeFromAmount'}
						from={'exchangeToAmount'}
						balance={balance}
						style={{
							color: '#FFFFFF',
							background: 'transparent',
						}}
					/>
				</CurrencyWrapper>
				<Button
					title={'Exchange'}
					active={this.canExcange()}
					onClick={this.exchangeBetweenCurrencies}
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
