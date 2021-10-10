class Customer{
    constructor(account_number, available_balance) {
        this.account_number = account_number;
        this._available_balance = available_balance;
    }
    get available_balance() {
        return this._available_balance;
    }
    set available_balance(value) {
        this._available_balance = value;
    }
}
class BankAccount{
    constructor(account_number, account_balance) {
        this.account_number = account_number;
        this._account_balance = account_balance;
    }
    get account_balance() {
        return this._account_balance;
    }
    deposit(amount) {
        console.log('Deposit Amount => ', amount);
        if(amount > 0) {
            document.getElementById('amountEntered').innerText = amount;
            this._account_balance = this._account_balance - amount;
        } else {
            console.log('Sorry! Negative amount cannot be deposited');
        }
    }
    withdraw(amount) {
        console.log('Withdraw Amount => ', amount);
        if(amount > 0) {            
            let checkBalance = this._account_balance - amount;
            if (checkBalance < 0) {
                console.log('Sorry! Insufficient Funds');
            } else {
                this._account_balance =  checkBalance;
                document.getElementById('amountEntered').innerText = amount;
            }
        } else {
            console.log('Sorry! Negative amount cannot be withdrawn');
        }        
    }
    currentBalance() {
        document.getElementById('amountBalance').innerText = this._account_balance;
    }
    showBalance() {
        console.log('Account Balance => ', this._account_balance);
        document.getElementById('currentAmountBalance').innerText = this._account_balance;
        document.getElementById('result').style.display = "block";
    }
}
class Saving extends BankAccount{
    constructor(account_number, account_balance) {
        super(account_number, account_balance);
    }
}
class Current extends BankAccount{
    constructor(account_number, account_balance) {
        super(account_number, account_balance);
        this.minimum_balance = 5000;
        this.account_balance = this.account_balance - this.minimum_balance;
    }
}
class CreditCard extends BankAccount{
    constructor(account_number, account_balance) {
        super(account_number, account_balance);
    }
    withdraw() {
        super.withdraw();
    }
}

class Form { 
    constructor(formId, option, type, amountFieldId) {
        this._form = document.getElementById(formId);
        this.amountField = document.getElementById(amountFieldId);
        this.seletedOption = document.querySelector('input[name="' + option + '"]:checked').value;
        this.accountType = document.querySelector('input[name="' + type + '"]:checked').value;
        this._form.addEventListener('submit', this.formHandler.bind(this));
    }
    formHandler(event) {
        event.preventDefault();
        let amount = this.amountField.value.trim();        
        const account = new Saving(1, cust.available_balance);
        account.currentBalance();
        if (this.seletedOption === 'withdraw') {            
            account.withdraw(amount);
        }
        if (this.seletedOption === 'deposit') {
            account.deposit(amount);
        }
        account.showBalance();
        cust.available_balance = account.account_balance; // update account balance after withdraw or 
    }
}

const form = new Form('atm', 'optradio', 'account_type', 'amount');
const cust = new Customer(1, 50000);


