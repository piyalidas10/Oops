# ATM Withdrawal using OOPs concept

Suppose we have three different account types, 
1. one for Saving 
2. one for Current

We have two actions 
1. Withdraw
2. Deposit

Using object-oriented approach, I have created one parent class, ‘BankAccount’ with functions of deposit, withdraw, currentBalance, showBalance. 

```
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
```
BankAccount has 2 child classes : 1. Saving 2. Current. So child classes inherited “BankAccount” class. So that they will have access to withdraw and deposit functions in BankAccount class.

```
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
```

There is a change in the requirement specification, something that is so common in the software industry. You are supposed to add functionality privileged Banking Account with Overdraft Facility. So i need to create withdraw function seperately for Overdraft account without disturbing ‘BankAccount’ functions.

```
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
```
I have created a Form class to fetch form fields values using formHandler function.
```
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
```

### Reference URLs :

```
https://www.guru99.com/java-class-inheritance.html
https://slideplayer.com/slide/13544629/
https://www.youtube.com/watch?v=gWpg3yMiL0M
http://www.cems.uwe.ac.uk/~jsa/UMLJavaShortCourse09/CGOutput/Unit8/unit8(0809)/page_06.htm
```