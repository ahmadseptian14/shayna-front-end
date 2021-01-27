<template>
     <!-- Women Banner Section Begin -->
    <section class="women-banner spad">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 mt-5" v-if="products.length > 0">
                    <carousel class="product-slider" :items="3" :nav="false" :autoplay="true" :dots="false" :touchDrag="true">
                        <div class="product-item" v-for="itemProduct in products" v-bind:key="itemProduct.id">
                            <div class="pi-pic">
                                <img v-bind:src="itemProduct.galleries[0].photo" alt="" />
                                <ul>
                                    <li class="w-icon active">
                                        <a href="#" @click="saveKeranjang(itemProduct.id,itemProduct.name,itemProduct.price,itemProduct.galleries[0].photo)"><i class="icon_bag_alt"></i></a>
                                    </li>
                                    <li class="quick-view"> <router-link v-bind:to="'/product/' + itemProduct.id">+ Quick View</router-link></li>
                                </ul>
                            </div>
                            <div class="pi-text">
                                <div class="catagory-name">{{ itemProduct.type }}</div>
                                 <router-link to="/product">
                                 <a href="#">
                                    <h5>{{ itemProduct.name }}</h5>
                                 </a>
                                 </router-link>
                                <div class="product-price">
                                   Rp.{{itemProduct.price | formatNumber   }}
                                </div>
                            </div>
                        </div>
                    </carousel>
                </div>
                <div class="col-lg-12" v-else>
                    <p>
                        New Product Not Available
                    </p>
                </div>
            </div>
        </div>
    </section>
    <!-- Women Banner Section End -->
</template>

<script>
import carousel from 'vue-owl-carousel';
import axios from 'axios';
import Vue from 'vue';


 var numeral = require("numeral");

  Vue.filter("formatNumber", function (value) {
    return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
  });

export default {
    name: "WomanShayna",
    components:{
        carousel
    },
    data() {
       return{
            products:[],
            keranjangUser:[]
       };
    },
      methods: {
         saveKeranjang(idProduct,nameProduct,priceProduct,photoProduct) {
            var productStored = {
                "id": idProduct,
                "name": nameProduct,
                "price": priceProduct,
                "photo": photoProduct
            };
        this.keranjangUser.push(productStored);
        const parsed = JSON.stringify(this.keranjangUser);
        localStorage.setItem("keranjangUser", parsed);
        },
    },
      mounted() {
    if (localStorage.getItem("keranjangUser")) {
      try { 
        this.keranjangUser = JSON.parse(localStorage.getItem("keranjangUser"));
      } catch (e) {
        localStorage.removeItem("keranjangUser");
      }
    }
        axios
            .get("http://localhost:8000/api/products")
            .then(res => (this.products = res.data.data.data))
            .catch(err => console.log(err));

    },
        
};
</script>

<style scoped>
.product-item{
    margin-right: 25px;
}
</style>
