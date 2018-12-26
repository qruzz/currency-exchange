import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * This function returns a button component to be rendered. The function
 * takes the props objects as the only parameter and styles the button
 * accordingly. The button will fire an onclick function, if passed through.
 * @param	{object}	props	The props for the component
 * @returns	{jsx}				Returns the button component
 */
function Button({ onClick, title, color, type, active }) {
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
	width: ${props => props.type === 'primary' ? '100%' : '20%'};
	height: 6vh;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: calc(12vh / 2);
	outline: none;
	background: ${props => props.color};
	opacity: ${props => props.active ? 1 : 0.4};
	cursor: ${props => props.active ? 'pointer' : 'default' };
	margin: 5% 0;

	@media (min-width: 700px) {
		width: 30%;
	}
`;

const Title = styled.span`
	color: #FFFFFF;
`;

export default Button;
