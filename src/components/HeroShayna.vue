<template>
    <!-- Hero Section Begin -->
    <section class="hero-section">
        <carousel class="hero-items" :items="1" :nav="false">
            <div class="single-hero-items set-bg" style="background-image: url('/img/header1.jpg')">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <h1>Find your favorite outfit</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            </p>
                            <a href="#" class="primary-btn" v-if="user"> <router-link to="/cart" style="color:white"> Shop Now</router-link></a>

                             <a href="#" class="primary-btn" v-else> <router-link to="/login" style="color:white"> Shop Now</router-link></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="single-hero-items set-bg" style="background-image: url('/img/header2.jpg')">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5">
                            <h1>Something New</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            </p>
                             <a href="#" class="primary-btn" v-if="user"> <router-link to="/cart" style="color:white"> Shop Now</router-link></a>
                             <a href="#" class="primary-btn" v-else> <router-link to="/login" style="color:white"> Shop Now</router-link></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="single-hero-items set-bg" style="background-image: url('/img/header3.jpg')">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-5">
                            <h1>Fine Today</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            </p>
                             <a href="#" class="primary-btn" v-if="user"> <router-link to="/cart" style="color:white"> Shop Now</router-link></a>
                             <a href="#" class="primary-btn" v-else> <router-link to="/login" style="color:white"> Shop Now</router-link></a>
                        </div>
                    </div>
                </div>
            </div>
        </carousel>
    </section>
    <!-- Hero Section End -->
</template>

<script>
import carousel from 'vue-owl-carousel';
import axios from 'axios'

export default {
    name: "HeroShayna",
    components:{
        carousel
    },

    data(){
        return{
            user:''
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
}
</script>