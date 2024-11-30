function calculateTotal() {
    // Preços dos ingressos
    const adultPrice = 30.00;   // Preço ingresso Adulto
    const studentPrice = 15.00; // Preço ingresso Estudante / Menor
 
    // Obtendo valores dos campos de input
    const adultTickets = parseInt(document.getElementById('adultTickets').value) || 0;
    const studentTickets = parseInt(document.getElementById('studentTickets').value) || 0;
 
    // Calculando o total
    const total = (adultPrice * adultTickets) + (studentPrice * studentTickets);
 
    // Definindo a data da compra como a data atual
    const purchaseDate = new Date();
    const purchaseDateString = purchaseDate.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
 
    // Atualizando o valor total na página
    document.getElementById('totalAmount').textContent = total.toFixed(2);
 
    // Atualizando a data da compra na página
    document.getElementById('selectedDate').textContent = purchaseDateString;
 
    // Atualizando a validade do ingresso
    updateValidity(purchaseDate);
 
    // Mostrar as seções de total e validade
    document.getElementById('totalDisplay').style.display = 'block';
    document.getElementById('validityDisplay').style.display = 'block';
    document.getElementById('confirmSection').style.display = 'block';
}
 
 
 
 
function updateValidity(purchaseDate) {
    // Calculando a data de validade (adicionando 7 dias à data de compra)
    let validityDate = new Date(purchaseDate);
    validityDate.setDate(validityDate.getDate() + 7); // Adiciona 7 dias
 
    // Calculando o início e o fim da semana da validade
    let startDate = new Date(validityDate);
    startDate.setDate(validityDate.getDate() - validityDate.getDay()); // Ajusta para o domingo da semana
 
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // Final da semana (sábado)
 
    // Formatando as datas para exibição
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const startDateFormatted = startDate.toLocaleDateString('pt-BR', options);
    const endDateFormatted = endDate.toLocaleDateString('pt-BR', options);
 
    // Exibindo o texto de validade
    document.getElementById('validityPeriod').textContent = `Ingresso válido de ${startDateFormatted} até ${endDateFormatted}.`;
}
 
 
function saveOrderAndShowRegistration() {
    const adultTickets = parseInt(document.getElementById('adultTickets').value) || 0;
    const studentTickets = parseInt(document.getElementById('studentTickets').value) || 0;
    const totalAmount = document.getElementById('totalAmount').textContent;
    const validityPeriod = document.getElementById('validityPeriod').textContent;
 
    const order = {
        adultTickets,
        studentTickets,
        totalAmount,
        validityPeriod,
        orderDate: new Date().toLocaleString('pt-BR'), // Data do pedido
    };
 
    // Salvar no LocalStorage
    localStorage.setItem('userOrder', JSON.stringify(order));
 
    document.getElementById('registrationSection').style.display = 'block';
}
 
document.getElementById('confirmButton').addEventListener('click', saveOrderAndShowRegistration);
 
 
function saveCadastroAndShowPayment(event) {
    event.preventDefault();
    // Coleta os valores dos campos do formulário
    const fullName = document.getElementById('fullName').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const adress = document.getElementById('adress').value;
    const birthDate = document.getElementById('birthDate').value;
 
    // Validação: verifica se todos os campos foram preenchidos
    if (!fullName || !cpf || !email || !phone || !adress || !birthDate) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return; // Se algum campo estiver vazio, não prossegue com o processo
    }
 
    // Salva os dados em uma variável ou localStorage
    const cadastroData = {
        fullName,
        cpf,
        email,
        phone,
        adress,
        birthDate,
    };
 
    // Salvar no localStorage para acesso posterior
    localStorage.setItem('cadastroData', JSON.stringify(cadastroData));
    document.getElementById('paymentSection').style.display = 'block';
 
 
}
document.addEventListener('DOMContentLoaded', function() {
document.getElementById('cadastrarButton').addEventListener('click', saveCadastroAndShowPayment);
   
});
 
 
document.getElementById('paymentSection').style.display = 'none';
 
document.getElementById('paymentMethod').addEventListener('change', function () {
    const selectedMethod = this.value;
    const cardDetails = document.getElementById('cardDetails');
 
    if (selectedMethod === 'creditCard' || selectedMethod === 'debitCard') {
        cardDetails.style.display = 'block';
    } else {
        cardDetails.style.display = 'none';
    }
});
 
 
function savePaymentAndShowConfirmation() {
    const cardNumber = document.getElementById('cardNumber').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
 
    // Validação
    if (!paymentMethod) {
        alert("Por favor, selecione uma forma de pagamento.");
        return;
    }
    if ((paymentMethod === 'creditCard' || paymentMethod === 'debitCard') && !cardNumber) {
        alert("Por favor, insira o número do cartão.");
        return;
    }
 
    // Salvar no localStorage
    const paymentData = { cardNumber, paymentMethod };
    localStorage.setItem('payment', JSON.stringify(paymentData));
}
 
// Função para aparecer caixa de aviso de pagamento concluído
function prosseguirButton() {
    alert("Pagamento concluído com sucesso!");
        // Redireciona para a página inicial após o clique em "OK"
    window.location.href = "index final.html";
}
 
    document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("prosseguirButton").addEventListener("click", prosseguirButton);
});