import React from 'react';
import Button from './components/Button';
import CurrencyInput from './components/CurrencyInput';

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

	handleOnChange = (type, event) => {
		const value = event.target.value;
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
					handleOnChange={this.handleOnChange}
					value={exchangeFromAmount}
					currency={exchangeFromCurrency}
					type={'exchangeFromAmount'}
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
