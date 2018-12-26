import React from 'react';
import Button from './components/Button';
import CurrencyInput from './components/CurrencyInput';

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

	componentDidMount() {
		const { exchangeFromCurrency } = this.state;
		getLatestExchangeRates(exchangeFromCurrency).then((result) => {
			console.log(result);
		});
	}

	handleFromChange = (to, from, event) => {
		const {
			exchangeFromCurrency,
			exchangeToCurrency,
		} = this.state;

		const { value } = event.target;

		getLatestExchangeRates(exchangeFromCurrency).then((result) => {
			const { rates } = result;
			const tempExcahnge = value * rates[exchangeToCurrency];
			this.setState({
				[to]: tempExcahnge.toFixed(2),
				[from]: value,
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
			<div className="App">
				<CurrencyInput
					handleOnChange={this.handleFromChange}
					value={exchangeFromAmount}
					currency={exchangeFromCurrency}
					to={'exchangeToAmount'}
					from={'exchangeFromAmount'}
				/>
				<CurrencyInput
					handleOnChange={this.handleOnChange}
					value={exchangeToAmount}
					currency={exchangeToCurrency}
					type={'exchangeToAmount'}
				/>
				<Button
					title={'Exchange'}
					active={this.canExcange()}
				/>
			</div>
		);
	}
}

export default App;
