# ATM Withdrawal using OOPs concept

Suppose we have three different account types, 
1. one for Saving 
2. one for Current

We have two actions 
1. Withdraw
2. Deposit

Using object-oriented approach, I have created one parent class, ‘BankAccount’ with functions of deposit, withdraw, currentBalance, showBalance. 
BankAccount has 3 child classes : 1. Saving 2. Current. So child classes inherited “BankAccount” class. So that they will have access to withdraw and deposit functions in BankAccount class.

There is a change in the requirement specification, something that is so common in the software industry. You are supposed to add functionality privileged Banking Account with Overdraft Facility. So i need to create withdraw function seperately for Overdraft account without disturbing ‘BankAccount’ functions.


### Reference URLs :

```
https://www.guru99.com/java-class-inheritance.html
https://slideplayer.com/slide/13544629/
https://www.youtube.com/watch?v=gWpg3yMiL0M
http://www.cems.uwe.ac.uk/~jsa/UMLJavaShortCourse09/CGOutput/Unit8/unit8(0809)/page_06.htm
```