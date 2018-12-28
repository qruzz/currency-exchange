import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * This function returns a Button component to be rendered. The function
 * takes the arguments and renders the button acordingly. The button will
 * fire an onclick function, if passed through.
 * @param	{func}		onClick	The function for the button action
 * @param	{string}	title	The button text
 * @param	{string}	color	The colour of the button
 * @param	{string}	type	The type of button (primary/secondary)
 * @param	{bool}		active	Determines if the button is active or not
 * @returns	{jsx}				Returns the Button component
 */
function Button({
	onClick,
	title,
	color,
	type,
	active,
}) {
	return (
		<Wrapper
			color={color}
			active={active}
			type={type}
			onClick={active ? onClick : null}
		>
			<Title>{title}</Title>
		</Wrapper>
	);
}

// Verify the passed through Props
Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	color: PropTypes.string,
	type: PropTypes.string,
	active: PropTypes.bool,
};

// Define the default PropTypes
Button.defaultProps = {
	color: '#EB008D',
	type: 'primary',
	active: false,
};

const Wrapper = styled.button`
	width: ${props => (props.type === 'primary' ? '100%' : '20%')};
	height: 6vh;
	display: flex;
	align-items: center;
	justify-content: center;
	align-self: center;
	border-radius: calc(12vh / 2);
	outline: none;
	background: ${props => (props.color)};
	opacity: ${props => (props.active ? 1 : 0.4)};
	cursor: ${props => (props.active ? 'pointer' : 'default')};
	margin: 5% 0;

	@media (min-width: 700px) {
		width: 30%;
	}
`;

const Title = styled.span`
	color: #FFFFFF;
`;

export default Button;
