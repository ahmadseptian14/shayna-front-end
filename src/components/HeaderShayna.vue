<template>
    <div>
          <!-- Header Section Begin -->
    <header class="header-section">
        <nav>
             <div class="header-top">
            <div class="container">
                <div class="ht-left">
                    <div class="mail-service">
                        <i class=" fa fa-envelope"></i> larastore@gmail.com
                    </div>
                    <div class="phone-service">
                        <i class=" fa fa-phone"></i> +628 21279371
                    </div>
                </div>
                  <div class="ht-right">
                        <div class="login-panel" v-if="user">
                        <a href="javascript:void(0)" @click="handleClick" style="text-decoration:none;color:black;font-size:18px">Logout</a>   
                    </div>
                      <div class="login-panel">
                         <p v-if="user" class="text-dark">{{user.name}}</p>
                    </div>
                    <div class="login-panel" v-if="!user">
                        <router-link :to="{name: 'register'}" style="text-decoration:none;color:black"  href="">Register</router-link>   
                    </div>
                    <div class="login-panel" v-if="!user">
                       <router-link :to="{name: 'login'}" style="text-decoration:none;color:black" href="">Login</router-link> 
                    </div>
                   
                </div>
               
            </div>
        </div>
        </nav>
       
        <div class="container">
            <div class="inner-header">
                <div class="row">
                    <div class="col-lg-2 col-md-2">
                        <div class="logo">
                            <a href="./index.html">
                               <router-link to="/"><b><span style="color:#1c7664">Lara</span>Store</b></router-link>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-7 col-md-7"></div>
                    <div class="col-lg-3 text-right col-md-3">
                        <ul class="nav-right">
                            <li class="cart-icon">
                                Keranjang Belanja &nbsp;
                                <a href="#">
                                    <i class="icon_bag_alt"></i>
                                    <span>{{keranjangUser.length}}</span>
                                </a>
                                <div class="cart-hover">
                                    <div class="select-items">
                                        <table>
                                            <tbody v-if="keranjangUser.length > 0">
                                                <tr v-for="keranjang in keranjangUser" :key="keranjang.id">
                                                    <td class="si-pic">
                                                        <img class="photo-item" :src="keranjang.photo" alt="" />
                                                    </td>
                                                    <td class="si-text">
                                                        <div class="product-selected">
                                                            <p>Rp.{{keranjang.price | formatNumber }} x 1</p>
                                                            <h6>{{keranjang.name}}</h6>
                                                        </div>
                                                    </td>
                                                    <td @click="removeItem(keranjangUser.id)" class="si-close">
                                                        <i class="ti-close"></i>
                                                    </td>
                                                </tr>  
                                            </tbody>
                                            <tbody v-else>
                                                <tr>
                                                    <td>Keranjang Kosong</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="select-total">
                                        <span>total:</span>
                                        <h5>Rp.{{totalHarga | formatNumber}}</h5>
                                    </div>
                                    <div class="select-button">
                                        <a href="#" class="primary-btn view-card"><router-link to="/cart" style="color:#ffff">VIEW CARD  </router-link></a>
                                        <a href="#" class="primary-btn checkout-btn">CHECK OUT</a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- Header End -->
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios"   

var numeral = require("numeral");

Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});

export default {
    name:'HeaderShayna',
    data() {
        return {
      keranjangUser: [],
      user: null,
      props:['user']
    };
  },
  methods: {
      removeItem(idx) {
         let keranjangUserStorage = JSON.parse(localStorage.getItem("keranjangUser"));
         let itemKeranjangUserStorage = keranjangUserStorage.map(itemKeranjangUserStorage => itemKeranjangUserStorage.id);
         let index = itemKeranjangUserStorage.findIndex(id => id == idx);
         this.keranjangUser.splice(index,1);

         const parsed = JSON.stringify(this.keranjangUser);
         localStorage.setItem("keranjangUser", parsed);
         window.location.reload();
      },
      handleClick(){
          localStorage. removeItem('token')
          this.$router.push('/');
         window.location.reload();
          
      }
  },
  
  mounted() {
    if (localStorage.getItem("keranjangUser")) {
      try {
        this.keranjangUser = JSON.parse(localStorage.getItem("keranjangUser"));
      } catch (e) {
        localStorage.removeItem("keranjangUser");
      }
    }
  },
   async created() {
    const response = await axios.get(' http://localhost:8000/api/user', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
      this.user = response.data;
  },
  computed: {
      totalHarga() {
          return this.keranjangUser.reduce(function(items,data){
              return items + data.price;
          }, 0)
      }
  }
}
</script>

<style scoped>
    .photo-item{
        width: 80px;
        height: 80px;
    }
    .view-card{
        display: block;
    }
</style>