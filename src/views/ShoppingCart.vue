<template>
    <div class="shopping">
    <HeaderShayna/>
<!-- Breadcrumb Section Begin -->
    <div class="breacrumb-section text-left">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="breadcrumb-text product-more">
                        <router-link to="/"><i class="fa fa-home"></i> Home</router-link>
                       Shopping Cart
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Breadcrumb Section Begin -->

    <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="cart-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th class="p-name text-center">Product Name</th>
                                            <th>Price</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr v-for="keranjang in keranjangUser" :key="keranjang.id">
                                            <td class="cart-pic first-row">
                                                <img class="img-cart" :src="keranjang.photo" />
                                            </td>
                                            <td class="cart-title first-row text-center">
                                                <h5>{{keranjang.name}}</h5>
                                            </td>
                                            <td class="p-price first-row">Rp.{{keranjang.price | formatNumber}}</td>
                                            <td class="delete-item" @click="removeItem(keranjangUser.index)"><a href="#"><i class="material-icons">
                                              close
                                              </i></a></td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-lg-8 text-left">
                            <h4 class="mb-4">
                                Informasi Pembeli:
                            </h4>
                            <div class="user-checkout">
                                <form>
                                    <div class="form-group">
                                        <label for="namaLengkap">Nama lengkap</label>
                                        <input type="text" class="form-control" id="namaLengkap" aria-describedby="namaHelp" placeholder="Masukan Nama" 
                                        v-model="customerInfo.name">
                                    </div>
                                    <div class="form-group">
                                        <label for="namaLengkap">Email Address</label>
                                        <input type="email" class="form-control" id="emailAddress" aria-describedby="emailHelp" placeholder="Masukan Email"
                                        v-model="customerInfo.email">
                                    </div>
                                    <div class="form-group">
                                        <label for="namaLengkap">No. HP</label>
                                        <input type="text" class="form-control" id="noHP" aria-describedby="noHPHelp" placeholder="Masukan No. HP"
                                        v-model="customerInfo.number">
                                    </div>
                                    <div class="form-group">
                                        <label for="alamatLengkap">Alamat Lengkap</label>
                                        <textarea class="form-control" id="alamatLengkap" rows="3"
                                        v-model="customerInfo.address"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="delivery" class="form-control-label">Pilih Kurir</label>
                                        <select name="delivery" class="form-control" v-model="customerInfo.delivery">                                 
                                            <option value="JNE">JNE</option>
                                            <option value="JNT">JNT</option>
                                            <option value="SICEPAT">SICEPAT</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 ">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="proceed-checkout text-left">
                                <ul>
                                    <li class="subtotal">Subtotal <span>Rp.{{totalHarga | formatNumber}}</span></li>
                                    <li class="subtotal mt-3">Pajak <span>5% Rp.{{pajak | formatNumber}}</span></li>
                                    <li class="subtotal mt-3">Total Biaya <span>Rp.{{totalBiaya | formatNumber}}</span></li>
                                    <li class="subtotal mt-3">Bank Transfer <span>BNI</span></li>
                                    <li class="subtotal mt-3">No. Rekening <span>72013748</span></li>
                                    <li class="subtotal mt-3">Nama Penerima <span>Ahmad Septian</span></li>
                                </ul>
                                <!-- <router-link to="/success"> -->
                               
                                 <div v-if="user">
                                    <a @click="checkout(),removeKeranjang(keranjangUser.index)" href="#" class="proceed-btn">I ALREADY PAID</a> 
                                </div>
                                <div v-else>
                                    <h4>You Must Login First</h4>
                                </div>
                                <!-- </router-link> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Shopping Cart Section End -->

    <FooterShayna/>
    </div>
</template>

<script>
import HeaderShayna from '@/components/HeaderShayna.vue'
import FooterShayna from '@/components/FooterShayna.vue'
import Vue from "vue";
import axios from 'axios';

var numeral = require("numeral");

Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});

export default {
    name: "ShoppingCart",
    components:{
        HeaderShayna,
        FooterShayna
    },
   data() {
        return {
      keranjangUser: [],
      user:'',
      customerInfo: {
          name: '',
          email: '',
          number: '',
          address: '',
          delivery: ''
      }
    };
  },
 
 
  methods: {
      removeItem(index) {
          this.keranjangUser.splice(index,1);
            const parsed = JSON.stringify(this.keranjangUser);
            localStorage.setItem("keranjangUser", parsed);
      },
      removeKeranjang(index) {
          this.keranjangUser.splice(index);
            const parsed = JSON.stringify(this.keranjangUser);
            localStorage.setItem("keranjangUser", parsed);
      },
       checkout() {
      let productIds = this.keranjangUser.map(function(product) {
          return product.id;
      });

      let checkoutData = {
          name : this.customerInfo.name,
          email: this.customerInfo.email,
          number: this.customerInfo.number,
          address: this.customerInfo.address,
          delivery: this.customerInfo.delivery,
          transaction_total: this.totalBiaya,
          transaction_status: "PENDING",
          transaction_details: productIds
      };
      
      axios 
        .post(
            "http://47.254.249.154:81/api/checkout", checkoutData
        )
        .then(() => this.$router.push("success"))
        .catch(err => console.log(err));
       
    

    },
  },
  async created() {
    const response = await axios.get(' http://47.254.249.154:81/api/user', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
      this.user = response.data;
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
  
  computed: {
      totalHarga() {
          return this.keranjangUser.reduce(function(items,data){
              return items + data.price;
          }, 0)
      },
      pajak() {
          return (this.totalHarga * 5) / 100;
      },
      totalBiaya() {
          return this.totalHarga + this.pajak;
      }
    
  }
 
}
</script>

<style scoped>
    .img-cart{
        width :130px;
        height: 130px;
    }
</style>