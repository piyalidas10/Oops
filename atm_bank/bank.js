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
        this.isErrorPresent = false;
    }
    get account_balance() {
        return this._account_balance;
    }
    deposit(amount) {
        console.log('Deposit Amount => ', amount);
        if(amount > 0) {
            document.getElementById('amountEntered').innerText = amount;
            this._account_balance = this._account_balance + amount;
        } else {
            this.isErrorPresent = true;
            document.getElementById('errorTxt').innerText = 'Sorry! Negative amount cannot be deposited';
            console.log('Sorry! Negative amount cannot be deposited');
        }
    }
    withdraw(amount) {
        console.log('Withdraw Amount => ', amount);
        if(amount > 0) {            
            let checkBalance = this._account_balance - amount;
            if (checkBalance < 0) {
                this.isErrorPresent = true;
                document.getElementById('errorTxt').innerText = 'Sorry! Insufficient Funds';
                console.log('Sorry! Insufficient Funds');
            } else {
                this._account_balance =  checkBalance;
                document.getElementById('amountEntered').innerText = amount;                
            }
        } else {
            this.isErrorPresent = true;
            document.getElementById('errorTxt').innerText = 'Sorry! Negative amount cannot be withdrawn';
            console.log('Sorry! Negative amount cannot be withdrawn');
        }        
    }
    currentBalance() {
        document.getElementById('amountBalance').innerText = this._account_balance;
    }
    showBalance() {
        console.log('Account Balance => ', this._account_balance);
        document.getElementById('currentAmountBalance').innerText = this._account_balance;  
        if(this.isErrorPresent) {
            document.getElementById('result').style.display = 'none';
            document.getElementById('error').style.display = 'block';
        } else {
            document.getElementById('result').style.display = 'block';
            document.getElementById('error').style.display = 'none';
        }              
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
class Privileged extends BankAccount{
    constructor(account_number, account_balance) {
        super(account_number, account_balance);
        this.overdraft_amount = 10000;
    }
    withdraw(amount) {
        console.log('Withdraw Amount => ', amount);
        if(amount > 0) {            
            let checkBalance = this._account_balance - amount;
            let extraAmount = Math.abs(checkBalance);
            if (checkBalance < 0) {                
                if (checkBalance < 0 && extraAmount < this.overdraft_amount) {
                    this._account_balance = 0;
                    document.getElementById('amountOverdraft').innerText = extraAmount;
                    document.getElementById('amountEntered').innerText = amount;
                } else {
                    this.isErrorPresent = true;
                    document.getElementById('errorTxt').innerText = 'Sorry! Maximum overdraft limit (10,000) is crossed';
                    console.log('Sorry! Maximum overdraft limit (10,000) is crossed');                   
                }
            } else {
                this._account_balance =  checkBalance;
                document.getElementById('amountEntered').innerText = amount;
            }
        } else {
            this.isErrorPresent = true;
            document.getElementById('errorTxt').innerText = 'Sorry! Negative amount cannot be withdrawn';
            console.log('Sorry! Negative amount cannot be withdrawn');
        }        
    }
}

class Form { 
    constructor(formId, option, type, amountFieldId) {
        this.seletedOption = document.querySelector('input[name="' + option + '"]:checked').value;
        this.accountType = document.querySelector('input[name="' + type + '"]:checked').value;
        this._form = document.getElementById(formId);
        this._radios = document.querySelectorAll('input[type="radio"]');
        this._radios.forEach(radioElem => {
            radioElem.addEventListener('change', this.changeHandler.bind(this));
        }); 
        this.amountField = document.getElementById(amountFieldId);
        console.log(this.seletedOption);
        this._form.addEventListener('submit', this.formHandler.bind(this));        
    }
    changeHandler(event) {      
        console.log(event);  
        if(event.target.getAttribute('name')=="account_action"){
            this.seletedOption = event.target.value;
            console.log('account_action selected => ', this.seletedOption);
        }
        if(event.target.getAttribute('name')=="account_type"){
            this.accountType = event.target.value;
            console.log('account_action selected => ', this.seletedOption);
        }        
    }
    formHandler(event) {
        event.preventDefault();
        let amount = parseInt(this.amountField.value.trim()); 
        let account;
        if (this.accountType === 'current') {
            account = new Current(1, cust.available_balance);
        }
        if (this.accountType === 'privileged') {
            account = new Privileged(1, cust.available_balance);
        }
        if (this.accountType === 'saving') {
            account = new Saving(1, cust.available_balance);
        }
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

const form = new Form('atm', 'account_action', 'account_type', 'amount');
const cust = new Customer(1, 50000);


