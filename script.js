let totalAmount = 0;

// 1. Live Clock Functionality
function startClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById('clock').innerText = now.toLocaleString();
    }, 1000);
}

// 2. Add Item Function
function addItem() {
    const nameInput = document.getElementById('itemName');
    const priceInput = document.getElementById('itemPrice');
    const qtyInput = document.getElementById('itemQty');

    const name = nameInput.value;
    const price = parseFloat(priceInput.value);
    const qty = parseInt(qtyInput.value);

    // Validation
    if (name.trim() === "" || isNaN(price) || isNaN(qty) || price <= 0 || qty <= 0) {
        alert("Please enter valid item details.");
        return;
    }

    const rowTotal = price * qty;
    totalAmount += rowTotal;

    // Add Row to Table
    const tableBody = document.getElementById('billBody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${name}</td>
        <td>₹${price.toFixed(2)}</td>
        <td>${qty}</td>
        <td>₹${rowTotal.toFixed(2)}</td>
        <td><button class="remove-btn" onclick="removeItem(this, ${rowTotal})">Remove</button></td>
    `;

    tableBody.appendChild(newRow);

    // Update Grand Total
    updateGrandTotal();

    // Clear Inputs
    nameInput.value = "";
    priceInput.value = "";
    qtyInput.value = "1";
    nameInput.focus(); // Brings cursor back to Item Name
}

// 3. Remove Item Function
function removeItem(button, rowAmt) {
    const row = button.parentElement.parentElement;
    row.remove();
    totalAmount -= rowAmt;
    updateGrandTotal();
}

// 4. Update Total Display
function updateGrandTotal() {
    document.getElementById('grandTotal').innerText = totalAmount.toFixed(2);
}