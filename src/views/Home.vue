<template>
  <div class="home">
  <HeaderShayna/>
  <HeroShayna/>
  <WomanShayna/>
  <InstaShayna/>
  <PartnerShayna/>
  <FooterShayna/>
   
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderShayna from '@/components/HeaderShayna.vue'
import HeroShayna from '@/components/HeroShayna.vue'
import WomanShayna from '@/components/WomanShayna.vue'
import InstaShayna from '@/components/InstaShayna.vue'
import PartnerShayna from '@/components/PartnerShayna.vue'
import FooterShayna from '@/components/FooterShayna.vue'
import axios from 'axios'





export default {
  name: 'home',
  components: {
    HeaderShayna,
    HeroShayna,
    WomanShayna,
    InstaShayna,
    PartnerShayna,
    FooterShayna
  },

  data() {
    return{
      user: null,
      props: ['user']
    }
  },

  async created() {
    const response = await axios.get(' http://47.254.249.154:81/api/user', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });
      this.user = response.data;
  }
}
</script>
