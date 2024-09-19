<template>
  <div class="container mt-5">
      <div class="d-flex align-items-center">
      <div class="designheader"></div>
    <span class="ms-2">Categories</span>
      </div>
          <div class="categoriescontainer">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex align-items-center">
                  <h1>Browse By Category</h1>
                </div>
                <div>
                  <button
                    class="btncategories btn btn-secondary me-2 rounded-5"
                    @click="prevCategoryPage"
                    :disabled="categoryPage === 1"
                  >
                    ←
                  </button>
                  <button
                    class="btncategories btn btn-secondary rounded-5"
                    @click="nextCategoryPage"
                    :disabled="categoryPage === totalCategoryPages" 
                  >
                    →
                  </button>
                </div>
              </div>

              
              <div class="card-container">
                <div class="row">
                  <div class="col-lg-2 col-md-4 col-sm-12 mb-3" 
                      v-for="category in paginatedCategories" :key="category.name">
                    <Categoriescardcomponent
                      :productCategory="category"
                      @click="selectCategory(category.name)"
                      class="h-100"
                    />
                  </div>
                </div>
              </div>
              <!-- <div class="card-container">
                <div class="row">
                  <div class="col-lg-2 col-md-4 col-sm-12 mb-3" v-for="category in paginatedCategories" :key="category.name">
                    <div class="card cardhandle h-100" @click="selectCategory(category.name)" style="cursor: pointer">
                      <div class="card-body category-item">
                        <div class="categoryicon">
                        <i :class="getCategoryIcon(category.name)"></i>
                        </div> 
                        <h5 class="card-title categoryname">{{ category.name }}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>  -->
      </div>
      <hr>
     
      <div class="d-flex align-items-center">
        <div class="designheader"></div>
        <span class="text-muted ms-2">This Month</span>
      </div>
      <h2 class="display-4 mt-2">Best Selling Products</h2>
      <div class="grid-container p-0 h-100">
        <template v-for="(item, index) in items" :key="index">
            <ProductCardComponent :product="item" />
        </template>
      </div>


      <div class="d-flex justify-content-center mt-3">
        <ul class="pagination mb-0">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="prevPage">Previous</a>
          </li>

          <li
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
            class="page-item"
          >
            <a class="page-link" href="#" @click.prevent="changePage(page)">
              {{ page }}
            </a>
          </li>

          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
          </li>
        </ul>
      </div>

      <button @click="goToHome" class="btn btn-primary mt-3">Go to Home</button>
  </div>
</template>

<script>
import axios from "axios";
import ProductCardComponent from "./ProductCardComponent.vue";
import Categoriescardcomponent from "./Categoriescardcomponent.vue";

export default {
  components: {
    ProductCardComponent,
    Categoriescardcomponent
  },
  data() {
    return {
      items: [],
      categories: [],
      selectedCategory: null, 
      currentPage: 1,
      pageSize: 12,
      categoryPage: 1,
      categoriesPerPage: 6,
      iconClasses: [
        'fas fa-tv',         
        'fas fa-tshirt',    
        'fas fa-apple-alt',  
        'fas fa-couch',      
        'fas fa-car',       
        'fas fa-book',      
        'fas fa-laptop',    
        'fas fa-headphones',
        'fas fa-bicycle',   
        'fas fa-camera',     
        'fas fa-cogs',      
        'fas fa-gamepad',   
      ],
    };
  },

  computed: {
    totalPages() {
      return this.items.length
        ? Math.ceil(this.filteredItems.length / this.pageSize)
        : 1;
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredItems.slice(start, start + this.pageSize);
    },
    filteredItems() {
      let filtered = this.items;
      if (this.searchbar) {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(this.searchbar.toLowerCase())
        );
      }
      if (this.selectedCategory && this.selectedCategory !== "All") {
        filtered = filtered.filter(
          (item) =>
            item.category.toLowerCase() === this.selectedCategory.toLowerCase()
        );
      }
      return filtered;
    },
    paginatedCategories() {
      const start = (this.categoryPage - 1) * this.categoriesPerPage;
      const end = start + this.categoriesPerPage;
      return this.categories.slice(start, end);
    },
    totalCategoryPages() {
      return Math.ceil(this.categories.length / this.categoriesPerPage);
    },
  },
  methods: {
    async fetchData() {
      try {
        let endpoint = "https://dummyjson.com/products";
        if (this.selectedCategory && this.selectedCategory !== "All") {
          endpoint = `https://dummyjson.com/products/category/${this.selectedCategory}`;
        }
        const response = await axios.get(endpoint);
        this.items = response.data.products.map((product) => ({
          id: product.id,
          images: product.images,
          name: product.title,
          category: product.category,
          price: product.price,
          discount: product.discountPercentage,
          stock: product.stock,
          shop_location: product.brand,
          rating: product.rating,
        }));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get("https://dummyjson.com/products/categories");
        this.categories = response.data;  
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },

    selectCategory(category) {
      this.selectedCategory = category;
      this.fetchData();
    },
    getCategoryIcon() {
      const randomIcon = this.iconClasses[Math.floor(Math.random() * this.iconClasses.length)];
      return randomIcon;
    },

    goToHome() {
      this.$router.push("/");
    },

    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    prevCategoryPage() {
      if (this.categoryPage > 1) this.categoryPage--;
    },
    nextCategoryPage() {
      if (this.categoryPage < this.totalCategoryPages) this.categoryPage++;
    },
  },

  mounted() {
    this.fetchData();
    this.fetchCategories();
  },
};
</script>

<style scoped></style>
