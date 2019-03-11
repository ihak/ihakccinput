# IHAKCCInput
A React-Native component to take and validate credit card details 💳 💳.

## Description
This component acts as a drop-in replacement for credit card form. It takes all the
details required for credit card to make payments, validates them and provide you
with all the details via a callback function.

## Features
- Credit card number validation.
- Detects six different credit-card providers and displays the image.
- Validates the expiry date and security code.
- Provide optional card holder's name field.
- Updates via callback upon entry of valid details.
- Completely configurable design via style props and other style dictionaries.

Build and tested on iOS. Should also work on Android as well.

## Supported versions
- Requires ```React-Native``` ```v.0.58.6``` or greater.
- Tested on ```v.0.58.6```.
- Should work on lower versions as well.

## Installation
Installation can be done via npm or yarn.

```shell
npm i ihakccinput --save
```

```shell
yarn add ihakccinput
```
## Usage

```js
import { IHAKCCInput } from 'ihakccinput';
```

```js
<IHAKCCInput 
    showName 
    style={{ fontSize: 20, color: "brown", margin: 5, padding: 2 }} 
	validStyle={{borderColor: "blue"}} 
	invalidStyle={{borderColor: "orange"}}
	defaultStyle={{borderColor: "purple"}}
	placeholderColor="pink"
	onValid={
		(card, expiry, code) => {
			console.log(card, expiry, code);
			console.log("Valid number entered");
		}
	}
	/>
```

## Props
| Property | Type | Description
--- | --- | ---

showName | Bool | Show and hide the card holder name field

style | style prop | Style prop

validStyle | style prop | Configures the look of input fields when input is valid

invalidStyle | style prop | Configures the look of input fields when input is invalid

defaultStyle | style prop | Configures the look of input field when empty

placeholderColor | String | Placehlder color

onValid | function | Called when information is provided is valid. Passes card, 
expiry, code and name as arguments.

## Callback
Callback is called when any of one of card, expiry or code field has a valid value.
```onValid``` callback provides three arguments namely card, expiry and code.

### card 
- ccCard: Credit card object provided by credit-card module.
- isValid: Bool showing if the number is valid. (Always true).
- length: Max length of number.
- number: Credit card number entered.

### expiry
- isValid: Bool showing if the expiry date entered is valid or not.
- month: Month entered.
- year: Year entered.

### code
- isValid: Bool showing if the security number is valid. Checks the length of code to validate.
- ccCode: Security code object provided by credit-card module.
- number: Security number entered.

### name
- Name entered in the text field.

## Example
![iOS example screenshot 1](https://raw.githubusercontent.com/ihak/IHAKCCInput/master/ios1.png)
![iOS example screenshot 2](https://raw.githubusercontent.com/ihak/IHAKCCInput/master/ios2.png)

## License
MIT.

## Author
Hassan Ahmed Khan <hassandotahmed@gmail.com>
