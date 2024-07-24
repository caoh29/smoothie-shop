class Smoothie {
  constructor(flavor, size, milk, extras, protein) {
    this.flavor = flavor;
    this.size = size;
    this.milk = milk;
    this.extras = extras;
    this.protein = protein;
  }

  describe() {
    return `${this.size} ${this.flavor} with ${this.milk} milk and ${this.extras}.`;
  }

  calculatePrice() {
    let price = 3; // Base price for a small smoothie

    // Adjust price based on size
    if (this.size === 'medium') {
      price += 2;
    } else if (this.size === 'large') {
      price += 4;
    }

    // Adjust price based on extras
    if (this.extras.includes('almonds')) {
      price += 1;
    }
    if (this.extras.includes('sprinkles')) {
      price += 0.5;
    }

    if (this.protein !== 'no') {
      price += 1.5; // Additional charge for protein
    }

    return price;
  }
}






document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('order-form');
  const ordersTableBody = document.getElementById('orders-table-body');
  

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const flavor = document.getElementById('flavor-select').value;
    const size = document.querySelector('input[name="size"]:checked').value;
    const milk = document.getElementById('milk-select').value;
    const extras = document.getElementById('extras-select').value;
    const protein = document.querySelector('input[name="protein"]:checked').value;
    const quantity = document.getElementById('quantity-input').value;

    const smoothie = new Smoothie(flavor, size, milk, extras, protein);
    const price = smoothie.calculatePrice() * quantity;

    const orderRow = document.createElement('tr');
    const orderNumberCell = document.createElement('th');
    const contentCell = document.createElement('td');
    const priceCell = document.createElement('td');

    orderNumberCell.scope = 'row';
    orderNumberCell.textContent = new Date().getTime(); // Use timestamp as order number
    contentCell.textContent = `(${quantity}) ${smoothie.describe()}`;
    priceCell.textContent = `$${price.toFixed(2)}`;

    orderRow.appendChild(orderNumberCell);
    orderRow.appendChild(contentCell);
    orderRow.appendChild(priceCell);

    ordersTableBody.appendChild(orderRow);

    // Reset the form
    form.reset();

    // Alert order number
    alert(`Your Order number is: ${orderNumberCell.textContent}`)

    // Remove the order from the queue after 1 minute
    setTimeout(() => {
      ordersTableBody.removeChild(orderRow);
    }, 60000);
  });
});