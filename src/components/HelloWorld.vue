<script>
export default {
  data() {
    return {
      basketA: [
        { name: 'Apple', quantity: 5 },
        { name: 'Mango', quantity: 3 },
        { name: 'Grapes', quantity: 5 },
        { name: 'Banana', quantity: 4 },
      ],
      basketB: [
        { name: 'Orange', quantity: 5 },
        { name: 'Strawberry', quantity: 3 },
      ],
      selectedItemIndexA: null,
      selectedItemIndexB: null,
      newItem: { name: '', quantity: null },
      newItem1: { name: '', quantity: null }
    };
  },
  methods: {
    addItem(basket) {
      const existingItem = basket.find(item => item.name === this.newItem.name);
      if (this.newItem.name && this.newItem.quantity > 0) {
        if (existingItem) {
          existingItem.quantity += this.newItem.quantity;
        } else {
          basket.push({
            name: this.newItem.name,
            quantity: this.newItem.quantity,
          });
        }
        this.newItem.name = '';
        this.newItem.quantity = null;
      }
    },
    addItem1(basket) {
      const existingItem = basket.find(item => item.name === this.newItem1.name);
      if (this.newItem1.name && this.newItem1.quantity > 0) {
        if (existingItem) {
          existingItem.quantity += this.newItem1.quantity;
        } else {
          basket.push({
            name: this.newItem1.name,
            quantity: this.newItem1.quantity,
          });
        }
        this.newItem1.name = '';
        this.newItem1.quantity = null;
      }
    },
    deleteItem(index, basket) {
      if (basket[index] && basket[index].quantity > 0) {
        basket[index].quantity--;
        if (basket[index].quantity === 0) {
          basket.splice(index, 1);
        }
      }
    },
    getTotalQuantity(basket) {
      return basket.reduce((total, item) => total + item.quantity, 0);
    },

    goToTable() {
      this.$router.push('/table');
    },

    transferToBasketA() {
      if (this.selectedItemIndexB !== null) {
        const item = this.basketB[this.selectedItemIndexB];
        const existingItem = this.basketA.find(bItem => bItem.name === item.name);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          this.basketA.push({ name: item.name, quantity: 1 });
        }
        this.deleteItem(this.selectedItemIndexB, this.basketB);
        this.selectedItemIndexB = null; // Deselect the item after transfer
      }
    },

    transferToBasketB() {
      if (this.selectedItemIndexA !== null) {
        const item = this.basketA[this.selectedItemIndexA];
        const existingItem = this.basketB.find(bItem => bItem.name === item.name);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          this.basketB.push({ name: item.name, quantity: 1 });
        }
        this.deleteItem(this.selectedItemIndexA, this.basketA);
        this.selectedItemIndexA = null; // Deselect the item after transfer
      }
    },

    selectItemA(index) {
      this.selectedItemIndexA = index;
    },  

    selectItemB(index) {
      this.selectedItemIndexB = index;
    }
    
  }
};
</script>

<template>
  <div>
    <button @click="goToTable" class="btn btn-primary mt-3">Go to Table</button>
  </div>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="row w-100 d-flex justify-content-center">
    
      <div class="col-lg-5 col-sm-12 mb-4 mb-lg-0">
        <div class="basket">
          <div class="basket-header">
            <h1>Basket A</h1>
            <span class="badge">{{ getTotalQuantity(basketA) }}</span>
          </div>
          <div v-for="(item, index) in basketA" :key="index" class="item" :class="{ selected: selectedItemIndexA === index }" @click="selectItemA(index)">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-quantity">Qty: {{ item.quantity }}</span>
            <button @click.stop="deleteItem(index, basketA)" class="remove-btn">✖</button>
          </div>
          <div class="input-group">
            <input v-model="newItem.name" type="text" class="form-control" placeholder="Name">
            <input v-model.number="newItem.quantity" type="number" class="form-control" placeholder="Qty">
            <button @click="addItem(basketA)" class="btn add-btn">+</button>
          </div>
        </div>
      </div>

      <div class="col-lg-2 col-sm-12 d-flex justify-content-center align-items-center">
        <div class="transfer-buttons">
          <button @click="transferToBasketB" class="transfer-btn btn-down">→</button>
          <button @click="transferToBasketA" class="transfer-btn btn-up">←</button>
        </div>
      </div>

      <div class="col-lg-5 col-sm-12">
        <div class="basket">
          <div class="basket-header">
            <h1>Basket B</h1>
            <span class="badge">{{ getTotalQuantity(basketB) }}</span>
          </div>
          <div v-for="(item, index) in basketB" :key="index" class="item" :class="{ selected: selectedItemIndexB === index }" @click="selectItemB(index)">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-quantity">Qty: {{ item.quantity }}</span>
            <button @click.stop="deleteItem(index, basketB)" class="remove-btn">✖</button>
          </div>
          <div class="input-group">
            <input v-model="newItem1.name" type="text" class="form-control" placeholder="Name">
            <input v-model.number="newItem1.quantity" type="number" class="form-control" placeholder="Qty">
            <button @click="addItem1(basketB)" class="btn add-btn">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
 .basket {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 100%;
  }
  
  .basket-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background: #fff;
    z-index: 1;
  }
  
  .basket-header h1 {
    font-size: 18px;
    margin: 0;
    color: #1d3557;
  }
  
  .badge {
    background-color: #363d63;
    color: white;
    padding: 2px 8px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    margin-left: 15px;
  }
  
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    margin-bottom: 10px;
    background-color: #f8f9fa;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  
  .item.selected {
    border: 2px solid #1d3557;
    background-color: #f0f8ff;
  }
  
  .item-name {
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .item-quantity {
    width: 100px;
    text-align: right;
  }
  
  .remove-btn {
    background: none;
    border: none;
    color: #363d63;
    font-size: 16px;
    cursor: pointer;
  }
  
  .input-group {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  
  .add-btn {
    background-color: #e9f2ea;
    color: #363d63;
    cursor: pointer;
    font-size: 20px;
    border: none;
    border-radius: 4px;
  }
  
  .input-group input {
    padding: 8px;
    border: none;
  }
  
  .transfer-btn {
    background-color: #363d63;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 18px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 4px solid #d6f1ff;
  }
  
  .transfer-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  
  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      overflow-y: auto; 
      height: auto; 
      max-height: 100vh;
    }

    .basket {
      width: 100%; 
      height: auto; 
    }

    .transfer-buttons {
      flex-direction: row; 
      gap: 10px; 
      width: 100%; 
      margin-bottom: 10px;
    }
    
    .transfer-btn {
      width: 40px;
      height: 40px; 
    }
    
    .transfer-btn.btn-up {
      transform: rotate(90deg); 
    }
    
    .transfer-btn.btn-down {
      transform: rotate(90deg); 
    }
  }
</style>
