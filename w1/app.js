let expenses = [];
let totalAmount = 0;

let alert_controller;
let name;
let amount;

function onload() {
    alert_controller = document.querySelector('ion-alert-controller');
    name = document.querySelector('ion-input#name');
    amount = document.querySelector('ion-input#amount');

    write();
}

function validate() {
    console.log(name);

    let is_empty_name = name.value === '';
    let is_empty_amount = amount.value === '';

    if (is_empty_name || is_empty_amount) {
        presentAlert();
    } else {
        let current_expense = {};
        current_expense.name = name.value;
        current_expense.amount = amount.value;

        expenses.push(current_expense);
        totalAmount += parseInt(current_expense.amount);

        write();
        clearForm();
    }
}

function write() {
    let i;
    let expense_list = '';

    for (i = 0; i < expenses.length; i++) {
        expense_list +=
            "<ion-item>" +
            expenses[i].name + ": Rp. " + expenses[i].amount + ",00" +
            "</ion-item>";
    }

    document.querySelector('#total').innerHTML = totalAmount + ",00";
    document.querySelector('#expenses').innerHTML = expense_list;
}

function clearForm() {
    name.value = '';
    amount.value = '';
}

async function presentAlert() {
    const alert = await alert_controller.create({
        header: 'Terjadi Kesalahan',
        message: 'Mohon masukkan nama dan jumlah pengeluaran',
        buttons: ['Tutup']
    });

    return await alert.present();
}