import React, { Component } from "react";
import {
	Platform,
	StyleSheet,
	View,
	TextInput,
	Text,
	Button,
	Image
} from "react-native";
import Icons from "./Icons";
import valid from "card-validator";

const card = {
	isValid: false,
	length: 15,
	number: "",
	ccCard: {
		type: "placeholder"
	}
};

const code = {
	isValid: false,
	ccCode: {
		name: "Security Code",
		size: 3
	}
};

const expiry = {
	isValid: false
};

export default class IHAKCCInput extends Component {
	static defaultProps = {
		fontFamily: Platform.select({ ios: "Courier", android: "monospace" }),
		invalidStyle: {
			borderColor: "blue"
		},
		validStyle: {
			borderColor: "green"
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			name: "",
			card: card,
			code: code,
			expiry: expiry
		};

		this.validateCardNumber = this.validateCardNumber.bind(this);
		this.validateExpiryDate = this.validateExpiryDate.bind(this);
	}

	onValidCardDetails() {
		this.props.onValid(this.state.card, this.state.expiry, this.state.code);
	}

	onCardNumberChange(text) {
		this.validateCardNumber(text);
		this.setState(prevState => {
			let card = prevState.card;
			card.number = text;
			return { card };
		});
	}

	onMonthChange(text) {
		let date = text + "/" + this.state.expiry.year;
		this.validateExpiryDate(date);

		this.setState(prevState => {
			let expiry = this.state.expiry;
			expiry.month = text;

			return { expiry };
		});
	}

	onYearChange(text) {
		let date = this.state.expiry.month + "/" + text;
		this.validateExpiryDate(date);

		this.setState(prevState => {
			let expiry = prevState.expiry;
			expiry.year = text;

			return { expiry };
		});
	}

	onSecurityCodeChange(text) {
		console.log(text, this.state.code);
		let valid = text.length == this.state.code.ccCode.size;
		console.log(valid);
		this.setState(prevState => {
			let code = prevState.code;
			code.isValid = valid;
			code.number = text;

			return { code };
		});

		if (valid) {
			this.onValidCardDetails();
		}
	}

	onNameChange(text) {
		this.setState({ name: text });
	}

	onSubmit() {}

	validateCardNumber(number) {
		let validation = valid.number(number);
		console.log(number);
		console.log("card validation", validation);
		if (validation.isPotentiallyValid) {
			if (validation.card) {
				this.setState(prevState => {
					return {
						card: {
							length: Math.max(...validation.card.lengths),
							isValid: validation.isValid,
							ccCard: validation.card
						},
						code: {
							isValid: prevState.code.isValid,
							ccCode: validation.card.code
						}
					};
				});
			} else {
				this.resetCard();
			}
		} else {
			this.resetCard();
		}

		if(validation.isValid) {
			this.onValidCardDetails();
			}
	}

	validateExpiryDate(date) {
		let validation = valid.expirationDate(date);
		console.log(date);
		console.log(validation);

		this.setState(prevState => {
			let expiry = prevState.expiry;
			expiry.ccExpiry = validation;
			expiry.isValid = validation.isValid;

			return { expiry };
		});

		if(validation.isValid) {
			this.onValidCardDetails();
		}
	}

	resetCard() {
		this.setState({ card, code });
	}

	resetCode() {
		this.setState({ code });
	}

	/*
	_onFocus = () => {
		let field = this.refs["cardNumber"];
		field.style.borderColor = "orange";
	};
	*/

	borderStyle(value, valid) {
		const { defaultStyle, validStyle, invalidStyle } = this.props;
		return (value == null || value === "") ? defaultStyle : valid ? validStyle : invalidStyle;
	}

	nameField() {
		const { showName, validStyle, invalidStyle, placeholderColor, textColor, style } = this.props;
		console.log("called nameField method, showName:", showName);
		let valid = this.state.name !== null && this.state.name !== "";
		if (showName) {
			return (
				<TextInput
					placeholder="Name"
						placeholderTextColor={placeholderColor}
					autoCapitalize="words"
					style={[
						styles.baseStyle,
						this.borderStyle(this.state.name, valid),
						style
					]}
					onChangeText={this.onNameChange.bind(this)}
				/>
			);
		}
		return null;
	}

	render() {
		const { placeholderColor, style } = this.props;
		console.log(style);

		return (
			<View>
				<View style={{ flexDirection: "row" }}>
					<TextInput
						ref="cardNumber"
						placeholder="Card Number"
						placeholderTextColor={placeholderColor}
						keyboardType="number-pad"
						underlineColorAndroid={"transparent"}
						maxLength={this.state.card.length}
						onChangeText={this.onCardNumberChange.bind(this)}
						style={[
							{ flex: 1 },
							styles.baseStyle,
						this.borderStyle(this.state.card.number, this.state.card.isValid),
							style
						]}
					/>
					<Image
						style={[styles.cardImage]}
						resizeMethod="auto"
						resizeMode="contain"
						source={Icons[this.state.card.ccCard.type]}
					/>
				</View>
				<View
					style={{
						flexDirection: "row"
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							flex: 1
						}}
					>
						<TextInput
							placeholder="MM"
						placeholderTextColor={placeholderColor}
							keyboardType="number-pad"
							onChangeText={this.onMonthChange.bind(this)}
							style={[
								styles.baseStyle,
								this.borderStyle(this.state.expiry.month, this.state.expiry.isValid),
								style
							]}
						/>
						<View style={{ justifyContent: "center" }}>
							<Text
								style={[
									{
										textAlign: "center",
										fontSize: 20
									},
									style
								]}
							>
								/
							</Text>
						</View>
						<TextInput
							placeholder="YY"
						placeholderTextColor={placeholderColor}
							keyboardType="number-pad"
							onChangeText={this.onYearChange.bind(this)}
							style={[
								styles.baseStyle,
								this.borderStyle(this.state.expiry.year, this.state.expiry.isValid),
								style
							]}
						/>
					</View>
					<View
						style={{
							justifyContent: "center",
							flex: 2
						}}
					>
						<TextInput
							placeholder={this.state.code.ccCode.name}
						placeholderTextColor={placeholderColor}
							keyboardType="number-pad"
							maxLength={this.state.code.ccCode.size}
							onChangeText={this.onSecurityCodeChange.bind(this)}
							style={[
								styles.baseStyle,
								this.borderStyle(this.state.code.number, this.state.code.isValid),
								style
							]}
						/>
					</View>
				</View>
				{this.nameField()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	baseStyle: {
		fontSize: 16,
		margin: 10,
		padding: 5,
		borderColor: "black",
		borderWidth: StyleSheet.hairlineWidth
	},
	cardNumber: {
		borderColor: "black",
		borderWidth: StyleSheet.hairlineWidth
	},
	cardImage: { width: 50, height: 50, marginRight: 10 }
});
