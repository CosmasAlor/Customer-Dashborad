document.addEventListener('DOMContentLoaded', () => {
    const customerFilterInput = document.getElementById('customer-filter');
    const amountFilterInput = document.getElementById('amount-filter');
    const customerTableBody = document.querySelector('#customer-table tbody');
    const transactionChartCtx = document.getElementById('transaction-chart').getContext('2d');
    
    let customers = [];
    let transactions = [];
    let aggregatedTransactions = [];
    let chart;

    // Fetch data from local server
    async function fetchData() {
        const customerResponse = await fetch('http://localhost:3001/customers');
        customers = await customerResponse.json();
        const transactionResponse = await fetch('http://localhost:3001/transactions');
        transactions = await transactionResponse.json();
        aggregateTransactions();
        displayTable(aggregatedTransactions);
        displayLatestTransactionGraph();
    }

    // Aggregate transactions by customer
    function aggregateTransactions() {
        const customerTransactionMap = new Map();

        transactions.forEach(transaction => {
            const customer = customers.find(c => c.id === transaction.customer_id);
            if (customerTransactionMap.has(customer.id)) {
                customerTransactionMap.get(customer.id).amount += transaction.amount;
            } else {
                customerTransactionMap.set(customer.id, {
                    customerName: customer.name,
                    amount: transaction.amount
                });
            }
        });

        aggregatedTransactions = Array.from(customerTransactionMap.values());
    }

    // Display table data
    function displayTable(data) {
        customerTableBody.innerHTML = '';
        data.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.customerName}</td>
                <td></td>
                <td>${transaction.amount}</td>
            `;
            row.addEventListener('click', () => displayChart(transaction.customerName));
            customerTableBody.appendChild(row);
        });
    }

    // Display chart data
    function displayChart(customerName) {
        const customer = customers.find(c => c.name === customerName);
        const customerTransactions = transactions.filter(t => t.customer_id === customer.id);
        
        // Aggregate transaction amounts by date
        const dateTransactionMap = {};
        customerTransactions.forEach(transaction => {
            if (dateTransactionMap[transaction.date]) {
                dateTransactionMap[transaction.date] += transaction.amount;
            } else {
                dateTransactionMap[transaction.date] = transaction.amount;
            }
        });

        const dates = Object.keys(dateTransactionMap);
        const amounts = Object.values(dateTransactionMap);

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(transactionChartCtx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Transaction Amount',
                    data: amounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Display the latest transaction graph for any customer
    function displayLatestTransactionGraph() {
        if (transactions.length === 0) return;

        // Find the latest transaction date
        const latestTransaction = transactions.reduce((latest, current) => {
            return new Date(current.date) > new Date(latest.date) ? current : latest;
        });

        const customer = customers.find(c => c.id === latestTransaction.customer_id);
        if (customer) {
            displayChart(customer.name);
        }
    }

    // Filter table by customer name
    customerFilterInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        const filteredData = aggregatedTransactions.filter(transaction => 
            transaction.customerName.toLowerCase().includes(value)
        );
        displayTable(filteredData);
    });

    // Filter table by transaction amount
    amountFilterInput.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        const filteredData = aggregatedTransactions.filter(transaction => 
            transaction.amount >= value
        );
        displayTable(filteredData);
    });

    fetchData();
});
