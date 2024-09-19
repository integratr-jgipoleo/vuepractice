<template>
  <div class="card cardhandle h-100" style="cursor: pointer">
    <div class="card-body category-item">
      <div class="categoryicon">
        <i :class="getCategoryIcon(productCategory.name)"></i>
      </div> 
      <h5 class="card-title categoryname">{{ productCategory.name }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productCategory: {
      type: Object,
      required: true
    }
  },
  methods: {
    getCategoryIcon() {
      const iconClasses = [
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
      ];
      return iconClasses[Math.floor(Math.random() * iconClasses.length)];
    }
  }
};
</script>
