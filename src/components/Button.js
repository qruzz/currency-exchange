import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// TODO: Give the button a 'active' prop that will change the color and remove the onClick

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
			onClick={onClick}
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
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${props => props.type === 'primary' ? '100%' : '20%'};
	height: 6vh;
	border-radius: calc(12vh / 2);
	background: ${props => props.color};
	opacity: ${props => props.active ? 1 : 0.4};
	cursor: pointer;

	@media (min-width: 700px) {
		width: 30%;
	}
`;

const Title = styled.span`
	color: #FFFFFF;
`;

export default Button;