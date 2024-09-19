<template>
  <div class="product-box">
    <div class="imagecontainer">
      <img :src="product?.images[0]" alt="Product Image" class="product-image" />
    </div>
    <div class="product-details h-100">
      <h5 class="product-title">{{ product?.name }}</h5>
      <div class="item-container">
        <div class="col-md-6 d-flex justify-content-start align-items-center product-container">
          <h5 class="text-danger mb-0 me-3">{{ "₱ " + (product?.price || '0') }}</h5>
          <strike class="text-secondary">{{ product?.discount ? "₱ " + product?.discount : "0" }}</strike>
        </div>
        <div class="col-md-6 d-flex justify-content-start align-items-center product-container">
          <div class="d-flex align-items-center rating-container me-3">
            <i v-for="n in Math.floor(product?.rating || 0)" 
              :key="'full-' + n" 
              class="fas fa-star" 
              style="color: #FFAD33;"></i>
            <i v-if="(product?.rating % 1 || 0) >= 0.5" 
              class="fas fa-star-half-alt" 
              style="color: #FFAD33;"></i>
            <i v-for="n in (5 - Math.ceil(product?.rating || 0))" 
              :key="'empty-' + n" 
              class="far fa-star" 
              style="color: #FFAD33;"></i>
          </div>
          <h5 class="m-0 productstock text-secondary">({{ product?.stock || '0' }})</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    }
  }
}
</script>
